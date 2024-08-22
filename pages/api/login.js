import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/user";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method == "POST") {
    // console.log(name,email,password)
    try {
      const { email, password } = req.body;
      console.log("api hit", password);
      await mongooseConnect();

      const user = await User.findOne({ email });

      console.log(user);

      // Check if password matches
      const isMatch = await bcrypt.compare(password, user.password);

      // Or using spread operator
      let userWithoutPassword = user.toObject();
      delete userWithoutPassword.password;

      console.log(userWithoutPassword);

      res.status(200).json({
        error: false,
        user: userWithoutPassword,
      });
    } catch (error) {
      res.json({ message: "Error occured during registration" });
    }
  }
}
