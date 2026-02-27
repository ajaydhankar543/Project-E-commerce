import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import cors from 'cors';
import dummyData from './api/data.js';
import productRoutes from './api/routes/productRoutes.js';
import userRoutes from './api/routes/userRoutes.js';


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.log('❌ Error:', err));


console.log(process.env.PORT);
const app = express();
// Define the PORT variable once so y ou can use it everywhere
const PORT = process.env.PORT || 3000; 


// CORS setup to allow requests from your frontend
app.use(cors({
  origin: process.env.FRONTEND_URL // Dynamically allow your live site
}));

app.use(express.json()); 

app.get('/', (req, res) => {
  res.send('Hello, your server is working!');
});


app.get('/api/data/', (req, res) => {
  res.json(dummyData);
});

// All product routes handled here
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);


// Now use that variable in both places
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});