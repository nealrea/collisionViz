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
$ source activate venv
```
4. Install python modules
```
$ pip install -r requirements.txt
```
5. Serve app
```
$ python app.py
```

## Project Proposal

### Background and Motivation
In a city as densely populated as New York City, traffic collisions are frequent and inevitable.  A compact transit structure and many varying forms of transportation lead to dangerous traffic congestion and collisions. As New Yorkers we are interested in understanding where vehicle collisions occur, who's involved in them, and why they happen. The city of New York has also shown a great deal of interest in this area, which can be seen through their Vision Zero program. The goal of the program is to reach zero pedestrian fatalities and it will be useful to see which other contributing factors are present. In addition, Mike and John are working for a biking startup called Cyqlo, which is focusing on providing users with safe biking routes around the city. Analyzing traffic incident data is invaluable information to them and may help to build a mobile platform that provides cyclists with the safest possible route.

### Project Objectives
Our goal is to use New York City collision data to analyze trends and/or anomalies in traffic accidents throughout time, based on location, parties involved, and the cause of accident.  We would hope that our results could be used by the city to implement safer traffic regulations in dangerous, accident-prone areas. We also have a stretch goal of determining if there is a significant correlation between accidents and the weather and if the type of weather can determine the number, type, or location of collisions around NYC. Discovering and sharing this information may allow people to make better decisions when they're navigating the city.

### Data
Our collision data will be taken from NYC Open Data:
https://data.cityofnewyork.us/Public-Safety/NYPD-Motor-Vehicle-Collisions/h9gi-nx95
The data which goes back to 2012, includes the date, time, coordinates, and location of the accident. It also includes the number of people, pedestrians, cyclists, and motorists either injured or killed. It also includes the major contributing factors to the accident such as, distraction, failure to yield, and so on.

### Data Processing
First of all we will need to clean the data of any rows that have incomplete information. This includes rows that don't have longitude and latitude information, since this project is based around a map vizualization. The data will require some manipulation in order to place data points on the New York City map in a non-obstructive, visually pleasing manner. We will need to represent the weather data as average daily values across three weather stations (Central Park, JFK, Laguardia Airport) in order to optimize readability and gain a more representative sample for the day's rainfall across the city.

### Visualization
The foundation of our visualization will be a map of New York City.  At each collision location, there will be a marker which will display information (on mouse hover) about the collision (i.e. type of vehicles involved, fatalities, injuries, etc.).  We will also implement a slider object to filter the collisions by time. Furthermore, our visualization will have a weather panel that fill allow users to filter the data by type of weather. We will also include graphs based on our data analysis to determine whether or not weather has any affect on collisions.

### Must-Have Features
We must have a map of NYC that includes all of the accidents since 2012 (as far back as the data goes) and allows users to filter based on death, injury, and type of collision. A user will be able to zoom into a specific area to get more accurate locations of accidents.

### Optional Features
A stretch goal is to show precipitation data by day and how it affects accidents around the city.

### Project Schedule
3/27/17: Set up project repository.

3/30/17: Have basic bar charts showing number of collisions by year based on collision type.

3/30/17: Decide on web stack and how to best incorporate a map.

4/6/17: Finish data cleaning and begin location data processing

4/20/17: Understand how we'll represent data on a map with D3, i.e. nearby collisions are combined when user is zoomed out, and they're dispersed to their actual location as the user zooms

4/27/17: Build basic web app to serve data, figure out how much to send to user at a time, and have basic D3 map of NYC with zooming

5/4/17: Show collisions on map, zooming to expand location accuracy. Make ajax requests for more data when needed. Have time slider to change the date.

5/11/17: Color code data and add visual ques to display different attributes.

5/18/17: Slide some weather data in the mix (maybe) and do a sick nasty presentation rock on.
