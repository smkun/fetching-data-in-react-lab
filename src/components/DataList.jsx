import React from 'react';

const DataList = ({ data, onSelect }) => {
  return (
    <section>
      <h2>Data ({data.length})</h2>
      <ul>
        {/* Map over the data array and render a list item for each item */}
        {data.map((item) => (
          <li key={item.url} onClick={() => onSelect(item)}>
            {/* Display the name or title of the item */}
            <h3>{item.name || item.title}</h3>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default DataList;