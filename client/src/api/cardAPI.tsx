import AuthService from '../utils/auth';

const FMP_API_URL = 'https://financialmodelingprep.com/api/v3/';
const FMP_API_KEY = 'J9VPeW6VdlfZ5dGzXcdPl9qdU0bkzBH1'


export const fetchMarketData = async () => {
    try {
        const response = await fetch(`${FMP_API_URL}stock/list?apikey=${FMP_API_KEY}`);
        const data = response.json();
        return data;
    } catch (err) {
        console.error('error fetching market data:', err);
        throw err;
    }
}

export const saveFavorite = async (symbol: string, name: string, price: number) => {
    const userId = AuthService.decodeToken();
    try {
        const response = await fetch(`api/saved-cards/${userId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${AuthService.getToken()}`
            },
            body: JSON.stringify({symbol, name, price}),
        });
        
        if (!response.ok) {
            throw new Error("invalid API response, check network tab");
        }
        const data = response.json();
        return data;
    } catch (err) {
        return Promise.reject('Could not save card.');
    }
}

export const fetchFavorites = async () => {
    const userId = AuthService.decodeToken();
    try {
        const response = await fetch(`/api/saved-cards/${userId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${AuthService.getToken()}`,
            }
        });

        if (!response.ok) {
            throw new Error('Invalid API response, check network tab');
        }
        const data = response.json();
        return data;
    } catch (err) {
        throw new Error('Could not retrive favorites cards');
    }
}