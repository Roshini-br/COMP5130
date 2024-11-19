import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MantineProvider } from "@mantine/core";
import { BrowserRouter as Router } from "react-router-dom";
import "@mantine/core/styles.css";
import { emotionTransform, MantineEmotionProvider } from "@mantine/emotion";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "@mantine/notifications/styles.css";
import { Notifications } from "@mantine/notifications";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY as string);
root.render(
  <React.StrictMode>
    <MantineProvider stylesTransform={emotionTransform}>
      <MantineEmotionProvider>
        <Notifications />
        <Elements stripe={stripePromise}>
          <Router>
            <App />
          </Router>
        </Elements>
      </MantineEmotionProvider>
    </MantineProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
