import React, { useState, useEffect } from 'react';
import { getCategories, getCategoryData } from './services/swapiService';
import CategoryDropdown from './components/CategoryDropdown';
import Search from './components/Search';
import DataList from './components/DataList';
import DataDetails from './components/DataDetails';
import './App.css';

const App = () => {
  // State variables
  const [categories, setCategories] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        delete data.films; // Remove films from categories
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch data when selected category changes
  useEffect(() => {
    if (selectedCategory) {
      const fetchData = async () => {
        try {
          const data = await getCategoryData(categories[selectedCategory]);
          setData(data);
          setFilteredData(data);
          setSelectedItem(null); // Clear selected item when category changes
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };
      fetchData();
    }
  }, [selectedCategory, categories]);

  // Handle search functionality
  const handleSearch = (query) => {
    const filtered = data.filter(item =>
      item.name?.toLowerCase().includes(query.toLowerCase()) ||
      item.title?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  // Handle item selection
  const handleSelect = (item) => {
    setSelectedItem(item);
  };

  // Handle back button click
  const handleBack = () => {
    setSelectedItem(null);
  };

  return (
    <main>
      <div className="container">
        <div className="scroll-container">
          <div className="scroll-text">
            <h1>Star Wars Data</h1>
            <p className="scroll-text-p">A long time ago, in data far away</p>
            <p className="scroll-text-p">Select a category from the dropdown</p>
            <p className="scroll-text-p">Search for a specific item</p>
            <p className="scroll-text-p">or click on an item to view details</p>
          </div>
        </div>
        {!selectedItem && (
          <>
            {/* Render category dropdown */}
            <CategoryDropdown categories={categories} onSelect={setSelectedCategory} />
            {selectedCategory && <Search onSearch={handleSearch} />}
            {/* Render data list */}
            <DataList data={filteredData} onSelect={handleSelect} />
          </>
        )}
        {selectedItem && (
          // Render data details
          <DataDetails item={selectedItem} onBack={handleBack} />
        )}
      </div>
    </main>
  );
};

export default App;