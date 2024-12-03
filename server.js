const express = require('express');
const bodyParser = require('body-parser');
const paypal = require('@paypal/checkout-server-sdk');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// Environment variables from .env file
const PORT = 3000;
const PAYPAL_CLIENT_ID = 'xx';
const PAYPAL_SECRET = 'xx';
const PAYPAL_ENVIRONMENT = 'sandbox'

const environment =
    PAYPAL_ENVIRONMENT === 'live'
        ? new paypal.core.LiveEnvironment(PAYPAL_CLIENT_ID, PAYPAL_SECRET)
        : new paypal.core.SandboxEnvironment(PAYPAL_CLIENT_ID, PAYPAL_SECRET);

const client = new paypal.core.PayPalHttpClient(environment);


app.post('/create-order', async (req, res) => {
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer('return=representation');
    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [
            {
                amount: {
                    currency_code: 'USD',
                    value: '10.00',
                },
            },
        ],
    });

    try {
        const order = await client.execute(request);

        
        const approvalUrl = order.result.links.find(link => link.rel === 'approve').href;

        res.status(201).json({
            id: order.result.id,
            approvalUrl: approvalUrl,
        });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).send('Error creating order');
    }
});


app.post('/capture-order', async (req, res) => {
    const { orderID } = req.body;
    console.log("vbbn", orderID);

    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    request.requestBody({});

    try {
        const capture = await client.execute(request);
        res.status(200).json({
            status: capture.result.status,
            details: capture.result,
        });
    } catch (error) {
        console.error('Error capturing order:', error);
        res.status(500).send('Error capturing payment');
    }
});


app.post('/webhook', (req, res) => {
    console.log('Webhook Event Received:', req.body);
    res.status(200).send('Webhook received');
});


app.get('/', (req, res) => {
    res.send('PayPal Integration Server is running...');
});


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log('Expose your server using: ngrok http 3000');
});
