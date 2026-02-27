import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dummyData from '../../../Backend/api/data';

export default function Home() {
  const [info, setInfo] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // fetch('https://api.webdevlopment.studio/api/data')
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setInfo(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1>Backend Data: Kutti Tanu</h1>
      <button onClick={() => navigate('/login')}>Go to Login</button>
      <ul>
        {info.map(item => (
          <li key={item.id}>{item.title} - {item.tech} - {item.difficulty}</li>
        ))}
      </ul>
    </div>
  );
}