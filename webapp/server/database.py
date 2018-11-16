from sqlalchemy import create_engine
from sqlalchemy import sql
import datetime

import config

engine = create_engine(config.database_uri)

def get_bars():
	with engine.connect() as con:
		rs = con.execute("SELECT * FROM bars;")
		return [dict(row) for row in rs]

def get_bar(name):
	with engine.connect() as con:
		query = sql.text("SELECT * FROM bars WHERE name = :name;")
		rs = con.execute(query, name=name)
		result = rs.first()
		if result is None:
			return None
		return dict(result)

def get_bar_sells(bar_name):
	with engine.connect() as con:
		query = sql.text("SELECT item, price FROM sells WHERE bar=:bar")
		rs = con.execute(query, bar=bar_name)
		return [dict(row) for row in rs]

def get_bar_potential_drinkers(bar_name):
	with engine.connect() as con:
		query = sql.text("SELECT drinkers.name FROM drinkers INNER JOIN bars ON drinkers.state=bars.state WHERE bars.name=:bar")
		rs = con.execute(query, bar=bar_name)
		return [dict(row) for row in rs]

def get_bar_top_spenders(bar_name):
	with engine.connect() as con:
		query = sql.text("SELECT issuedto AS drinker, SUM(totalCharge) AS spent FROM issued INNER JOIN bills ON issued.transactionid=bills.transactionid WHERE issuedby=:bar GROUP BY issuedto ORDER BY spent DESC")
		rs = con.execute(query, bar=bar_name)
		return [dict(row) for row in rs]

def get_bar_top_beers(bar_name):
	with engine.connect() as con:
		query = sql.text("SELECT contains.item, SUM(contains.quantity) AS count FROM issued INNER JOIN contains ON issued.transactionid=contains.transactionid WHERE contains.item IN (SELECT name FROM items WHERE manufacturer IS NOT NULL) AND issued.issuedby=:bar GROUP BY item ORDER BY count DESC")
		rs = con.execute(query, bar=bar_name)
		results = [dict(row) for row in rs]
		for r in results:
			r['count'] = int(r['count'])
		return results

def get_bar_top_manufacturers(bar_name):
	with engine.connect() as con:
		query = sql.text("SELECT manufacturer, SUM(c)  as count FROM (SELECT contains.item, SUM(contains.quantity) AS c FROM issued INNER JOIN contains ON issued.transactionid=contains.transactionid WHERE contains.item IN (SELECT name FROM items WHERE manufacturer IS NOT NULL) AND issued.issuedby=:bar GROUP BY item ORDER BY c DESC) T INNER JOIN items ON T.item=items.name GROUP BY items.manufacturer ORDER BY count DESC")
		rs = con.execute(query, bar=bar_name)
		results = [dict(row) for row in rs]
		for r in results:
			r['count'] = int(r['count'])
		return results

def get_bar_busiest_times(bar_name):
	with engine.connect() as con:
		query = sql.text("SELECT hour, COUNT(*) as count FROM issued WHERE issued.issuedby=:bar GROUP BY hour ORDER BY hour")
		rs = con.execute(query, bar=bar_name)
		results = [dict(row) for row in rs]
		for r in results:
			r['count'] = int(r['count'])
		return results

def get_bar_busiest_days(bar_name):
	with engine.connect() as con:
		query = sql.text("SELECT date, COUNT(*) as count FROM issued WHERE issued.issuedby=:bar GROUP BY date")
		rs = con.execute(query, bar=bar_name)
		results = [dict(row) for row in rs]
		for r in results:
			r['count'] = int(r['count'])
			r['date'] = datetime.datetime.strptime(r['date'], '%m/%d/%Y').strftime('%A') #get weekday

		grouped_results = [{'date':'Monday', 'count':0}, {'date':'Tuesday', 'count':0}, {'date':'Wednesday', 'count':0}, {'date':'Thursday', 'count':0}, {'date':'Friday', 'count':0}, {'date':'Saturday', 'count':0}, {'date':'Sunday', 'count':0}]
		for r in results:
			for g in grouped_results:
				if r['date'] == g['date']:
					g['count'] += r['count']
		return grouped_results

def get_drinker(name):
	with engine.connect() as con:
		query = sql.text("SELECT * FROM drinkers WHERE name = :name;")
		rs = con.execute(query, name=name)
		result = rs.first()
		if result is None:
			return None
		return dict(result)

def get_drinkers():
	with engine.connect() as con:
		rs = con.execute("SELECT * FROM drinkers;")
		return [dict(row) for row in rs]

def get_drinker_favorite_beers(drinker_name):
	with engine.connect() as con:
		query = sql.text("SELECT contains.item, SUM(contains.quantity) AS count FROM issued INNER JOIN contains ON issued.transactionid=contains.transactionid WHERE contains.item IN (SELECT name FROM items WHERE manufacturer IS NOT NULL) AND issued.issuedto=:drinker GROUP BY item ORDER BY count DESC")
		rs = con.execute(query, drinker=drinker_name)
		results = [dict(row) for row in rs]
		for r in results:
			r['count'] = int(r['count'])
		return results

def get_drinker_busiest_times(drinker_name):
	with engine.connect() as con:
		query = sql.text("SELECT hour, COUNT(*) as count FROM issued WHERE issuedto=:drinker GROUP BY hour ORDER BY hour")
		rs = con.execute(query, drinker=drinker_name)
		results = [dict(row) for row in rs]
		for r in results:
			r['count'] = int(r['count'])
		return results

def get_drinker_busiest_days(drinker_name):
	with engine.connect() as con:
		query = sql.text("SELECT date, COUNT(*) as count FROM issued WHERE issuedto=:drinker GROUP BY date")
		rs = con.execute(query, drinker=drinker_name)
		results = [dict(row) for row in rs]
		for r in results:
			r['count'] = int(r['count'])
			r['date'] = datetime.datetime.strptime(r['date'], '%m/%d/%Y').strftime('%A') #get weekday

		grouped_results = [{'date':'Monday', 'count':0}, {'date':'Tuesday', 'count':0}, {'date':'Wednesday', 'count':0}, {'date':'Thursday', 'count':0}, {'date':'Friday', 'count':0}, {'date':'Saturday', 'count':0}, {'date':'Sunday', 'count':0}]
		for r in results:
			for g in grouped_results:
				if r['date'] == g['date']:
					g['count'] += r['count']
		return grouped_results

def get_drinker_busiest_months(drinker_name):
	with engine.connect() as con:
		query = sql.text("SELECT date, COUNT(*) as count FROM issued WHERE issuedto=:drinker GROUP BY date")
		rs = con.execute(query, drinker=drinker_name)
		results = [dict(row) for row in rs]
		for r in results:
			r['count'] = int(r['count'])
			r['date'] = datetime.datetime.strptime(r['date'], '%m/%d/%Y').strftime('%B') #get month

		grouped_results = [{'date':'January', 'count':0}, {'date':'February', 'count':0}, {'date':'March', 'count':0}, {'date':'April', 'count':0}, {'date':'May', 'count':0}, {'date':'June', 'count':0}, {'date':'July', 'count':0}, {'date':'August', 'count':0}, {'date':'September', 'count':0}, {'date':'October', 'count':0}, {'date':'November', 'count':0}, {'date':'December', 'count':0}]
		for r in results:
			for g in grouped_results:
				if r['date'] == g['date']:
					g['count'] += r['count']
		return grouped_results

def get_beer(name):
	with engine.connect() as con:
		query = sql.text("SELECT * FROM items WHERE name = :name;")
		rs = con.execute(query, name=name)
		result = rs.first()
		if result is None:
			return None
		return dict(result)

def get_beer_top_bars(beer_name):
	with engine.connect() as con:
		query = sql.text("SELECT issued.issuedby as bar, SUM(contains.quantity) AS count FROM issued INNER JOIN contains ON issued.transactionid=contains.transactionid WHERE contains.item=:beer GROUP BY issued.issuedby ORDER BY count DESC")
		rs = con.execute(query, beer=beer_name)
		results = [dict(row) for row in rs]
		for r in results:
			r['count'] = int(r['count'])
		return results

def get_beer_top_drinkers(beer_name):
	with engine.connect() as con:
		query = sql.text("SELECT issued.issuedto as drinker, SUM(contains.quantity) AS count FROM issued INNER JOIN contains ON issued.transactionid=contains.transactionid WHERE contains.item=:beer GROUP BY issued.issuedto ORDER BY count DESC")
		rs = con.execute(query, beer=beer_name)
		results = [dict(row) for row in rs]
		for r in results:
			r['count'] = int(r['count'])
		return results

def get_beer_busiest_times(beer_name):
	with engine.connect() as con:
		query = sql.text("SELECT issued.hour, SUM(contains.quantity) as count FROM issued INNER JOIN contains ON issued.transactionid=contains.transactionid WHERE contains.item=:beer GROUP BY hour ORDER BY hour")
		rs = con.execute(query, beer=beer_name)
		results = [dict(row) for row in rs]
		for r in results:
			r['count'] = int(r['count'])
		return results

def get_beer_busiest_days(beer_name):
	with engine.connect() as con:
		query = sql.text("SELECT issued.date, SUM(contains.quantity) as count FROM issued INNER JOIN contains ON issued.transactionid=contains.transactionid WHERE contains.item=:beer GROUP BY date")
		rs = con.execute(query, beer=beer_name)
		results = [dict(row) for row in rs]
		for r in results:
			r['count'] = int(r['count'])
			r['date'] = datetime.datetime.strptime(r['date'], '%m/%d/%Y').strftime('%A') #get weekday

		grouped_results = [{'date':'Monday', 'count':0}, {'date':'Tuesday', 'count':0}, {'date':'Wednesday', 'count':0}, {'date':'Thursday', 'count':0}, {'date':'Friday', 'count':0}, {'date':'Saturday', 'count':0}, {'date':'Sunday', 'count':0}]
		for r in results:
			for g in grouped_results:
				if r['date'] == g['date']:
					g['count'] += r['count']
		return grouped_results

def get_beers():
	with engine.connect() as con:
		rs = con.execute("SELECT * FROM items WHERE manufacturer IS NOT NULL;")
		return [dict(row) for row in rs]

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
			r['totalCharge'] = format(float(r['totalCharge']), '.2f')
			r['tip'] = format(float(r['tip']), '.2f')
		return results

def sql_query(user_query):
	with engine.connect() as con:
		query = sql.text(user_query)
		rs = con.execute(query)
		results = [dict(row) for row in rs]
		for r in results:
			for key in r.keys():
				r[key] = str(r[key])
		return results

def sql_modification(user_modification):
	with engine.connect() as con:
		modification = sql.text(user_modification)
		rs = con.execute(modification)
		return dict({'rows': rs.rowcount})
