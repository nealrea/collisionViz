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
