from flask import Flask
from flask import jsonify
from flask import make_response
from flask import request
from sqlalchemy import exc
import json

import database

application = Flask(__name__)
app = application

@app.route('/')
def hello():
		return 'Hello Back End!'

@app.route('/api/bar', methods=["GET"])
def get_bars():
	return jsonify(database.get_bars())

@app.route('/api/bar/<name>', methods=["GET"])
def get_bar(name):
	try:
		if name is None:
			raise ValueError("Bar is not specified")
		bar = database.get_bar(name)
		if bar is None:
			return make_response("No bar found with the given name", 404)
		return jsonify(bar)
	except ValueError as e:
		return make_response(str(e), 400)
	except Exception as e:
		return make_response(str(e), 500)

@app.route('/api/bar/sells/<name>', methods=["GET"])
def get_bar_sells(name):
	try:
		if name is None:
			raise ValueError("Bar is not specified")
		results = database.get_bar_sells(name)
		if results is None:
			return make_response("No bar found with the given name", 404)
		return jsonify(results)
	except ValueError as e:
		return make_response(str(e), 400)
	except Exception as e:
		return make_response(str(e), 500)

@app.route('/api/bar/potentialdrinkers/<name>', methods=["GET"])
def get_bar_potential_drinkers(name):
	try:
		if name is None:
			raise ValueError("Bar is not specified")
		results = database.get_bar_potential_drinkers(name)
		if results is None:
			return make_response("No bar found with the given name", 404)
		return jsonify(results)
	except ValueError as e:
		return make_response(str(e), 400)
	except Exception as e:
		return make_response(str(e), 500)

@app.route('/api/bar/topspenders/<name>', methods=["GET"])
def get_bar_top_spenders(name):
	try:
		if name is None:
			raise ValueError("Bar is not specified")
		results = database.get_bar_top_spenders(name)
		if results is None:
			return make_response("No bar found with the given name", 404)
		return jsonify(results)
	except ValueError as e:
		return make_response(str(e), 400)
	except Exception as e:
		return make_response(str(e), 500)

@app.route('/api/bar/topbeers/<name>', methods=["GET"])
def get_bar_top_beers(name):
	try:
		if name is None:
			raise ValueError("Bar is not specified")
		results = database.get_bar_top_beers(name)
		if results is None:
			return make_response("No bar found with the given name", 404)
		return jsonify(results)
	except ValueError as e:
		return make_response(str(e), 400)
	except Exception as e:
		return make_response(str(e), 500)

@app.route('/api/bar/topmanufacturers/<name>', methods=["GET"])
def get_bar_top_manufacturers(name):
	try:
		if name is None:
			raise ValueError("Bar is not specified")
		results = database.get_bar_top_manufacturers(name)
		if results is None:
			return make_response("No bar found with the given name", 404)
		return jsonify(results)
	except ValueError as e:
		return make_response(str(e), 400)
	except Exception as e:
		return make_response(str(e), 500)

@app.route('/api/bar/busiesttimes/<name>', methods=["GET"])
def get_bar_busiest_times(name):
	try:
		if name is None:
			raise ValueError("Bar is not specified")
		results = database.get_bar_busiest_times(name)
		if results is None:
			return make_response("No bar found with the given name", 404)
		return jsonify(results)
	except ValueError as e:
		return make_response(str(e), 400)
	except Exception as e:
		return make_response(str(e), 500)

@app.route('/api/bar/busiestdays/<name>', methods=["GET"])
def get_bar_busiest_days(name):
	try:
		if name is None:
			raise ValueError("Bar is not specified")
		results = database.get_bar_busiest_days(name)
		if results is None:
			return make_response("No bar found with the given name", 404)
		return jsonify(results)
	except ValueError as e:
		return make_response(str(e), 400)
	except Exception as e:
		return make_response(str(e), 500)

@app.route('/api/bar/beerscheaperthan', methods=["POST"])
def cheaper_than():
	body = json.loads(request.data)
	max_price = body['maxPrice']
	return jsonify(database.filter_beers(max_price))

@app.route('/api/drinker/transactions/<name>', methods=["GET"])
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

@app.route('/api/drinker/itemizedtransactions/<name>', methods=["GET"])
def get_drinker_itemized_transactions(name):
	try:
		if name is None:
			raise ValueError("Drinker is not specified")
		transactions = database.get_drinker_itemized_transactions(name)
		if transactions is None:
			return make_response("No drinker found with the given name", 404)
		return jsonify(transactions)
	except ValueError as e:
		return make_response(str(e), 400)
	except Exception as e:
		return make_response(str(e), 500)


@app.route('/api/drinker', methods=["GET"])
def get_drinkers():
	return jsonify(database.get_drinkers())

@app.route('/api/drinker/busiesttimes/<name>', methods=["GET"])
def get_drinker_busiest_times(name):
	try:
		if name is None:
			raise ValueError("Drinker is not specified")
		results = database.get_drinker_busiest_times(name)
		if results is None:
			return make_response("No drinker found with the given name", 404)
		return jsonify(results)
	except ValueError as e:
		return make_response(str(e), 400)
	except Exception as e:
		return make_response(str(e), 500)

@app.route('/api/drinker/busiestdays/<name>', methods=["GET"])
def get_drinker_busiest_days(name):
	try:
		if name is None:
			raise ValueError("Drinker is not specified")
		results = database.get_drinker_busiest_days(name)
		if results is None:
			return make_response("No drinker found with the given name", 404)
		return jsonify(results)
	except ValueError as e:
		return make_response(str(e), 400)
	except Exception as e:
		return make_response(str(e), 500)

@app.route('/api/drinker/busiestmonths/<name>', methods=["GET"])
def get_drinker_busiest_months(name):
	try:
		if name is None:
			raise ValueError("Drinker is not specified")
		results = database.get_drinker_busiest_months(name)
		if results is None:
			return make_response("No drinker found with the given name", 404)
		return jsonify(results)
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

@app.route('/api/drinker/favoritebeers/<name>', methods=["GET"])
def get_drinker_favorite_beers(name):
	try:
		if name is None:
			raise ValueError("Drinker is not specified")
		results = database.get_drinker_favorite_beers(name)
		if results is None:
			return make_response("No drinker found with the given name", 404)
		return jsonify(results)
	except ValueError as e:
		return make_response(str(e), 400)
	except Exception as e:
		return make_response(str(e), 500)

@app.route('/api/beer', methods=["GET"])
def get_beers():
	return jsonify(database.get_beers())

@app.route('/api/beer/<name>', methods=["GET"])
def get_beer(name):
	try:
		if name is None:
			raise ValueError("Beer is not specified")
		beer = database.get_beer(name)
		if beer is None:
			return make_response("No beer found with the given name", 404)
		return jsonify(beer)
	except ValueError as e:
		return make_response(str(e), 400)
	except Exception as e:
		return make_response(str(e), 500)

@app.route('/api/beer/topbars/<name>', methods=["GET"])
def get_beer_top_bars(name):
	try:
		if name is None:
			raise ValueError("Beer is not specified")
		results = database.get_beer_top_bars(name)
		if results is None:
			return make_response("No beer found with the given name", 404)
		return jsonify(results)
	except ValueError as e:
		return make_response(str(e), 400)
	except Exception as e:
		return make_response(str(e), 500)

@app.route('/api/beer/topdrinkers/<name>', methods=["GET"])
def get_beer_top_drinkers(name):
	try:
		if name is None:
			raise ValueError("Beer is not specified")
		results = database.get_beer_top_drinkers(name)
		if results is None:
			return make_response("No beer found with the given name", 404)
		return jsonify(results)
	except ValueError as e:
		return make_response(str(e), 400)
	except Exception as e:
		return make_response(str(e), 500)

@app.route('/api/beer/busiesttimes/<name>', methods=["GET"])
def get_beer_busiest_times(name):
	try:
		if name is None:
			raise ValueError("Beer is not specified")
		results = database.get_beer_busiest_times(name)
		if results is None:
			return make_response("No beer found with the given name", 404)
		return jsonify(results)
	except ValueError as e:
		return make_response(str(e), 400)
	except Exception as e:
		return make_response(str(e), 500)

@app.route('/api/beer/busiestdays/<name>', methods=["GET"])
def get_beer_busiest_days(name):
	try:
		if name is None:
			raise ValueError("Beer is not specified")
		results = database.get_beer_busiest_days(name)
		if results is None:
			return make_response("No beer found with the given name", 404)
		return jsonify(results)
	except ValueError as e:
		return make_response(str(e), 400)
	except Exception as e:
		return make_response(str(e), 500)

@app.route('/api/query/<path:query>', methods=["GET"])
def sql_query(query):
	try:
		if query is None:
			raise ValueError("Query is not specified")
		illegalOperations = ['create', 'insert', 'update', 'delete', 'drop']
		if any(word in query.lower() for word in illegalOperations):
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

@app.route('/api/modification/<path:modification>', methods=["GET"])
def sql_modification(modification):
	try:
		if modification is None:
			raise ValueError("Modification is not specified")
		result = database.sql_modification(modification)
		if result is None:
			return make_response("No results", 404)
		return jsonify(result)
	except ValueError as e:
		return make_response(str(e), 400)
	except exc.IntegrityError as e:
		return make_response(str(e), 403)
	except Exception as e:
		return make_response(str(e), 500)

if __name__ == '__main__':
		application.run()
