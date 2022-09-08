import Layout from "../Layout/Layout";
import * as data from "../data";
import { useCartActions,useCart } from "../Providers/CartProvider";
import checkInCart from "../utils/checkInCart";
import { toast } from "react-toastify";
const HomePage = () => {
  const { cart } = useCart();
  const dispatch = useCartActions();

  const addProductHandler = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
    toast.success(`${product.name} add to cart !`)
  };
  return (
    <Layout>
      <main>
        <section className="productList">
          {data.products.map((product) => {
            return (
              <section className="product">
                <div className="productImg">
                  <img src={product.image} alt={product.name}></img>
                </div>
                <div className="productDesc">
                  <p>{product.name}</p>
                  <p>$ {product.price}</p>
                  <button className="btn primary"
                    onClick={() => addProductHandler(product)}
                    
                  >
                   {checkInCart(cart,product) ? "In Cart" : "Add to Cart"}
                  </button>
                </div>
              </section>
            );
          })}
        </section>
      </main>
    </Layout>
  );
};

export default HomePage;
