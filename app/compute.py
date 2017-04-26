import pandas as pd

collisions = pd.read_csv('collisions.csv')
boroughs = ['BRONX', 'BROOKLYN', 'QUEENS', 'MANHATTAN', 'STATEN ISLAND']

def borough_totals():
    borough_total = {}
    for borough in boroughs:
        borough_total[borough] = len(collisions[collisions['BOROUGH'] == borough])

    return borough_total
