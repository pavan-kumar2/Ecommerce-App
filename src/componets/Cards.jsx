import "./card.css";
import React, { memo, useContext } from "react";
import { ProductContext } from "../context/productContext";
import images from "../utils/images";
import SpinLoader from "./SpinLoader";

const Cards = memo(() => {
  const { filteredProducts, cartDispatch, productsState } =
    useContext(ProductContext);

  const { isLoading, error } = productsState;

  return (
    <div className="album py-5 bg-body-tertiary">
      <div className="container d-flex">
        {isLoading ? (
          <SpinLoader></SpinLoader>
        ) : !isLoading && filteredProducts.length ? (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {filteredProducts.map((product) => (
              <div className="col" key={product.id}>
                <div className="card shadow-sm h-100">
                  <img
                    className="card-img"
                    src={product.image}
                    alt={product.title}
                  />
                  <div className="card-body d-flex flex-column justify-content-between">
                    <h5 className="text-body-emphasis card-name">
                      {product.title}
                    </h5>
                    <p className="card-text card-description">
                      {product.description}
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="text-dark fw-semibold fs-4">
                        ${product.price}
                      </div>
                      <small className="text-body-secondary">
                        Rating <b>{product.rating.rate}</b> (
                        {product.rating.count})
                      </small>
                      <button
                        className="btn btn-info px-4 text-white fw-bold"
                        type="button"
                        onClick={() =>
                          cartDispatch({
                            type: "ADD_TO_CART",
                            newProduct: product,
                          })
                        }
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : !isLoading && !filteredProducts.length && !error ? (
          <img
            className="util-image"
            src={images.noSearchResultFound}
            alt="no-search-result-found"
          />
        ) : !isLoading && !filteredProducts.length && error ? (
          <img
            className="util-image"
            src={images.noProductFound}
            alt="no product found"
          />
        ) : null}
      </div>
    </div>
  );
});

export default Cards;
