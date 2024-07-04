import React, { useState, useEffect } from 'react';
import './App.css'
import axios from 'axios';

const CryptoTable = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortKey, setSortKey] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        // Using .then
        axios.get('https://api.coingecko.com/api/v3/coins/markets', {
            params: {
                vs_currency: 'usd',
                order: 'market_cap_desc',
                per_page: 10,
                page: 1,
                sparkline: false
            }
        }).then(response => {
            setData(response.data);
        }).catch(error => {
            console.error('Error fetching data with .then:', error);
        });

        // Using async/await
        try {
            const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
                params: {
                    vs_currency: 'usd',
                    order: 'market_cap_desc',
                    per_page: 10,
                    page: 1,
                    sparkline: false
                }
            });
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data with async/await:', error);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSort = (key) => {
        setSortKey(key);
        const sortedData = [...data].sort((a, b) => {
            if (key === 'market_cap') {
                return b.market_cap - a.market_cap;
            } else if (key === 'percentage_change') {
                return b.price_change_percentage_24h - a.price_change_percentage_24h;
            }
            return 0;
        });
        setData(sortedData);
    };

    const filteredData = data.filter(coin =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            {/* <h1>Crypto Table</h1> */}
            <input type="text" placeholder="Search by name" value={searchTerm} onChange={handleSearch} />
            <button onClick={() => handleSort('market_cap')}>Sort by Market Cap</button>
            <button onClick={() => handleSort('percentage_change')}>Sort by Percentage Change</button>
            <table>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Symbol</th>
                        <th>Current Price</th>
                        <th>Total Volume</th>
                        <th>Market Cap</th>
                        <th>Percentage Change (24h)</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map(coin => (
                        <tr key={coin.id}>
                            <td><img src={coin.image} alt={coin.name} width="30" height="30" /></td>
                            <td>{coin.name}</td>
                            <td>{coin.symbol}</td>
                            <td>${coin.current_price}</td>
                            <td>${coin.total_volume}</td>
                            <td>${coin.market_cap}</td>
                            <td>{coin.price_change_percentage_24h}%</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CryptoTable;