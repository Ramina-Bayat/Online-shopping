import Layout from "../Layout/Layout";
import { useCart, useCartActions } from "../Providers/CartProvider";
import "./CartPage.css";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart, total } = useCart();
  const dispatch = useCartActions();
  const incHandler = (cartItem) => {
    dispatch({ type: "ADD_TO_CART", payload: cartItem });
  };
  const removeHandler = (cartItem) => {
    dispatch({ type: "REMOVE_PRODUCT", payload: cartItem });
  };
  if (!cart.length)
    return (
      <main>
        <Layout>
          <h2>cart is empty !</h2>
        </Layout>
      </main>
    );

  return (
    <Layout>
      <main className="container">
        <section className="cartCenter">
          <section className="cartItemList">
            {cart.map((item) => {
              return (
                <div className="cartItem">
                  <div className="itemImg">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div>{item.name}</div>
                  <dic>{item.offprice * item.quantity} $</dic>
                  <div className="btnGroup">
                    <button onClick={() => removeHandler(item)}>-</button>
                    <button>{item.quantity}</button>
                    <button onClick={() => incHandler(item)}>+</button>
                  </div>
                </div>
              );
            })}
          </section>
          <CartSummary cart={cart} total={total} />
        </section>
      </main>
    </Layout>
  );
};

export default CartPage;

const CartSummary = ({ cart, total }) => {
  const originalTotalPrice = cart.length
    ? cart.reduce((acc, curr) => {
        return acc + curr.quantity * curr.price;
      }, 0)
    : 0;
  return (
    <>
      <section className="cartSummary">
        <h2 style={{ marginBottom: "30px" }}>Cart summary</h2>
        <div className="summaryItem">
          <p>original total price : </p>
          <p>{originalTotalPrice} $</p>
        </div>
        <div className="summaryItem">
          <p>cart discount : </p>
          <p>{originalTotalPrice - total} $</p>
        </div>

        <div className="summaryItem net">
          <p> net price : </p>
          <p>{total} $</p>
        </div>
        <Link to="/signup?redirect=checkout">
          <button className="btn primary" style={{ marginTop: "20px", width:"100%"}}>
            Go to checkout{" "}
          </button>
        </Link>
      </section>
    </>
  );
};
