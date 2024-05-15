import React, { useEffect, useState } from 'react';
import { fetchDataByUrl } from '../services/swapiService';

const DataDetails = ({ item, onBack }) => {
  // State to store the details of the item
  const [details, setDetails] = useState(item);

  useEffect(() => {
    // Function to fetch related data for the item
    const fetchRelatedData = async () => {
      const updatedDetails = { ...item };
      const fetchFields = ['residents', 'films', 'species', 'homeworld', 'vehicles', 'starships', 'people'];

      // Iterate over the fields that need to be fetched
      for (const field of fetchFields) {
        if (item[field]) {
          if (Array.isArray(item[field])) {
            // If the field is an array, fetch all URLs in the array
            const promises = item[field].map(url => fetchDataByUrl(url));
            const data = await Promise.all(promises);
            updatedDetails[field] = data.map(entry => entry.name || entry.title);
          } else {
            // If the field is a single URL, fetch the data
            const data = await fetchDataByUrl(item[field]);
            updatedDetails[field] = data.name || data.title;
          }
        }
      }

      // Default species to "Human" if not listed or empty
      if (!updatedDetails.species || updatedDetails.species.length === 0) {
        updatedDetails.species = ['Human'];
      }

      // Remove unwanted fields
      delete updatedDetails.created;
      delete updatedDetails.edited;
      delete updatedDetails.url;

      // Update state with the fetched details
      setDetails(updatedDetails);
    };

    fetchRelatedData();
  }, [item]); // Dependency array includes item to re-run effect when item changes

  // If details are not available, return null
  if (!details) return null;

  // Function to render details of the item
  const renderDetails = () => {
    return Object.entries(details).map(([key, value]) => (
      <p key={key}>
        <strong>{key.replace(/_/g, ' ')}:</strong>{' '}
        {Array.isArray(value)
          ? value.join(', ')
          : (value !== null && value !== undefined ? value.toString() : '')}
      </p>
    ));
  };

  return (
    <section>
      <button onClick={onBack}>Back</button>
      <h2>Details</h2>
      {renderDetails()}
    </section>
  );
};

export default DataDetails;