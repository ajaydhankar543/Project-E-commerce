import express from 'express';
import Razorpay from 'razorpay';

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create order
router.post('/create-order', async (req, res) => {
  try {
    const { amount } = req.body; // amount in rupees

    const order = await razorpay.orders.create({
      amount: amount * 100, // Razorpay takes paise (1 rupee = 100 paise)
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    });

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Payment error', error: err });
  }
});

export default router;