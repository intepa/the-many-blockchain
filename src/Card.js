import React from "react";

const Card = ({ header, children }) => {
  return (
    <div className="card is-large">
      <header className="card-header">
        <p className="card-header-title">{header}</p>
        <button className="card-header-icon" aria-label="more options">
          <span className="icon">
            <i className="fas fa-angle-down" aria-hidden="false"></i>
          </span>
        </button>
      </header>
      <div className="card-content">
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default Card;
