import { UserStructure } from '../Interfaces/UserStructure';

const UserRegistration = async (UserData: UserStructure): Promise<UserStructure> => {
    
    try {

        const response = await fetch('/auth/register', {
            method: "POST",
            headers: { "content-Type": "application/json" },
            body: JSON.stringify(UserData)
        });
        

        if (!response.ok) {
            throw new Error('invalid API response, check network tab!');
        } 
          
        const data = response.json();
        return data;
    } catch (err) {
        console.error(err);
        return Promise.reject('Could not register User.');
    }
}



export {UserRegistration};