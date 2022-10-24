import React from 'react';

function Login() {
  return (
    <div>
      <input
        type="email"
        name="email-input"
        id="email-input"
        data-testid="email-input"
      />
      <input
        type="text"
        name="password-input"
        id="password-input"
        data-testid="password-input"
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        // onClick={ /* handleCLick */ }
      >
        Enviar
      </button>
    </div>
  );
}

export default Login;
