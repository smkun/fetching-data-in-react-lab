import React, { useState, useEffect } from "react";
import { getCategories, getCategoryData } from "./services/swapiService";
import CategoryDropdown from "./components/CategoryDropdown";
import Search from "./components/Search";
import DataList from "./components/DataList";
import DataDetails from "./components/DataDetails";
import "./App.css";

const App = () => {
    const [categories, setCategories] = useState({});
    const [selectedCategory, setSelectedCategory] = useState("");
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                delete data.films;
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories: ", error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            const fetchData = async () => {
                try {
                    const data = await getCategoryData(
                        categories[selectedCategory]
                    );
                    setData(data);
                    setFilteredData(data);
                    setSelectedItem(null);
                } catch (error) {
                    console.error("Error fetching data: ", error);
                }
            };
            fetchData();
        }
    }, [selectedCategory, categories]);

    const handleSearch = (query) => {
        const filtered = data.filter(
            (item) =>
                item.name?.toLowerCase().includes(query.toLowerCase()) ||
                item.title?.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredData(filtered);
    };

    const handleSelect = (item) => {
        setSelectedItem(item);
    };

    const handleBack = () => {
        setSelectedItem(null);
        setFilteredData(data);
    };

    return (
        <main>
            <div className="container">
                <div className="scroll-container">
                    <div className="scroll-text">
                        <h1>Star Wars Data</h1>
                        <p className="scroll-text-p">
                            A long time ago, in data far away
                        </p>
                        <p className="scroll-text-p">
                            Select a category from the dropdown
                        </p>
                        <p className="scroll-text-p">
                            Search for a specific item
                        </p>
                        <p className="scroll-text-p">
                            or click on an item to view details
                        </p>
                    </div>
                </div>
                {!selectedItem && (
                    <>
                        <CategoryDropdown
                            categories={categories}
                            onSelect={setSelectedCategory}
                        />
                        {selectedCategory && <Search onSearch={handleSearch} />}
                        <DataList
                            data={filteredData}
                            onSelect={handleSelect}
                        />
                    </>
                )}
                {selectedItem && (
                    <DataDetails
                        item={selectedItem}
                        onBack={handleBack}
                        category={selectedCategory}
                    />
                )}
            </div>
        </main>
    );
};

export default App;
