import React, { useEffect, useState } from "react";
import CartBook from "../../components/CartBook/CartBook";

import "./Cart.css";
import { getBookCart } from "../../api/FireBaseConfig";

function Cart() {
  const [cart, setCart] = useState([]);
  const [change, setChange] = useState(false);
  const [qty, setQty] = useState(0);
  const [net, setNet] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const cartList = await getBookCart();
      setCart(cartList);
    };

    fetchData().catch(console.error);
  }, [change]);

  useEffect(() => {
    let totQty = 0;
    let totNet = 0;

    cart.map((entry) => {
      totQty = totQty + entry.quantity;
      totNet = totNet + entry.quantity * entry.price;
    });

    setQty(totQty);
    setNet(totNet);
  }, [cart, change]);

  return (
    <div className="cart mt-6 ">
      <div className="cart-book columns px-2 mb-6 has-background-light">
        <div className="column is-two-fifths">
          <p className="is-size-5">Book</p>
        </div>
        <div className="column qty">
          <p className="is-size-5">Qantity</p>
        </div>
        <div className="column qty">
          <p className="is-size-5">Remove</p>
        </div>
        <div className="column has-text-right">
          <p className="is-size-5">Unit Price</p>
        </div>
        <div className="column has-text-right">
          <p className="is-size-5">Net Price</p>
        </div>
      </div>
      {cart.map((item) => {
        return (
          <CartBook
            key={item.id}
            item={item}
            change={change}
            setChange={setChange}
          />
        );
      })}
      <div className="cart-book columns px-2 mt-4">
        <div className="column is-two-fifths">
          <p className="title is-4">Total</p>
        </div>
        <div className="column qty">
          <p className="title is-4">{qty}</p>
        </div>
        <div className="column qty">
          <p className="is-size-"></p>
        </div>
        <div className="column has-text-right">
          <p className="title is-4">LKR {Number(net).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

export default Cart;
