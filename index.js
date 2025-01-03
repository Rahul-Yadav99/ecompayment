const express = require('express')
const cors = require('cors')
const body = require('body-parser')
const app = express()
const Razorpay = require("razorpay")
require('dotenv').config();

const instance = new Razorpay({
    key_id: 'rzp_test_W1As5WgUmla9nV',
    key_secret: 'R0HPzLmlfXMfXQVHs0wU4nNY'
})

app.use(cors())
app.use(body.urlencoded({ extended: false }))
app.use(body.json())

app.post('/order', async (req, res) => {
    try {
        const newOrder = await instance.orders.create({
            amount: (req.body.amount * 100),
            currency: "INR",
            receipt: "CO_RP" + Date.now(),
            
        })
        res.json({
            amount: newOrder.amount,
            orderId: newOrder.id
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

app.get('/payments', async (req, res) => {
    try {
        const payments = await instance.payments.all()
        res.json(payments)
    } catch (error) {
        res.status(500).json(error)
    }
})
app.listen('https://ecompayment.vercel.app/order')