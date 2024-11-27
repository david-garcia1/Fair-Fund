import { UserStructure } from '../Interfaces/UserStructure';

const UserRegistration = async (UserData: UserStructure) => {
    try {
        const response = await fetch('/api/users/register', {
            method: "POST",
            headers: { "content-Type": "application/json" },
            body: JSON.stringify({UserData})
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'User Registration failed.');
        } else {
            return;
        }
    } catch (err) {
        console.error(err);
        return Promise.reject('Could not register User.');
    }
}



export {UserRegistration};