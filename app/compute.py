import pandas as pd
import matplotlib.pyplot as plt

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

#plots histo of top 5 collision causes filtered by collision rate and borough
def causes_borough(collRate, borough):
	df = collisions[collisions['BOROUGH'] == borough]
	df = df[df['Collision Rate'] == collRate]
	df = df[df.columns[18:23]]
	df = df.apply(pd.Series.value_counts)
	df['CONTRIBUTING FACTOR VEHICLE 1'] = df['CONTRIBUTING FACTOR VEHICLE 1'].replace(to_replace='NaN', value=0)
	df['CONTRIBUTING FACTOR VEHICLE 2'] = df['CONTRIBUTING FACTOR VEHICLE 2'].replace(to_replace='NaN', value=0)
	df['CONTRIBUTING FACTOR VEHICLE 3'] = df['CONTRIBUTING FACTOR VEHICLE 3'].replace(to_replace='NaN', value=0)
	df['CONTRIBUTING FACTOR VEHICLE 4'] = df['CONTRIBUTING FACTOR VEHICLE 4'].replace(to_replace='NaN', value=0)
	df['CONTRIBUTING FACTOR VEHICLE 5'] = df['CONTRIBUTING FACTOR VEHICLE 5'].replace(to_replace='NaN', value=0)
	df = df['CONTRIBUTING FACTOR VEHICLE 1'] + df['CONTRIBUTING FACTOR VEHICLE 2'] + df['CONTRIBUTING FACTOR VEHICLE 3'] + df['CONTRIBUTING FACTOR VEHICLE 4'] + df['CONTRIBUTING FACTOR VEHICLE 5']
	df = df.drop(df.index[45])
	df = df.nlargest(5)
	plt.bar(range(len(df)), df.values, align='center')
	plt.xticks(range(len(df)), df.index.values, size='large', rotation='vertical')
	plt.title('Top Five Contributing Factors of Traffic Collisions', size=20)
	plt.xlabel('Factors', size=15)
	plt.ylabel('Number of Collisions', size=15)
	plt.show()

#plots histo of top 5 collision causes filtered by collision rate and zipcode
def causes_zipcode(collRate, zipcode):
	df = collisions[collisions['ZIPCODE'] == zipcode]
	df = df[df['Collision Rate'] == collRate]
	df = df[df.columns[18:23]]
	df = df.apply(pd.Series.value_counts)
	df['CONTRIBUTING FACTOR VEHICLE 1'] = df['CONTRIBUTING FACTOR VEHICLE 1'].replace(to_replace='NaN', value=0)
	df['CONTRIBUTING FACTOR VEHICLE 2'] = df['CONTRIBUTING FACTOR VEHICLE 2'].replace(to_replace='NaN', value=0)
	df['CONTRIBUTING FACTOR VEHICLE 3'] = df['CONTRIBUTING FACTOR VEHICLE 3'].replace(to_replace='NaN', value=0)
	df['CONTRIBUTING FACTOR VEHICLE 4'] = df['CONTRIBUTING FACTOR VEHICLE 4'].replace(to_replace='NaN', value=0)
	df['CONTRIBUTING FACTOR VEHICLE 5'] = df['CONTRIBUTING FACTOR VEHICLE 5'].replace(to_replace='NaN', value=0)
	df = df['CONTRIBUTING FACTOR VEHICLE 1'] + df['CONTRIBUTING FACTOR VEHICLE 2'] + df['CONTRIBUTING FACTOR VEHICLE 3'] + df['CONTRIBUTING FACTOR VEHICLE 4'] + df['CONTRIBUTING FACTOR VEHICLE 5']
	df = df.drop(df.index[45])
	df = df.nlargest(5)
	plt.bar(range(len(df)), df.values, align='center')
	plt.xticks(range(len(df)), df.index.values, size='large', rotation='vertical')
	plt.title('Top Five Contributing Factors of Traffic Collisions', size=20)
	plt.xlabel('Factors', size=15)
	plt.ylabel('Number of Collisions', size=15)
	plt.show()





