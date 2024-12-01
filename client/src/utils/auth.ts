import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
    userId: string;
    exp: number;
}

class AuthService {

    loggedIn() {
        const token = this.getToken();
        return token;
    }

    getToken(): string {
        const loggedUser = localStorage.getItem('id_token') || '';
        return loggedUser;
    }

    login(idToken: string) {
        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
    }

    logout() {
        localStorage.removeItem('id_token');
        window.location.assign('/');
    }

    decodeToken(): (string | null) {
        const token = this.getToken();

        if (!token) {
            return null;
        }

        try {
            const decodedToken = jwtDecode<JwtPayload>(token);
            console.log(decodedToken.userId);
            return decodedToken.userId;
        } catch (err) {
            console.error("Error decoding token:", err);
            return null
        }
    }
}

export default new AuthService();