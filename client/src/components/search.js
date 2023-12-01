import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const CenteredSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };
  const handleKeyDown = async(event) => {
    if (event.key === 'Enter') {
      console.log('Search term:', searchTerm);
      let encode = encodeURIComponent(searchTerm);
      console.log(encode);
      navigate(`/search-results?query=${encode}`)
    }
  }
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Movie Search</h1>
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
