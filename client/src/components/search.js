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
      navigate(`/search-results?query=${encode}`)
      try{
        const res = await fetch(`http://localhost:8000/api/user/history`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({searchTerm: searchTerm})
      });
        console.log(res);
      }catch(error){
        console.error(error);
      }
      
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
