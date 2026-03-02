import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session';
import passport from './api/config/passport.js';  // ✅ only one passport import
import productRoutes from './api/routes/productRoutes.js';
import userRoutes from './api/routes/userRoutes.js';
import paymentRoutes from './api/routes/paymentRoutes.js';
import authRoutes from './api/routes/authRoutes.js';  // ✅ was missing

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.log('❌ Error:', err));

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,  // ✅ important for Google OAuth
}));

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('Hello, your server is working!');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});