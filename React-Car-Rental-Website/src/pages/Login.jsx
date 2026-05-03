import { useState, useContext } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/login.css';
import { Link } from 'react-router-dom';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation - in real app, this would be API call
    if (username === 'admin' && password === 'password') {
      const userData = { username };
      login(userData);
      setError('');
      const returnUrl = new URLSearchParams(window.location.search).get('returnUrl') || '/home';
      navigate(returnUrl);
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login__page">
      <Container>
        <Row className="justify-content-center align-items-center min-vh-100">
          <Col lg="4" md="6" sm="8">
            <div className="login__form">
              <div className="text-center mb-4">
                <h1 className="login__title">Welcome to Car Rental</h1>
                <p className="login__subtitle">Please sign in to continue</p>
              </div>

              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="username" className="form-label">
                    Username
                  </Label>
                  <Input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="form-control"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="password" className="form-label">
                    Password
                  </Label>
                  <Input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="form-control"
                    required
                  />
                </FormGroup>

                {error && (
                  <Alert color="danger" className="text-center">
                    {error}
                  </Alert>
                )}

                <Button
                  type="submit"
                  color="primary"
                  block
                  className="login__btn"
                >
                  Sign In
                </Button>
              </Form>

              <div className="text-center mt-4 pt-3 border-top">
                <p className="mb-0 text-muted"> Don&apos;t have an account?</p>
                <Link to="/register" className="text-decoration-none">
                  Register Now
                </Link>

                <p className="mb-0 text-muted">
                  Demo credentials: admin / password
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
