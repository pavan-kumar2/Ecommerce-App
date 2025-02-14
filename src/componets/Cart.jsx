import React, { memo, useContext } from "react";
import { ProductContext } from "../context/productContext";
import "./cart.css";
import images from "../utils/images";

const Cart = memo(() => {
  const { cartDispatch, filteredProducts } = useContext(ProductContext);

  return (
    <div className="container row mb-2 mt-5 mx-auto">
      {filteredProducts.length ? (
        filteredProducts.map((product) => (
          <div className="col-md-12" key={product.id}>
            <div className="card flex-md-row mb-4 box-shadow h-md-250">
              <img
                className="card-img-left flex-aut d-md-block m-auto"
                alt={product.title}
                src={product.image}
              />
              <div className="card-body d-flex flex-column align-items-start">
                <strong className="d-inline-block mb-2 text-primary">
                  {product.category}
                </strong>
                <h3 className="mb-0 text-dark text-start">{product.title}</h3>
                <div className="mb-1 text-muted">
                  Rating <b>{product.rating.rate}</b> ({product.rating.count})
                </div>
                <p className="card-text text-start mt-3 mb-3">
                  {product.description}
                </p>

                <div className="cart-action-container d-flex flex-lg-row flex-column">
                  <div className="d-flex align-items-center">
                    <div className="text-dark fw-semibold fs-4 min-w-90">
                      $
                      {Math.trunc(product.price * product.quantity * 100) / 100}
                    </div>

                    <div className="btn-group ms-4">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() =>
                          cartDispatch({
                            type: "MANAGE_QUANTITY",
                            payload: {
                              productId: product.id,
                              actionState: "decrement",
                            },
                          })
                        }
                      >
                        -
                      </button>

                      <button
                        type="button"
                        className="disable-btn btn btn-sm btn-outline-secondary"
                      >
                        {product.quantity}
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() =>
                          cartDispatch({
                            type: "MANAGE_QUANTITY",
                            payload: {
                              productId: product.id,
                              actionState: "increment",
                            },
                          })
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-info px-4 text-white fw-bold"
                      type="button"
                    >
                      Buy Now
                    </button>

                    <button
                      className="btn btn-danger px-4 text-white fw-bold ms-4"
                      onClick={() =>
                        cartDispatch({
                          type: "REMOVE_FROM_CART",
                          productId: product.id,
                        })
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <img
          className="card-img"
          alt="No products found"
          src={images.noCartProducts}
        />
      )}
    </div>
  );
});

export default Cart;
