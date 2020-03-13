# CMPUT-404-Project

Installation Instructions:

  cd into api/
  pipenv install
  pipenv shell
  python manage.py migrate
  python manage.py runserver
  
  requires python 3.6
    -uses djangorestframework
    -uses django-widget-tweaks

## API documentation

hostname = localhost
port= 8000
service = hostname:port

Api call to service/api/authors
  - GET: returns all authors registered in database as JSON
  - POST: allows an author to be added with a generated uuid - will still have to be approved by admin.

Api call to service/api/authors/{author uuid}
  - GET: returns the information on the author with the given ID
  - PUT: ties the data given to the author ID specified (will overwrite)
  - DELETE: removes the author with the ID specified

Api call to service/api/posts
  - GET: returns all posts in the database (TODO: only return posts tagged 'public')
  - POST: allows a post to be added to the database with a generated ID (currently sequential)
  
Api call to service/api/posts/{post ID}
  - GET: returns the details of the post with specified ID
  - PUT: adds a post with the ID specified to the database (will overwrite)
  - DELETE: removes the post with the ID specified.
  
----------------------------------- TO BE UPDATED -----------------------------------
  
Api call to service/api/followers (incomplete)
  - GET: returns a list of all follower relationships
  - POST: allows a new follower relationship to be added to the database
  
Api call to service/api/friendRequests (incomplete)
  - GET: returns a list of all freiendRequest relationships
  - POST: allows a new friendRequest relationship to be added to the database

## UI Mockup

See the `UI_mockup.fig` under the root directory.
[Online vewing](https://www.figma.com/file/sKnTrhQ3f2uaiexQ0A8OSJ/CMPUT-404-Project?node-id=6%3A272)
