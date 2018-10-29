import csv
import random
import uuid

#issued 

with open("../tables/issued.csv", "w", newline='') as issued:
	with open("../tables/bars.csv", newline='') as bars:
		with open("../tables/drinkers.csv", newline='') as drinkers:
			drinkersReader = csv.reader(drinkers, delimiter=';', quotechar='"')
			barsReader = csv.reader(bars, delimiter=';', quotechar='"')
			issuedWriter = csv.writer(issued, delimiter=';')

			barsList = list(barsReader)[1:]
			drinkersList = list(drinkersReader)[1:]

			minAttendance = 1
			maxAttendance = 5
			
			issuedWriter.writerow(["transactionid", "issuedto", "issuedby", "date", "hour", "minute"])

			for bar in barsList:
				potentialDrinkers = [ drinker for drinker in drinkersList if drinker[4] == bar[1] ]
				for drinker in potentialDrinkers:
					for x in range(random.randint(minAttendance, maxAttendance)): #drinkers can go to the bar between 1 and 7 times
						
						hour = random.randint(int(bar[6]), int(bar[7]) - 1)
						minute = random.randint(0, 59)
						
						date = "%d/%d/%d"%(random.randint(1, 12), random.randint(1, 29), 2018)
						
						issuedWriter.writerow([uuid.uuid4(), drinker[0], bar[0], date, hour, minute])