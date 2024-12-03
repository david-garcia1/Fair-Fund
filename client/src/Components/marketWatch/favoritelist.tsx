
import React, { useEffect, useState } from 'react';
import { fetchFavorites } from '../../api/cardAPI';

interface Favorite {
    symbol: string;
    name: string;
    price: number;
}

const FavoritesList: React.FC = () => {
    const [favorites, setFavorites] = useState<Favorite[]>([]);

    useEffect(() => {
        const loadFavorites = async () => {
            try {
                const data = await fetchFavorites();
                setFavorites(data);
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        };

        loadFavorites();
    }, []);

    return (
        <div className="favorites-list">
            <h3>Saved Favorites</h3>
            <ul>
                {favorites.map((favorite) => (
                    <li key={favorite.symbol}>
                        {favorite.name} ({favorite.symbol}): ${favorite.price.toFixed(2)}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FavoritesList;
