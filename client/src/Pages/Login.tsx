import { useState, type FormEvent, type ChangeEvent } from 'react';

import Auth from '../utils/auth';
import { login } from '../api/authAPI';



const Login = () => {
    const [LoginData, setLoginData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setLoginData({
            ...LoginData,
            [name]: value,
        });
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const data = await login(LoginData);
            Auth.login(data.token);
        } catch (err) {
            console.error('Failed to login', err);
        }
    }


    return (
        <div className='d-flex justify-content-center align-items-center vh-100'>
            <div className="card p-4 shadow-lg" style={{ width: '400px' }}>
                <h3 className="text-center mb-4">Login</h3>
                <form className="form login-form" onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label>Username</label>
                        <input 
                            className="form-input"
                            type="text"
                            name="username"
                            value={LoginData.username || ''}
                            onChange={handleChange}
                            />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            className="form-input"
                            type="password"
                            name="password"
                            value={LoginData.password || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <div>{// Remember me button? 
                        }</div>
                        <div>{// create new user button
                        }</div>
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
}

export default Login;