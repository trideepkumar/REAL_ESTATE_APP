import User from "../models/user.js"
import bcryptjs from 'bcryptjs'
// import { errorHandler } from "../middlewares/errorHandler.js"
import { validateRegister } from "../helpers/auth.js"

export const signup = async (req, res, next) => {
   try {
      const { username, password, email } = req.body
      const { errors, isValid } = validateRegister(req.body)
      if (!isValid) {
         return res.status(400).json(errors)
      }
      const existing = await User.findOne({ email })
       if (existing) {
         return res.status(409).json({ message: "User already exists... Go to Sign in" })
       }
       const usernameExisting = await User.findOne({ username })
       if (usernameExisting) {
         return res.status(409).json({ message: "Username already exists..." })
       }
   
      const hashedPassword = bcryptjs.hashSync(password, 10)
      const newUser = new User({ username, email, password: hashedPassword })
      await newUser.save()
      res.status(201).json('user signup successfull!!')
   } catch (err) {
      console.log(err)
      return res
        .status(500)
        .json({ message: "Something went wrong. Please try again later" })
    }
   }