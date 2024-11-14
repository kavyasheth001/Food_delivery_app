import mongoose from "mongoose";

export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://KavyaSheth01:01052005K%2Fk@cluster0.tumsh.mongodb.net/food_delivery_app?retryWrites=true&w=majority&appName=Cluster0').then(()=>console.log("db connected"));
}
// mongodb+srv://KavyaSheth01:01052005K%2Fk@cluster0.tumsh.mongodb.net/food_delivery_app?retryWrites=true&w=majority&appName=Cluster0
