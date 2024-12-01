import { useState } from 'react';
import { useAuth } from './AuthContext/AuthContext';
import { APIlogin } from '../api/authAPI';
import { useNavigate } from 'react-router';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import './PageCSS/loginPage.css';

const LoginPage: React.FC= () => {
    const { login } = useAuth();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = async () => {
      event?.preventDefault();
        const data = await APIlogin({ username, password});
        console.log(data);
        login(data);
    };

    const navigate = useNavigate();

    const handleRegisterRedirect = () => {
        navigate('/register');
    }




    return (
        <Container className="login-container justify-content-center align-items-center mt-5">
          <Row className="justify-content-center">
            <Col xs={12} md={6} lg={4}>
              <div className="login-card p-4">
                <h2 className="text-center">Login</h2>
                <Form onSubmit={handleLogin}>
                  <Form.Group controlId="formUsername" className="mb-4">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </Form.Group>
    
                  <Form.Group controlId="formPassword" className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>
    
                  <Button variant="primary" type="submit" className="w-100">
                    Login
                  </Button>
                </Form>
                <div className="text-center mt-3">
                  <p className="footer-text">
                    Don't have an account? 
                    <Button variant="link" onClick={handleRegisterRedirect} className="p-0">
                      Register here
                    </Button>
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      );
    };

export default LoginPage;
