# Data Viz Project Proposal

### John Spencer, Michael Hendrickson, Neal "The Real Neal" Rea

## Dev Setup
1. Move to app directory
```
$ cd app
```
2. Create virtual environment (optional)
```
$ virtualenv venv
```
3. Activate virtual environment (optional)
```
$ source venv/bin/activate
```
4. Install python modules
```
$ pip install -r requirements.txt
```
5. Serve app
```
$ python app.py
```

## Project Overview

### Background and Motivation
In a city as densely populated as New York City, traffic collisions are frequent and inevitable. A compact transit structure and many varying forms of transportation lead to dangerous traffic congestion and collisions. Bicyclists, in particular, face the brunt of these collisions due to limited protection and transit frequency. As cyclists in New York, we are interested in understanding where bicycle collisions occur, who's involved in them, and why they happen. The city of New York has also shown a great deal of interest in this area, as demonstrated by the Vision Zero program. The goal of this program is to reach zero pedestrian fatalities by approximately the year 2030. We would like to expand on that goal to include bicyclists. Mike and John have taken this project a step further and have initiated a biking startup called Cyqlo, which is focusing on providing users with safe biking routes around the city. Analyzing traffic incident data is invaluable information to them and may help to build a mobile platform that provides cyclists with the safest possible route.

### Project Objectives
Our goal is to use New York City collision data to analyze trends and/or anomalies in biking accidents throughout time, based on location, parties involved, and the cause of accident.  We would hope that our results could be used by the city to implement safer traffic regulations in dangerous, accident-prone areas. We also have a stretch goal of determining if there is a significant correlation between accidents and the weather and if the type of weather can determine the number, type, or location of collisions around NYC. Discovering and sharing this information may allow cyclists to make better decisions when navigating throughout the city.

### Data
Our collision data will be taken from NYC Open Data:
https://data.cityofnewyork.us/Public-Safety/NYPD-Motor-Vehicle-Collisions/h9gi-nx95
This data which goes back to 2012, includes the date, time, coordinates, and accident location. In addition, it includes the number of people, pedestrians, cyclists, and motorists either injured or killed and the major contributing factors of the accident such as, driver distraction, failure to yield, and so on.

We have normalized our collision data using traffic data taken from Open NY:
https://data.ny.gov/Transportation/Annual-Average-Daily-Traffic-AADT-Beginning-1977/6amx-2pbv/data
This data presents the Annual Average Daily Traffic (AADT) at numerous intersetions across the five boroughs of New York City. Dating back to 1977 through 2014, this dataset includes the cross-street names, AADT, and various regional information.

### Data Processing
First of all, we cleaned the collision data of any rows containing incomplete or null information. This included rows with empty longitude and latitude information, as this project is based around a map vizualization. This data required some manipulation in order to place data points on the New York City map in a non-obstructive, visually pleasing manner. Secondly, we cleaned and processed the AADT data by geocoding longitude and latitude information to each of the intersections using the given cross-street names (a necessary step as our collision data is organized by longitude/latitude coordinates).  Thirdly, we merged the two datasets on the location field and normalized our collision data by finding a "collision rate per million vehicles" at each collision location. Without the normalization, our collision data was essentially a population map based on traffic density, street proximity, and land area.
If at some point our stretch goal of integrating weather data is met, we will need to represent the weather data as average daily values across three weather stations (Central Park, JFK, Laguardia Airport) in order to optimize readability and gain a more representative sample for the day's rainfall across the city.

### Visualization
The foundation of our visualization is a map of New York City. The user is then able to zoom to a desired area and select a biking route based on start and end points. Upon selection of start and end points, a default route is instantly generated and various statistics along that route are calculated, including the five most dangerous intersections and their collision rates and the top six causes of collisions along the route. This information is generated on two separate radar plots below the map while the five most dangerous intersections are highlighted on the map. The user then has the option to select a new route, either by selecting new start and end points or clicking the route and dragging/dropping to a new location. The new statistical information is displayed on the radar plots, overlaying the previous route's information for effortless safety comparisons. 

### Project Schedule
3/27/17: Set up project repository.

3/30/17: Have basic bar charts showing number of collisions by year based on collision type.

3/30/17: Decide on web stack and how to best incorporate a map.

4/6/17: Finish data cleaning and begin location data processing

4/20/17: Understand how we'll represent data on a map with D3

4/27/17: Build basic web app to serve data, figure out how much to send to user at a time, and have basic D3 map of NYC with zooming

5/4/17: Build routing functionality. Highlight dangerous intersections. Make ajax requests for more data when needed.

5/11/17: Display statistical info using D3 radar plots.

5/18/17: Slide some weather data in the mix (maybe) and do a sick nasty presentation rock on.
