import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  // State to store the search query
  const [query, setQuery] = useState('');

  // Event handler for input change
  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  // Event handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <section>
      <h2>Search</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">Enter a name:</label>
        <input
          id="search"
          type="text"
          value={query}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
    </section>
  );
};

export default Search;