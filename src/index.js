import React from 'react';
import ReactDOM from 'react-dom';
//import Register from './Registration/register';
import * as serviceWorker from './serviceWorker';
import Booking from './Booking/booking_home';

ReactDOM.render(
  <React.StrictMode>
   <Booking/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
