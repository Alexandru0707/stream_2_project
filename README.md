## Final Project Stream 2
___

This is Code Institute Stream Two Project as part of the Full Stack Development course  
It is a brand new Flask project.__The project__ was made from scratch following the guidance of the course material.  

### Overview

#### What is the dashboard for?
Give us a visual picture of some datasets

#### What does it do?

As an artist this app was created especially to fullfill my needs it helps me to see the date when a painting was done,materials which are used for a particular painting and also the type of.

#### How does it work?
The dashboard displays data from a dataset which was created by me.When one chart is selected the other charts will show the corresponding information.For example if you select a painting the second chart it will show you the type of painting(e.g Animals,Portraits,Landscape).   

### Features  
___
  - Navbar
   - Includes button for chart tour which explains what id does every chart
   - A button to reset selected records  


  - The dashboard on the home page showing:  

   - A select menu to chose painting name.
   - A bar-chart with the type of drawing and their number
   - A chart with the total number of paintings
   - A row-chart with the base of drawing
   - A pie-chart that showing the year when was done
   - A row-chart with equipment used(e.g Acrilic,Pencils)
   - A list which showing all the details of the painting

### Tech Used  
___
Some of the tech used includes:  
  - [Flask](www.djangoproject.com)
    - We use Flask to create the website because it is a simple and flexible python web framework which allows more control over which components to use.
  - [Jinja](http://jinja.pocoo.org/docs/2.10/)
    - We use Jinga2 as the templating engine to seperate content from design
  - [Bootstrap](https://getbootstrap.com/)
    - We use Bootstrap to give our project a simple, responsive layout
  - [MongoDB](https://www.mongodb.com/download-center#production)
    - We use MongoDB for easy storage and fast access.
  - [D3](https://github.com/d3/d3)
    - We use D3 to visualise the data.
  - [DC](https://github.com/dc-js/dc.js)
    - We use DC to make the dashboard interactive
  - [Crossfilter](http://square.github.io/crossfilter/)
    - Crossfilter to group and filter data quickly.
  - [Intro.js](https://github.com/usablica/intro.js.git)
    - We use intro.js to demonstrate features using a step by step guide
  - [Gunicorn](http://gunicorn.org/)
    - We use gunicorn to serve our python web app.  

### Testing

 - Mozila Firefox
 - Google Chrome
 - The charts are not responsive max-width 721px

### Deployent to Heroku
 - I installed and registered with heroku (https://signup.heroku.com/).
 - I created a new heroku app with an address of immense-lake-83146, by entering heroku create at the command line
 - I used pip to install gunicorn.
 - I used the pip freeze command to create a requirements file (requirements.txt) inside the virtual environment.
 - I created a Procfile to tell heroku what coomand and what app to run.
 - I created a Procfile.windows file to locally host my app because gunicorn does not work on windows.
 - I committed and pushed the project to the master branch of the Heroku repository
 - I used the cloud database service mLab add-on to deploy the mongodb database.
 - I imported the data from the file full_attractions_listing.csv into the database heroku_7r1rkpt6.
 - I updated my project to use the new mongodb database and committed and pushed the changes to the heroku repository.

### The deployed website is available
[here](https://stream-2-dashboards.herokuapp.com/)

### Authors
Cozma Alexandru Adrian
