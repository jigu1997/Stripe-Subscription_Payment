# Stripe-Subscription Payment
This purpose of this app is to create subscriptions for the customers using the [Stripe Api](https://stripe.com/docs/api) . This app comprises of two parts--front-end and back-end . The front-end part is developed using [react-native](https://facebook.github.io/react-native) and the back-end part is developed using [python-flask](http://flask.pocoo.org/)

## How it works ?
### Backend Configurations :
The backend developer has to perform some basic operations in the [Stripe dashboard](https://dashboard.stripe.com/test/dashboard) which are as follows:
 1. Create an account in the Stripe.
 2. Create new Customers , Products and Subscription Plans.
 3. Add Credit-Card information in case the billing method is selected as "charge automatically".
 
#### Stripe API with Python-Flask :
For this app, the backend code has been written using Python-flask framework . The purpose of the backend is to serve as a bridge between Front-end and the Stripe API . The following are the operations performed by the back-end framework:
 1. [List the customers created in the Stripe Dashboard to the front end.](https://stripe.com/docs/api#list_customers)
 2. [List the plans that are created in the Stripe Dashboard.](https://stripe.com/docs/api#list_plans)
 3. [Create Subscription for the Parameters(Customer-id,Plan(s),Payment method) send from the front-end.](https://stripe.com/docs/api#create_subscription)
 
 All the API transactions are done using JSON.
 
### React-Native for Front-end :
The front-end for this app has been developed using react-native framework . It makes use of [fetch()](https://facebook.github.io/react-native/docs/network.html) to make API Calls to the Python-Flask Server . The following tasks are performed by the front-end :
 #### Main Screen :
  1. Listing the Customers using ListView Component from the JSON.
 #### Manage Subscription Screen :
  1. Listing the Plans from JSON.
  2. Displaying available billing-methods.
  3. Creating Subscription for the Customer selected.
  
Any obvious errors have to be handled in the front-end part.

## Installing and Running the App :
 ### Cloning the Project
 Download the .zip of the project using the [link](https://github.com/jigu1997/Stripe-Subscription_Payment/archive/master.zip) and extract the files from the zip in any desired folder.
 ### Setting up Python-Server :
  1. Using command prompt change the current directory to the project directory/Python_files . For instance , if the current directory is C, then
  ```sh
  cd C:/Stripe-Subscription_Payment-master/Python_files
  ```
  2. Copy the keys from keys.txt file in the Command prompt.
  3. Run the server using the following command :
  ```sh
  python app.py
  ```
 ### Running React-native app using expo :
  1. Inside the Project Directory, Run ```npm install```
  2. Wait for the installation process to complete.
  3. Then run ```npm start``` to run the app.
  4. Scan the QR Code using [Expo App](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en).
  
 NOTE : Change the serverURL in App.js and ManageSubscription.js to the Local URL shown in gitBash by expo WITHOUT CHANGING THE DEFAULT PORT(5000).
 
 ![alt Expo URL](https://github.com/jigu1997/Stripe-Subscription_Payment/tree/master/screenshots/expURL.jpg)

