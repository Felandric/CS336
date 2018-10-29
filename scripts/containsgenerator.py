import csv
import random

#contains 

with open("../tables/contains.csv", "w", newline='') as contains:
	with open("../tables/sells.csv", newline='') as sells:
		with open("../tables/issued.csv", newline='') as issued:
			issuedReader = csv.reader(issued, delimiter=';', quotechar='"')
			sellsReader = csv.reader(sells, delimiter=';', quotechar='"')
			containsWriter = csv.writer(contains, delimiter=';')
			
			issuedList = list(issuedReader)[1:]
			sellsList = list(sellsReader)[1:]
						
			containsWriter.writerow(["transactionid", "item", "quantity"])

			minNumItems = 1
			maxNumItems = 5
			
			minQuantity = 1
			maxQuantity = 3
			
			for transaction in issuedList: 
				potentialItems = [ sells for sells in sellsList if transaction[2] == sells[0] ]
				numItemsBought = random.randint(minNumItems, maxNumItems)
				itemsBought = random.sample(potentialItems, numItemsBought)
				for item in itemsBought:
					quantity = random.randint(minQuantity, maxQuantity)
					containsWriter.writerow([transaction[0], item[1], quantity])
