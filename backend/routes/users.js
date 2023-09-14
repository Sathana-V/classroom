import express from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { UserModel } from "../models/Users.js"

const router = express.Router()
router.post("/register", async (req, res) => {
  console.log(req);
    const { username, password, email, type } = req.body;
    console.log(username, password,email, type);
    try {
      const existingUser = await UserModel.findOne({ email });
  
      if (existingUser) {
        return res.status(400).json(
          { 
            message: "Email already exists" 
          });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = new UserModel({ email, password: hashedPassword, username, type });
      await newUser.save().then(async() => {
        const user = await UserModel.findOne({ email });
        const token = jwt.sign({ id: user._id, type: user.type}, "secret");
        res.status(201).cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' }).json({
          userId: user._id,
          token,
          username,
          email,
          type,
          message: "User registered successfully" });
      })
      
      
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await UserModel.findOne({ email: username });
  
      if (!user) {
        return res.status(400).json({ message: "User does not exist" });
      }
  
      const comparePassword = await bcrypt.compare(password, user.password);
  
      if (!comparePassword) {
        return res.status(401).json({ message: "Invalid password" });
      }
  
      const token = jwt.sign({ id: user._id }, "secret");
  
      return res.json({ token, userId: user._id, message: "welcome", userDetails: user});
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  router.get("/all", async (req, res) => {
    const user = await UserModel.find()
    res.status(200).json({data: user})
  })
  router.get("/current/:id", async (req, res) => {
    console.log('hello', req.params.id);
    try {
    const user = await UserModel.findOne({_id: req.params.id}).populate('class')
    res.status(200).json({data: user})
    } catch (err) {
      console.log('error: ', err);
      res.status(400).json({error: err})
    }
    
  })

  const secretKey = 'secret'; // Replace with your actual secret key
  
  const checkTokenExpiration = (req, res, next) => {
    const token = req.cookies && req.cookies.token; // Assuming you're using cookies for tokens
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    try {
      const decoded = jwt.verify(token, secretKey);
  
      // Check if token is expired
      if (decoded.exp * 1000 < Date.now()) {
        return res.status(401).json({ message: 'Token expired' });
      }
  
      req.user = decoded; // Attach the decoded user data to the request object
      next(); // Token is valid and not expired, proceed to the next middleware/route
    } catch (error) {
      return res.status(401).json({ message: 'Token invalid' });
    }
  };
  
  // Use the middleware for protected routes
  router.get('/protected', checkTokenExpiration, (req, res) => {
    // The user object is attached by the middleware
    console.log(req.user); // Authenticated user's data
    res.json({ message: 'Protected resource content' });
  }); 
export {router as userRouter}