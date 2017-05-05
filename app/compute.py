import pandas as pd

collisions = pd.read_csv('collisions.csv')
boroughs = ['Bronx', 'Brooklyn', 'Queens', 'Manhattan', 'Staten Island']

def borough_totals():
    borough_total = {}
    for borough in boroughs:
        borough_total[borough] = len(collisions[collisions['BOROUGH'] == borough.upper()])

    return borough_total

def zip_totals():
    return collisions['ZIP CODE'].value_counts().to_dict()

#returns dict of total bike injuries/deaths filtered by collision rate
def bike_totals(collRate):
	df = collisions[collisions['Collision Rate'] == collRate]
	return {'Injuries': df['NUMBER OF CYCLIST INJURED'].sum(axis=0), 'Deaths': df['NUMBER OF CYCLIST KILLED'].sum(axis=0)}

#returns dict of total pedestrian injuries/deaths filtered by collision rate
def ped_totals(collRate):
	df = collisions[collisions['Collision Rate'] == collRate]
	return {'Injuries': df['NUMBER OF PEDESTRIANS INJURED'].sum(axis=0), 'Deaths': df['NUMBER OF PEDESTRIANS KILLED'].sum(axis=0)}

#returns dict of total motorist injuries/deaths filtered by collision rate
def motorist_totals(collRate):
	df = collisions[collisions['Collision Rate'] == collRate]
	return {'Injuries': df['NUMBER OF MOTORIST INJURED'].sum(axis=0), 'Deaths': df['NUMBER OF MOTORIST KILLED'].sum(axis=0)}