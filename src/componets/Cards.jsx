import "./card.css";
import React, { memo, useContext } from "react";
import { ProductContext } from "../context/productContext";

const Cards = memo(() => {
  const { filteredProducts, cartDispatch } = useContext(ProductContext);

  console.log("card rendering");
  return (
    <div className="album py-5 bg-body-tertiary">
      <div className="container">
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
      </div>
    </div>
  );
});

export default Cards;
