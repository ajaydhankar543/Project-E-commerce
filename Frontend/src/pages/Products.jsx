import { useEffect, useState } from 'react';

export default function Products({ addToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map(item => (
          <li key={item._id}>
            {item.name} - ₹{item.price} - {item.category}
            <button onClick={() => addToCart(item)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
}