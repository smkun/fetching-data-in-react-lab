import React from 'react';

const CategoryDropdown = ({ categories, onSelect }) => {
  return (
    <section>
      <h2>Select Category</h2>
      <select onChange={(e) => onSelect(e.target.value)}>
        <option value="">Select...</option>
        {/* Map over the categories and render an option for each category */}
        {Object.keys(categories).map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </section>
  );
};

export default CategoryDropdown;