import { useEffect, useState } from 'react';

function App() {
  const [info, setInfo] = useState([]); // Initialize as array

  useEffect(() => {
    fetch('http://localhost:5000/api/data')
      .then(res => res.json())
      .then(data => setInfo(data)) // 'data' is the full array from dummyData
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1>Backend Data:</h1>
      {/* Map through the array to show titles */}
      <ul>
        {info.map(item => (
          <li key={item.id}>{item.title} - {item.tech} - {item.difficulty}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;