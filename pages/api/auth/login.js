import nc from "next-connect";
import db from "../../../utils/db";
import User from "../../../modals/User";
var jwt = require("jsonwebtoken");
import bcrypt from "bcryptjs";

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const user = await User.findOne({ email: req.body.email });

  if (user) {
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      let token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          isAdmin: user.isAdmin,
          profileImg: user.profileImg,
        },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
      );

      res.send({
        success: true,
        message: "login successfully completed",
        token: token,
      });
    } else {
      res.send({
        success: false,
        message: "wrong email or password please try again",
      });
    }
  } else {
    res.send({
      success: false,
      message: "Account not found please create an account",
    });
  }

  await db.disconnect();
});

export default handler;
