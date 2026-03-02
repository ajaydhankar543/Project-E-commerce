import { useState } from 'react';

export default function Login() {
  const [form, setForm] = useState({ name: '', email: '', age: '', address: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    console.log('User saved:', data);
    alert('User registered successfully!');
    setForm({ name: '', email: '', age: '', address: '' });
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/google';
  };

  return (
    <div>
      <h1>Login / Register</h1>

      {/* Google Login */}
      <button onClick={handleGoogleLogin}>Sign in with Google 🔵</button>

      <hr />

      {/* Manual Form */}
      <h2>Or Register Manually</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
        <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="age" type="number" placeholder="Age" value={form.age} onChange={handleChange} required />
        <input name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}