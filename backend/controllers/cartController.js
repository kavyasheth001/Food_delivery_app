import usermodel from "../models/userModel.js"
import userModel from "../models/userModel.js"


const addToCart = async(req,res) =>{
    try {
        let userData = await usermodel.findById(req.body.userId)
        let cartData = await userData.cartData;
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId]=1
        }
        else{
            cartData[req.body.itemId]+=1;
        }
        await usermodel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Item added to cart"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error adding item to cart"})
        
    }
}


const removeFromCart = async(req,res) =>{
    try {
        let userData = await usermodel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if (cartData[req.body.itemId]>0) {
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message :"Removed From Cart"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error removing item from cart"})
        
    }
}


const getCart = async(req,res) =>{
    try {
        let userData =await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success:true,message:cartData})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error fetching cart data"})
                
    }
}

export {addToCart,removeFromCart,getCart}