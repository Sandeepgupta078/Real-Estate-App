import React, { useState } from 'react';
import './SearchBar.scss';
import { useNavigate } from 'react-router-dom';

const types = ['Buy', 'Rent'];

const SearchBar = () => {
    const navigate = useNavigate();

    const [query, setQuery] = useState({
        type: 'Buy', // Default type
        city: '',
        minPrice: '',
        maxPrice: '',
    });

    // Update the query state when inputs change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setQuery((prev) => ({
            ...prev,
            [name]: value.trim(),
        }));
    };

    // Switch between 'Buy' and 'Rent' options
    const switchType = (type) => {
        setQuery((prev) => ({
            ...prev,
            type,
        }));
    };

    // Handle the form submission to navigate to the filtered URL
    const handleFilterChange = (e) => {
        e.preventDefault();
        const queryString = new URLSearchParams(query).toString();
        navigate(`/list?${queryString}`);
    };

    return (
        <div className="searchbar">
            {/* Toggle for 'Buy' or 'Rent' */}
            <div className="type">
                {types.map((type, index) => (
                    <button
                        key={index}
                        onClick={() => switchType(type)}
                        className={query.type === type ? 'active' : ''}
                    >
                        {type}
                    </button>
                ))}
            </div>

            {/* Search Form */}
            <form onSubmit={handleFilterChange}>
                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={query.city}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="minPrice"
                    min={0}
                    max={10000000}
                    placeholder="Min Price"
                    value={query.minPrice}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="maxPrice"
                    min={0}
                    max={10000000}
                    placeholder="Max Price"
                    value={query.maxPrice}
                    onChange={handleChange}
                />
                <button type="submit">
                    <img src="/search.png" alt="Search" />
                </button>
            </form>
        </div>
    );
};

export default SearchBar;

