import React from 'react';

const SearchResults = ({results}) => {
  console.log(results);
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