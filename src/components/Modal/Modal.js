import React, { useEffect, useState } from "react";
import { addBookToCart, isBookInCart } from "../../api/FireBaseConfig";

function Modal(props) {
  const [inCart, setInCart] = useState();

  const addToCart = () => {
    addBookToCart(props.book.id, props.book.price);
    setInCart(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const value = await isBookInCart(props.book.id);
      setInCart(value);
    };

    props.book.id && fetchData().catch(console.error);
  }, [props, addToCart]);

  const closeModal = () => {
    props.setOpenBook({});
    props.setOpenModal(false);
    setInCart();
  };

  return (
    <div className={`modal ${props.openModal ? "is-active" : ""}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{props.book.title}</p>
          <button
            className="delete"
            aria-label="close"
            onClick={closeModal}
          ></button>
        </header>
        <section className="modal-card-body">
          <div className="card-image">
            <figure className="image book-cover-image">
              <img src={props.book.image} alt="Placeholder image" />
            </figure>
          </div>
          <div className="card-content">
            <div className="media mb-4">
              <div className="media-content">
                <p className="title is-3 has-text-success">
                  {props.book.title}
                </p>
                <p className="subtitle is-6">{props.book.author}</p>
                <p className="">
                  <span className="tag is-success is-light">
                    {props.book.category}
                  </span>
                  <span className="tag is-light ml-2">
                    {props.book.subCategory}
                  </span>
                </p>
              </div>
            </div>

            <div className="content">
              {props.book.description}
              <br />
              <p className="title is-4 mt-4">
                LKR <span>{props.book.price}</span>
              </p>
            </div>
          </div>
        </section>
        <footer className="modal-card-foot">
          {inCart ? (
            <button className="button is-success is-outline" disabled>
              <span>already in cart</span>
              <span className="icon is-small">
                <i className="fa-solid fa-cart-shopping"></i>
              </span>
            </button>
          ) : (
            <button className="button is-success" onClick={addToCart}>
              <span>Add to cart</span>
              <span className="icon is-small">
                <i className="fa-solid fa-cart-shopping"></i>
              </span>
            </button>
          )}
          <button className="button" onClick={closeModal}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
}

export default Modal;
