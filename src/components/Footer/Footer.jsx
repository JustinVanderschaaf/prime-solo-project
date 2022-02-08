import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

function Footer() {
  return (
    <footer>
      <div>&copy; Created by Justin Vanderschaaf</div>
      <div>
        {" "}
        Check me out on <a href="//github.com/JustinVanderschaaf">gitHub</a>
      </div>
      <div>
        {" "}
        or on <a href="//www.linkedin.com/in/justin-vanderschaaf/">LinkIn</a>
      </div>
    </footer>
  );
}

export default Footer;
