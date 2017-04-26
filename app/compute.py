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
