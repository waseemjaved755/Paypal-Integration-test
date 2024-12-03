# PayPal Integration Server

This is a simple Node.js server that integrates with PayPal's REST API to handle creating and capturing PayPal orders. It also includes a webhook to listen for PayPal events.

## Features
- Create a PayPal order with the `/create-order` endpoint.
- Redirect the user to approve the order via the PayPal approval URL.
- Capture the approved order with the `/capture-order` endpoint.
- Webhook to handle PayPal events.

---

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
2. Intsall dependencies
   ```bash
   npm install
3. Set up PayPal credentials: Update the following variables in the code:
   ```bash
    const PAYPAL_CLIENT_ID = '<Your-PayPal-Client-ID>';
    const PAYPAL_SECRET = '<Your-PayPal-Secret>';
    const PAYPAL_ENVIRONMENT = 'sandbox';
4. Start the server 
   ```bash
    node server.js
5. Expose via ngrok or nginx http 3000
6. Add the URL to websocket events on Paypal dashboard
7. Testing the Flow
      Create Order:
   
      Call the /create-order endpoint
      Copy the approvalUrl from the response.
   
      Approve Payment:
      Open the approvalUrl in a browser.

      Log in to your PayPal sandbox payer account and approve the payment.
      Check the server logs to confirm the webhook received the event
   
## Preview

![Preview of PayPal Integration](./Screenshot%202024-12-03%20at%206.24.31%20PM.png)

