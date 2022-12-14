import { NavLink } from "react-router-dom";
import { useAuth } from "../../Providers/AuthProvider";
import { useCart } from "../../Providers/CartProvider";
import './Navigation.css'
const Navigation = () => {
  const {cart}=useCart();
  const userData=useAuth();

  return (
    <header className="mainNavigation">
      <nav>
        <ul>
          <div> shopping</div>
          <li className="cartLink">
            <NavLink to="/" className={(navData)=>navData.isActive?"activeLink":""}>home</NavLink>
          </li>
        </ul>

        <ul>
       
          <li>
            <NavLink  to="/cart" className={(navData)=>navData.isActive?"activeLink":""}>
              cart
            </NavLink>
            <span>{cart.length}</span>
          </li>
          <li>
            <NavLink to={userData ? "/profile" : "/login"} className={(navData)=>navData.isActive?"activeLink":""}>
           {userData ? "profile" : "login / signup"}
            </NavLink>
           
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
