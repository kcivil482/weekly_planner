import express from "express";
import dotenv from "dotenv";
import taskRoutes from "./Routes/task.routes.js"
import boardRoutes from "./Routes/board.routes.js"
import mongoose from "mongoose";
import cors from "cors"
import  {auth} from "express-openid-connect"
import pkg from 'express-openid-connect';
const {requiresAuth} = pkg;

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const Client_ID = process.env.CLIENT_ID;
const Domain=process.env.DOMAIN

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: `http://localhost:${PORT}`,
  clientID: Client_ID ,
  issuerBaseURL:`https://${Domain}` ,
  secret: 'LONG_RANDOM_STRING'
};

app.use(auth(config));
app.use(cors())
app.use(express.json());
app.use("/Tasks",taskRoutes);
app.use("/Board",boardRoutes);

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

app.get("/",(req,res)=>{
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
})

app.listen(PORT,()=>{  
    console.log("server running on "+PORT)

    mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
    
});