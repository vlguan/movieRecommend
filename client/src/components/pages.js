import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('query');

  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  console.log(searchQuery);
  useEffect(() => {
    const fetchData = async () => {
      try{
        const res = await fetch(`http://localhost:8000/api/movies?query=${searchQuery}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const results = await res.json();
        setResults(results.results)
      }catch(error){
        setError(error)
      }finally{
        setLoading(false)
      }
    };
    fetchData();
  }, [searchQuery]);
  return (
    <div>
      <h2>Search Results</h2>
      <ul>
        {results.map((result) => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;