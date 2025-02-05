import React from "react";

// creates default footer

const Footer = () => {
  return (
    <footer className="bg-body-tertiary text-center shadow-lg fixed-bottom text-black py-1">
      <p>&copy; {new Date().getFullYear()} CatX. All rights reserved.</p>
      <a href="/about" className="footer-link">
        About us
      </a>
    </footer>
  );
};

export default Footer;
