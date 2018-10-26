import csv
import random

# need sells, issued, contains
# bills(id, totalCharge, tip)
# id get from issued, tip is random and function of total charge
# calculate total charge

issued_file = open('C:\Users\Daniel\Desktop\issued.csv')
sells_file = open('C:\Users\Daniel\Desktop\sells.csv')
contains_file = open('C:\Users\Daniel\Desktop\contains.csv')

issued_csv = list(csv.reader(issued_file, delimiter=';'))
sells_csv = list(csv.reader(sells_file, delimiter=';'))
contains_csv = list(csv.reader(contains_file, delimiter=';'))

bills_file = open('C:\\Users\\Daniel\\Desktop\\bills.csv', 'w')
billsWriter = csv.writer(bills_file, delimiter=';')
#billsWriter = csv.DictWriter(bills_file, fieldnames=['transactionid', 'totalCharge', 'tip'], lineterminator='\n', delimiter=';')

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
	
	# generate tip percentage
	tip_percentage = abs(random.gauss(.15, .05))
	tip = totalCharge * tip_percentage
	row = [tid, round(totalCharge, 2), round(tip, 2)]
	billsWriter.writerow(row)
	print row
	