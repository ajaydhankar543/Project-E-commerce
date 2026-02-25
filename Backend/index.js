import express from 'express';
import 'dotenv/config';

console.log(process.env.PORT);
const app = express();
// Define the PORT variable once so y ou can use it everywhere
const PORT = process.env.PORT || 3000; 


app.get('/', (req, res) => {
  res.send('Hello, your server is working!');
});

// Now use that variable in both places
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});