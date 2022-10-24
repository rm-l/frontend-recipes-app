import React from 'react';

function Header() {
  return (
    <div>
      <button
        type="button"
        data-testid="profile-top-btn"
      >
        <img src="../images/profileicon.svg" alt="profile" />
      </button>
      
    </div>
  );
}

export default Header;
