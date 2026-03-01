export default function Cart({ cart, setCart }) {
  const removeFromCart = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handlePayment = async () => {
    try {
      // Step 1 - Create order from backend
      const res = await fetch('http://localhost:5000/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total }),
      });

      const order = await res.json();

      // Step 2 - Open Razorpay popup
      const options = {
        key: 'rzp_live_SLelO0TleeRL61', // 👈 replace with your test key
        amount: order.amount,
        currency: 'INR',
        name: 'My E-commerce Store',
        description: 'Order Payment',
        order_id: order.id,
        handler: function (response) {
          alert(`✅ Payment Successful!\nPayment ID: ${response.razorpay_payment_id}`);
          setCart([]); // clear cart after payment
        },
        prefill: {
          name: 'Test User',
          email: 'test@example.com',
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.log(err);
      alert('Payment failed!');
    }
  };

  return (
    <div>
      <h1>Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.name} - ₹{item.price}
                <button onClick={() => removeFromCart(index)}>Remove</button>
              </li>
            ))}
          </ul>
          <h3>Total: ₹{total}</h3>
          <button onClick={handlePayment}>Buy Now 💳</button>
        </>
      )}
    </div>
  );
}