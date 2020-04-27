## About Project
This project is about Consent Management. When we book a flight ticket, our details are sold by the airline or the booking platform and we receive unnecessary emails and texts which also is a violation of our privacy. <br/>
This platform allows users to book their ticket without their information being directly visible to the airline. They do have the option to contact you anonymously(just like uber makes calls or send text without showing driver's number and hiding your's as well).<br/>
When the flight is complete, the user has the option to raise their consent and avoid any future communication from the airline.

## How does it work?
The users data is encrypted and stored in swarm(which is a decentralised storage by ethereum). The id generated by swarm is uploaded to blockchain. <br/>
When the passenger makes the booking, the airline's address is added to the list who have the access to the encrypted data. 
When the airline wants to contact the passenger, say send a message, they have to login to their platform and select the passenger, then on a button's click, firstly the airline's credibility of accessing the information is checked and then passenger's contact is retrieved, decrypted all without making it visible to the airline. <br/>
Once the flight is over, the user can login and revoke airline's access to his data.

## How to run?
<b>Step 1:</b> Clone the repository and move inside the project directory. <br/>
<b>Step 2:</b> In the project directory, run:

### `sudo npm install`

It Installs all the dependencies. <br/>
<b>Step 3:</b> In a new terminal, run mysql server and create a database named 'ConsentManagement'. Select the database and run the query present in file named 'query.sql'.<br/>
<b>Step 4:</b> Set your mysql password as 'password' or set your desired password in file named 'server.js'.<br/>
<b>Step 5:</b> In the project directory, start the server by:

### `node server.js`

<b>Step 6:</b> In the project directory, run:

### `sudo npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000] to view it in the browser.
