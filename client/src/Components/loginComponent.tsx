import { useState } from 'react';
import { useAuth } from './AuthContext/AuthContext';
import { APIlogin } from '../api/authAPI';
import { useNavigate } from 'react-router';


const LoginPage: React.FC= () => {
    const { login } = useAuth();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = async () => {
        const data = await APIlogin({ username, password});
        login(data);
    };

    const navigate = useNavigate();

    const handleRegisterRedirect = () => {
        navigate('/register');
    }




    return (
        <div className='d-flex justify-content-center align-items-center vh-100'>
            <div className="card p-4 shadow-lg" style={{ width: '400px' }}>
                <h3 className="text-center mb-4">Login</h3>
                <form className="form login-form" onSubmit={handleLogin}>
                    <div className="form-group mb-3">
                        <label>Username</label>
                        <input 
                            className="form-input"
                            type="text"
                            name="username"
                            value={username || ''}
                            onChange={(e) => setUsername(e.target.value)}
                            />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            className="form-input"
                            type="password"
                            name="password"
                            value={password || ''}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <div className="text-center mt-3">
                            <p>Don't have an account?</p>
                            <button onClick={handleRegisterRedirect} className="btn btn-outline-secondary">
                                Register
                            </button>
                        </div>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" type="submit">
                            Login
                        </button>
                    </div>
                </form>

            </div>

        </div>
    );

};

export default LoginPage;
