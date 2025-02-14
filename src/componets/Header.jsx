import React, { memo, useContext, useState } from "react";
import { Link, NavLink } from "react-router";
import { ProductContext } from "../context/productContext";

const Header = memo(() => {
  const [isOpen, setIsOpen] = useState(false);

  const { searchQuery, setSearchQuery, cart } = useContext(ProductContext);

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to={"/"}>
          E Commerce App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-controls="navbarsExample03"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`navbar-collapse collapse ${isOpen ? "show" : ""}`}
          id="navbarsExample03"
        >
          <ul className="navbar-nav m-auto mb-2 mb-sm-0">
            <li className="nav-item">
              <NavLink className="nav-link" to={"/"}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={"/cart"}>
                Cart ({cart.length})
              </NavLink>
            </li>
          </ul>
          <form role="search">
            <input
              className="form-control"
              type="search"
              placeholder="Search product"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
      </div>
    </nav>
  );
});

export default Header;
