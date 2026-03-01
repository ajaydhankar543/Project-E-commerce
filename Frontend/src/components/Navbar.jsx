import { Link } from 'react-router-dom';

export default function Navbar({ cartCount }) {
  return (
    <nav>
      <Link to="/">Home</Link> |
      <Link to="/products">Products</Link> |
      <Link to="/cart">Cart ({cartCount})</Link> |
      <Link to="/login">Login</Link>
    </nav>
  );
}