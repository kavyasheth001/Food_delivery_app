import orderModel from "../models/orderModel.js";
import userModel from '../models/userModel.js'




// placing order for frontend

const placeOrder = async (req,res) =>{
    const frontend_url ="http://localhost:5174"

    try {
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address,
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

        const success_url = `${frontend_url}/verify?success=true&orderId=${newOrder._id}`;

       

        res.json({success:true,"checkoutUrl":success_url});


    } catch (error) {
            console.log(error);
            res.json({success:false,message:"Failed to place order"});
    }
}

const verifyOrder = async (req,res)=>{
    const {orderId,success} = req.body;
    try {
        if (success=="true") {
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"Order placed successfully"});
        }
        else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:true,message:"Order cancelled"});
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Failed to verify order"});
        
    }

}
    // user orders for frontend
    const userOrders = async (req,res)=>{
        try {
            const orders = await orderModel.find({userId:req.body.userId});
            res.json({success:true,data:orders})
        } catch (error) {
            console.log(error);
            res.json({success:false,message:"Failed to fetch orders"});
            
        }
    }

    const ListOrders = async (req,res)=>{
        try {
            const orders = await orderModel.find({})
            res.json({success:true,data:orders})
        } catch (error) {
            console.log(error);
            res.json({success:false,message:"Failed to fetch orders"});
            
        }
    }


    // api for updating order status

    const updateStatus =async (req,res)=>{
        try {
            await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
            res.json({success:true,message:"Order status updated"})
        } catch (error) {
            console.log(error);
            res.json({success:false,message:"Failed to update order status"});
            
        }
    }
export {placeOrder,verifyOrder,userOrders,ListOrders,updateStatus}
