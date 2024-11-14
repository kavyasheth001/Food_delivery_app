/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import {useEffect, createContext,  useState } from "react";
export const StoreContext=createContext(null)
import axios from 'axios'

const StoreContextProvider =(children)=>{
const [cartItems,setCartItems]= useState ({});
const url = "http://localhost:4000"
const [token,setToken ]=useState("");
const [food_list,setFoodList] = useState ([]);

const addToCart = async (itemId)=>{
    if (!cartItems[itemId]) {
        setCartItems((prev)=>({...prev,[itemId]:1}))
}
else{
    setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
}
if (token) {
    await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
}
}

const removeFromCart= async(itemId)=>{
    setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    if (token) {
        await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
    }
}

const getTotalCartAmount =()=>{
    let totalAmount = 0;
    for(const item in cartItems){
        if(cartItems[item]>0){

            
            let itemInfo = food_list.find((product)=>{
                if(product._id==item){
                    return product;
                }
            });
            totalAmount+= itemInfo.price * cartItems[item];
           
        } 
    }
    return totalAmount;
}

    const fetchFoodList = async ()=>{
        const response = await axios.get(url+"/api/food/list")
        setFoodList(response.data.data)
    }

    const loadCartData = async (token) => {
        try {
            const response = await axios.get(url + "/api/cart/get", { headers: { token } });
            setCartItems ( response.data.message);
        } catch (error) {
            console.error("Error loading cart data:", error.message);
        }
    };
    



useEffect (()=>{
    
    async function loadData() {
        await fetchFoodList()
        if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"));
            await loadCartData(localStorage.getItem("token"))

        }
    }
     loadData();
},[])

    const contextValue= {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        loadCartData
    }
  return(
        <StoreContext.Provider value ={contextValue}>
            {children.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider;