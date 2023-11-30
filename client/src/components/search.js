import React, { useState } from 'react';

const CenteredSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };
  const handleKeyDown = async(event) => {
    if (event.key === 'Enter') {
      console.log('Search term:', searchTerm);
      try{
        const res = await fetch('http://localhost:8000/api/movies', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          query: JSON.stringify(searchTerm),
        });
        const data = await res.json();
        console.log(data);
      }catch (error){
        console.error('Search Bar:', error);
      }
    }
  }
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Centered Search Bar</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
        style={{
          padding: '10px',
          width: '300px',
          borderRadius: '5px',
          margin: '10px',
        }}
      />
    </div>
  );
};

export default CenteredSearchBar;
