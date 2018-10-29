import csv
import random

#sells 

with open("../tables/sells.csv", "w", newline='') as sells:
	with open("../tables/bars.csv", newline='') as bars:
		with open("../tables/items.csv", newline='') as items:
			itemsReader = csv.reader(items, delimiter=';', quotechar='"')
			itemsList = list(itemsReader)[1:]
			
			barsReader = csv.reader(bars, delimiter=';', quotechar='"')
			barsList = list(barsReader)[1:]
						
			numBars = len(barsList)
						
			sellsWriter = csv.writer(sells, delimiter=';')
			
			beers = list()
			food = list()
			for item in itemsList:
				if item[1] == "":
					food.append(item[0])
				else:
					beers.append(item[0])
			
			minBeersSold = 5
			minFoodSold = 5
			
			maxFoodSold = 10
			maxBeersSold = 20
			
			minBeersPrice = 5
			maxBeersPrice = 10
			minFoodPrice = 10
			maxFoodPrice = 15
			
			numBeers = len(beers)
			numFood = len(food)
			
			random.shuffle(beers)
			random.shuffle(food)
			
			sellsWriter.writerow(["bar", "item", "price"])
			for bar in barsList:
				numBeersSold = random.randint(minBeersSold, maxBeersSold)
				numFoodSold = random.randint(minFoodSold, maxFoodSold)

				beersSold = [ beers[i] for i in sorted(random.sample(range(numBeers), numBeersSold)) ] #randomly choose indices of beers list, sort them (to maintain the same order in every bar), than pick out those beers to add
				foodSold = [ food[i] for i in sorted(random.sample(range(numFood), numFoodSold)) ]
				
				beersPrices = list()
				for x in range(numBeersSold):
					beersPrices.append(round(random.uniform(minBeersPrice, maxBeersPrice), 2))
				
				foodPrices = list()
				for x in range(numFoodSold):
					foodPrices.append(round(random.uniform(minFoodPrice, maxFoodPrice), 2))
				
				beersPrices = sorted(beersPrices)
				foodPrices = sorted(foodPrices)

				for x in range(numBeersSold):
					sellsWriter.writerow([bar[0], beersSold[x], beersPrices[x]])
				for x in range(numFoodSold):
					sellsWriter.writerow([bar[0], foodSold[x], foodPrices[x]])
				