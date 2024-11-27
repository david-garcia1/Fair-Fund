import React, { useState } from 'react';
import { UserRegistration } from '../api/UserRegistration';


const Register: React.FC = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { username, email, password, confirmPassword } = formData;

        if (password !== confirmPassword) {
            setError("passwords do not match.");
            return;
        }

        if (!username || !email || !password) {
            setError("All fields must be filled out.");
            return;
        }

        try {
            await UserRegistration(formData);
            setFormData({ username: '', email: '', password: '', confirmPassword: ''});
            setError(null);
        } catch (err) {
            setError("an error occurred during the registration process.");
        }
    };


    return (
        <div className='container mt-5'>
            <h1 className='text-center'>Register</h1>
            <form className='mx-auto' style={{ maxWidth: '400px' }} onSubmit={handleSubmit}>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                        Username:
                    </label>
                    <input 
                        type="text"
                        id="username"
                        name="username"
                        className="form-control"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor='password' className='form-label'>
                        Password:
                    </label>
                    <input 
                        type="password"
                        id="password"
                        name="password"
                        className="form-control"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor='confirmPassword' className="form-label">
                        Confirm Password:
                    </label>
                    <input
                        type='password'
                        id='confirmPassword'
                        name='confirmPassword'
                        className='form-control'
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type='submit' className='btn btn-primary w-100'>
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;