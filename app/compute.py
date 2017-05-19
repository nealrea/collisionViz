import pandas as pd
from geopy.distance import great_circle
from collections import defaultdict

# collisions = pd.read_csv('collisions.csv')
bikes = pd.read_csv('bike_coll_rate.csv', low_memory=False)
bike_array = []
for index, row in bikes.iterrows():
    bike_array.append((row['LOCATION'], row['Collision Rate'],
        [row['CONTRIBUTING FACTOR VEHICLE 1'],
        row['CONTRIBUTING FACTOR VEHICLE 2'],
        row['CONTRIBUTING FACTOR VEHICLE 3'],
        row['CONTRIBUTING FACTOR VEHICLE 4'],
        row['CONTRIBUTING FACTOR VEHICLE 5']]))
bike_array
boroughs = ['Bronx', 'Brooklyn', 'Queens', 'Manhattan', 'Staten Island']

def borough_totals():
    borough_total = {}
    for borough in boroughs:
        borough_total[borough] = len(collisions[collisions['BOROUGH'] == borough.upper()])

    return borough_total

def zip_totals():
    return collisions['ZIP CODE'].value_counts().to_dict()

def worst_intersections(route_points):
    points = []
    coors = []
    causes = defaultdict(int)
    count = 0.0
    for i in route_points[::2]:
        danger = 0
        closest = 1000000000
        route_point = (i[0], i[1])
        for point in bike_array:
            data_point = point[0]
            distance = great_circle(route_point, data_point)

            if (distance.feet < 100):
                for cause in point[2]:
                    if (cause == 'Unspecified') or (type(cause) == float):
                        # count += 1
                        pass
                    else:
                        count += 1
                        causes[cause] += 1

            new_danger = point[1]
            if (distance.miles <= closest) and (new_danger >= danger):
                closest = distance.miles
                danger = new_danger
        if ((len(points) < 5) and (route_point not in coors)):
            coors.append(route_point)
            points.append((route_point, danger))
        else:
            for point in range(len(points)):
                if danger > points[point][1]:
                    coors.append(route_point)
                    points[point] = (route_point, danger)
    causes = sorted(causes.iteritems(), key=lambda (k,v): v, reverse=True)[:6]
    points = sorted(points, key=lambda x: x[1])
    causes = [(cause[0], (float(cause[1]) / count)) for cause in causes]
    print(causes)
    print(count)
    return points, causes

def bike_intersections():
    intersections = collisions.groupby(['LATITUDE', 'LONGITUDE'])['NUMBER OF CYCLIST INJURED'].value_counts().to_dict()

    data = []
    for intersection in intersections:
        data.append((intersection[0], intersection[1], intersections[intersection]))

    return data

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
