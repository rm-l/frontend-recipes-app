import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import AppContext from '../context/AppContext';

function Login() {
  const { email, setEmail, password, setPassword,
    isDisabled, setIsDisabled } = useContext(AppContext);

  const handleChangeEmail = ({ target }) => {
    const { value } = target;
    setEmail(value);
  };

  const handleChangePassword = ({ target }) => {
    const { value } = target;
    setPassword(value);
  };

  useEffect(() => {
    const Regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const verifyEmail = Regex.test(email);
    const minValue = 7;
    const verifyPass = password.length >= minValue;
    setIsDisabled(!(verifyEmail && verifyPass));
  }, [email, password, setIsDisabled]);

  const handleClick = () => {
    const obj = { email };
    localStorage.setItem('user', JSON.stringify(obj));
  };

  return (
    <div>
      <input
        type="email"
        name="email-input"
        id="email-input"
        data-testid="email-input"
        onChange={ handleChangeEmail }
      />
      <input
        type="text"
        name="password-input"
        id="password-input"
        data-testid="password-input"
        onChange={ handleChangePassword }
      />
      <Link to="/meals">
        <button
          type="button"
          data-testid="login-submit-btn"
          onClick={ handleClick }
          disabled={ isDisabled }
        >
          Enviar
        </button>
      </Link>
      <Footer />
    </div>
  );
}

export default Login;
