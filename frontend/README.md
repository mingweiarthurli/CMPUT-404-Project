# FRONT
front-end for CMPUT 404 Project Part 1:
# How to Run
1. cd into frontend
2. npm install
3. npm start

# Routes
You can refer to the Routes.js in the ./Routing Directory.
# "/": Home Page. 
1) On the top nav bar, you can check for the authors who are following you by clicking on the 'Followers', the authors who are friends with you from the 'Friends', and the authors whom you are following but has not yet accepted your requests from the 'Out-Going Requests'.  
2) You can also upload images or create new posts using the two buttons on the right hand side. Although the backend APIs may not be able to handle them yet, but you can console.log() out the form data that are to be posted. 
3) If you click on the dropdown icon next to the profile picture, there are also options like edit profile, and signout (please note that these features are not implemented yet). 
4) The SplitContainer below the nav bar is connected to the backend, it fetches all of the authors and posts that are viewable to the current author from the database and organize them into list views.
# "/signin": 
authenticates the current user.
# "/signup":
Has advanced form checkings and error detections. Adds the validated user into the database. 
