# teleinfo version 0.1.0

Hello, goal of this project is to collect power consomption statistics from french electric meter, and more particularly for the subcription called "tempo".

Tempo is divided into 3 kind of days:
- Bleu days. There are about 300 bleu days in a year; During these days, price of electricity is cheaper
- White days There are about 40 white days in a year; During these days, price of electricity is normal
- Red days. There are about 20 white days in a year; During these days, price of electricity is very expensive

Moreover, each day is split into 2 kind of hours : Full hours and off-peak hours. So in fact, there 6 prices

# Principle

Consomption statistics are collected thanks to a chipset connected on one side to a specific port of the electric meter, and on the other side to a raspberry pi.
Once everything well connected, statistics are available in the serial port of the raspberry pi.
Then a scheduled (every 5 min. with cron) python script, collect the statistics and store them in a mysql database.

Statistics can then be visualized through a web application. Architecture of the web application is the following
- Single Page application
- At server side: NodeJS application
- At client Side: AngularJS apps, jQuery flot for the plotting capabilities, bootstrap for the UI design.

# features

TO BE CONTINUED

# Installation

TO BE CONTINUED

1/ Chipset and raspberry pi instllation. 
2/ Application installation

# Installation

This project is continuously improving. 
It's working.
I write the documentation as I go along.
I will add some screenshot 

