import React, { useState } from 'react';
import SearchResults from './pages';
const CenteredSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };
  const handleKeyDown = async(event) => {
    if (event.key === 'Enter') {
      console.log('Search term:', searchTerm);
      try{
        const res = await fetch(`http://localhost:8000/api/movies?query=${searchTerm}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        console.log(data.results);
        setSearchResults(data.results);
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
      {searchResults && <SearchResults results={searchResults} />}
    </div>
  );
};

export default CenteredSearchBar;
