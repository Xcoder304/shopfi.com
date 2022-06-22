import nc from "next-connect";
import db from "../../../utils/db";
import User from "../../../modals/User";
var jwt = require("jsonwebtoken");
import bcrypt from "bcryptjs";

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const token = req.body.token;
  const tokenRes = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findOneAndUpdate(
    { email: tokenRes.email },
    {
      name: req.body.name,
      email: req.body.email,
      phonenumber: req.body.phonenumber,
      address: req.body.address,
    }
  );

  if (req.body.password) {
    const passUser = await User.findOne({ email: tokenRes.email });
    if (bcrypt.compareSync(req.body.password, passUser.password)) {
      const updatePass = await User.findOneAndUpdate(
        { email: tokenRes.email },
        {
          password: bcrypt.hashSync(req.body.newPasswod),
        }
      );

      res.send({
        success: true,
        message: "Password and Other Details Updated 😉",
      });
    } else {
      res.send({
        success: false,
        message: "Password did not match",
      });
    }
  }

  res.send({
    success: true,
    user: user,
    message: "Details are Updated 😎",
  });

  await db.disconnect();
  s;
});

export default handler;
