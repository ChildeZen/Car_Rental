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
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/login.css'; // reuse style

export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // SIM photo moved to booking form
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || password.length < 4) {
      setError('Required: username, email, password (min 4 chars)');
      return;
      };

    // Demo: auto-login
    setUploading(true);
    const userData = { id: Date.now(), username, email };
    localStorage.setItem('registeredUser', JSON.stringify(userData));
    login(userData);
    setError('');
    setUploading(false);
    const returnUrl = new URLSearchParams(window.location.search).get('returnUrl') || '/home';
    navigate(returnUrl);
  };

  return (
    <div className="login__page">
      <Container>
        <Row className="justify-content-center align-items-center min-vh-100">
          <Col lg="5" md="7" sm="10">
            <div className="login__form">
              <div className="text-center mb-4">
                <h1 className="login__title">Join Car Rental</h1>
                <p className="login__subtitle">Create account</p>
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
                    placeholder="Username"
                    className="form-control"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="email" className="form-label">
                    Email
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="form-control"
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
                    placeholder="Password (min 4)"
                    className="form-control"
                    required
                    minLength="4"
                  />
                </FormGroup>

                {/* SIM photo moved to booking form */}

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
                  disabled={uploading}
                >
                  {uploading ? 'Uploading...' : 'Create Account'}
                </Button>
              </Form>

              <div className="text-center mt-4 pt-3 border-top">
                <p className="mb-0 text-muted">
                  Already have account?{' '}
                  <Link to="/login" className="text-decoration-none">
                    Sign In
                  </Link>
                </p>
                <p className="mb-0 text-muted small mt-2">Demo: Fill form</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
