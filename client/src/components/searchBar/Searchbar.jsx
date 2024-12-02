import React, { useState } from 'react'
import './SearchBar.scss'

const Searchbar = () => {
    const types = ['Buy', 'Rent']
    const [query, setQuery] = useState({
        type: "Buy",
        property: '',
        location: '',
        price: ''
    })

    const switchType = (val) => {
        setQuery((prev) => {
            return {
                ...prev,
                type: val
            }
        })
    }
    return (
        <div>
            <div className="searchbar">
                <div className="type">
                    {types.map((type, index) => (
                        <button key={index}
                            onClick={() => switchType(type)}
                            className={query.type === type ? 'active' : ''}
                        >
                            {type}
                        </button>
                    ))}
                </div>
                <form>
                    <input type="text" name='Property' placeholder="Type of Property" />
                    <input type="text" name='location' placeholder="Location" />
                    <input type="text" name='price'
                        placeholder="Price Range" />
                    <button>
                        <img src="./search.png" alt="" />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Searchbar