import React, { useEffect, useState } from 'react';

function App() {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/fakeDataSet')
      .then(res => res.json())
      .then(data => setAds(data))
      .catch(error => console.error('Error fetching data:', error))
  }, [])

  return (
    <div>
      <h1>Ads</h1>
      <pre>{JSON.stringify(ads, null, 2)}</pre>
    </div>
  )
}

export default App;