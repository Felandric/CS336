from sqlalchemy import create_engine
from sqlalchemy import sql
import datetime

from BarBeerDrinker import config

engine = create_engine(config.database_uri)

def get_bars():
	with engine.connect() as con:
		rs = con.execute("SELECT * FROM bars;")
		return [dict(row) for row in rs]

def find_bar(name):
	with engine.connect() as con:
		query = sql.text("SELECT * FROM bars WHERE name = :name;")
		rs = con.execute(query, name=name)
		result = rs.first()
		if result is None:
			return None
		return dict(result)

def filter_beers(max_price):
	with engine.connect() as con:
		query = sql.text("SELECT * FROM sells WHERE price < :max_price;")
		rs = con.execute(query, max_price=max_price)
		results = [dict(row) for row in rs]
		for r in results:
			r['price'] = float(r['price'])
		return results

def get_drinker(name):
	with engine.connect() as con:
		query = sql.text("SELECT * FROM drinkers WHERE name = :name;")
		rs = con.execute(query, name=name)
		result = rs.first()
		if result is None:
			return None
		return dict(result)

def get_drinker_transactions(drinker_name):
	with engine.connect() as con:
		query = sql.text("SELECT issued.transactionid, issuedby, date, hour, minute, totalCharge, tip FROM issued INNER JOIN bills ON issued.transactionid=bills.transactionid WHERE issued.issuedto=:drinker ;")
		rs = con.execute(query, drinker=drinker_name)
		results = [dict(row) for row in rs]
		for r in results:
			r['date'] = "%s %s:%s:00"%(r['date'], r['hour'], r['minute'])
		results.sort(key=lambda x: (x['issuedby'], datetime.datetime.strptime(x['date'], '%m/%d/%Y %H:%M:%S')))
		for r in results:
			r['date'] = r['date'].split()[0]
		return results

def sql_query(user_query):
	with engine.connect() as con:
		query = sql.text(user_query)
		rs = con.execute(query)
		return [dict(row) for row in rs]
