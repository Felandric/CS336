import csv
import random

# need sells, issued, contains
# bills(id, totalCharge, tip)
# id get from issued, tip is random and function of total charge
# calculate total charge

issued_file = open('../tables/issued.csv')
sells_file = open('../tables/sells.csv')
contains_file = open('../tables/contains.csv')

issued_csv = list(csv.reader(issued_file, delimiter=';'))[1:]
sells_csv = list(csv.reader(sells_file, delimiter=';'))[1:]
contains_csv = list(csv.reader(contains_file, delimiter=';'))[1:]

bills_file = open('../tables/bills.csv', 'w')
billsWriter = csv.writer(bills_file, delimiter=';')
#billsWriter = csv.DictWriter(bills_file, fieldnames=['transactionid', 'totalCharge', 'tip'], lineterminator='\n', delimiter=';')

taxMultiplier = 1.07

for issued_row in issued_csv:
	# get transaction id
	tid = issued_row[0]
	
	# get bar
	bar = issued_row[2]
	
	# calculate total charge
	totalCharge = 0.0
	for contains_row in contains_csv:
	
		# find contains entries for given bill
		if(tid == contains_row[0]):
			item = contains_row[1]
			quantity = int(contains_row[2])
			
			# find item price in sells
			for sells_row in sells_csv:
				if(bar == sells_row[0] and item == sells_row[1]):
					price = float(sells_row[2])
				
					# add price of items purchased
					totalCharge += float(quantity) * price
					break
	
	#add 7% tax
	totalCharge = totalCharge * taxMultiplier
	
	# generate tip percentage
	tip_percentage = abs(random.gauss(.15, .05))
	tip = totalCharge * tip_percentage
	row = [tid, round(totalCharge, 2), round(tip, 2)]
	billsWriter.writerow(row)
	print(row)
	