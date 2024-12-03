// src/pages/MarketPage.tsx
import React, { useEffect, useState } from 'react';
import { fetchMarketData } from '../api/cardAPI';
import { saveFavorite } from '../api/cardAPI';
import MarketCard from '../Components/marketWatch/marketCard';
import FavoritesList from '../Components/marketWatch/favoritelist';

interface MarketItem {
    symbol: string;
    name: string;
    price: number;
}

const MarketPage: React.FC = () => {
    const [marketData, setMarketData] = useState<MarketItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadMarketData = async () => {
            try {
                const data = await fetchMarketData();
                setMarketData(data.slice(0, 50)); // Limit to 50 items for simplicity
                setLoading(false);
            } catch (error) {
                console.error('Error fetching market data:', error);
                setLoading(false);
            }
        };

        loadMarketData();
    }, []);

    const handleSave = (symbol: string, name: string, price: number) => {
        saveFavorite(symbol, name, price)
            .then(() => alert('Saved successfully!'))
            .catch((error) => console.error('Error saving favorite:', error));
    };

    return (
        <div className="market-page">
            <h2>Market Page</h2>
            {loading ? (
                <p>Loading market data...</p>
            ) : (
                <div className="market-grid">
                    {marketData.map((item) => (
                        <MarketCard
                            key={item.symbol}
                            symbol={item.symbol}
                            name={item.name}
                            price={item.price}
                            onSave={() => handleSave(item.symbol, item.name, item.price)}
                        />
                    ))}
                </div>
            )}
            <FavoritesList />
        </div>
    );
};

export default MarketPage;
