import React from 'react';

interface MarketCardProps {
    symbol: string;
    name: string;
    price: number;
    onSave: () => void;
}


const MarketCard: React.FC<MarketCardProps> = ({ symbol, name, price, onSave }) => {
    return (
        <div className="market-card">
            <h3>{name}</h3>
            <p>Symbol: {symbol}</p>
            <p>Price: ${price.toFixed(2)}</p>
            <button onClick={onSave} className="btn btn-primary">
                Save
            </button>
        </div>
    );
};

export default MarketCard;