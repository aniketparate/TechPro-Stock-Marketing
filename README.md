## Introduction
  
This web app is intended to provide a simulation of the real stock market. Every user is given an initial amount of 100,000 dollars, which they can use to purchase a variety of stocks. User can also search for a particular stock and view its information. For each stock, we provide a line chart of its price for the last three years so that user can do some analysis.
   
## Tech Stack
 
We used React.js as our frontend framework, and Express, Node as the backend framework. We store user's information in Mongodb. In addition to user's name and password, we also store user's balance as part of the schema.
The 3rd party API that we used are https://www.tiingo.com/ for retrieving the stock price.



## Available Scripts  

In the project directory, you can run:

### `npm run heroku-postbuild`

Builds the app for production. <br>
The build is minified and the filenames include the hashes. <br>
Your app is ready to be deployed! <br> 

### `npm start`  

Renders the app using Express.js server.<br>
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.     
