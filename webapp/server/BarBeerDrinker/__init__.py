from flask import Flask
from flask import jsonify
from flask import make_response
from flask import request
import json

from BarBeerDrinker import database

app = Flask(__name__)

@app.route('/api/bar', methods=["GET"])
def get_bars():
	return jsonify(database.get_bars())

@app.route('/api/bar/<name>', methods=["GET"])
def find_bar(name):
	try:
		if name is None:
			raise ValueError("Bar is not specified")
		bar = database.find_bar(name)
		if bar is None:
			return make_response("No bar found with the given name", 404)
		return jsonify(bar)
	except ValueError as e:
		return make_response(str(e), 400)
	except Exception as e:
		return make_response(str(e), 500)

@app.route('/api/bar/beerscheaperthan', methods=["POST"])
def cheaper_than():
	body = json.loads(request.data)
	max_price = body['maxPrice']
	return jsonify(database.filter_beers(max_price))

@app.route('/api/transactions/<name>', methods=["GET"])
def get_drinker_transactions(name):
	try:
		if name is None:
			raise ValueError("Drinker is not specified")
		transactions = database.get_drinker_transactions(name)
		if transactions is None:
			return make_response("No drinker found with the given name", 404)
		return jsonify(transactions)
	except ValueError as e:
		return make_response(str(e), 400)
	except Exception as e:
		return make_response(str(e), 500)

@app.route('/api/drinker/<name>', methods=["GET"])
def get_drinker(name):
	try:
		if name is None:
			raise ValueError("Drinker is not specified")
		drinker = database.get_drinker(name)
		if drinker is None:
			return make_response("No drinker found with the given name", 404)
		return jsonify(drinker)
	except ValueError as e:
		return make_response(str(e), 400)
	except Exception as e:
		return make_response(str(e), 500)

@app.route('/api/query/<query>', methods=["GET"])
def sql_query(query):
	try:
		if query is None:
			raise ValueError("Query is not specified")
		query = query.lower()
		illegalOperations = ['create', 'insert', 'update', 'delete', 'drop']
		if any(word in query for word in illegalOperations):
			raise ValueError("Query contains illegal operations")
		result = database.sql_query(query)
		if result is None:
			return make_response("No results", 404)
		return jsonify(result)
	except ValueError as e:
		return make_response(str(e), 400)
	except Exception as e:
		print(str(e))
		return make_response(str(e), 500)
