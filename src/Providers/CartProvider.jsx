import{useContext,useReducer,createContext} from "react";
import cartReducer from "./CartReducer";

const CartContext=createContext();//state
const CartContextDispatcher=createContext();//change state

const initialState={
  cart:[],
  total:0
};



const CartProvider = ({children}) => {
  const[cart,dispatch]=useReducer(cartReducer,initialState);
    return ( 
  <CartContext.Provider value={cart}>
    <CartContextDispatcher.Provider value={dispatch}>
        {children} 
    </CartContextDispatcher.Provider>
    </CartContext.Provider>
      
        

     );
}
 
export default CartProvider;
export const useCart=()=>useContext(CartContext);
export const useCartActions=()=>useContext(CartContextDispatcher);