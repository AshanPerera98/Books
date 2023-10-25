import React, { useEffect, useState } from "react";
import "./CartBook.css";
import { getBook, modifyCart, removeCart } from "../../api/FireBaseConfig";

function CartBook(props) {
  const [book, setBook] = useState([]);
  const [quantity, setQuantity] = useState([]);

  useEffect(() => {
    setQuantity(props.item.quantity);

    const fetchData = async () => {
      const bookItem = await getBook(props.item.bookId);
      setBook(bookItem);
    };

    fetchData().catch(console.error);
  }, []);

  const add = async () => {
    const modified = await modifyCart(props.item.id, true);
    setQuantity(quantity + 1);
    props.setChange(!props.change);
  };

  const remove = async () => {
    const modified = await modifyCart(props.item.id, false);
    setQuantity(quantity - 1);
    props.setChange(!props.change);
  };

  const deleteCart = async () => {
    await removeCart(props.item.id);
    props.setChange(!props.change);
  };

  const disableMinus = () => {
    return quantity > 1 ? false : true;
  };

  return (
    <div className="cart-book border-bottom columns">
      <div className="column is-two-fifths">
        <p className="title is-4">{book.title}</p>
        <p className="subtitle is-6">{book.author}</p>
      </div>
      <div className="column qty">
        <button
          className="button is-rounded"
          onClick={remove}
          disabled={disableMinus()}
        >
          <span className="icon is-small">
            <i className="fa-solid fa-minus"></i>
          </span>
        </button>
        <p className="is-size-4 mx-4">{quantity}</p>
        <button className="button is-rounded" onClick={add}>
          <span className="icon is-small">
            <i className="fa-solid fa-plus"></i>
          </span>
        </button>
      </div>
      <div className="column qty">
        <button
          className="button is-rounded is-danger is-outlined"
          onClick={deleteCart}
        >
          <span className="icon is-small">
            <i className="fa-solid fa-trash"></i>
          </span>
        </button>
      </div>
      <div className="column has-text-right">
        <p className="is-size-5">LKR {book.price}</p>
      </div>
      <div className="column has-text-right">
        <p className="is-size-5">
          LKR {Number(book.price * quantity).toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export default CartBook;
