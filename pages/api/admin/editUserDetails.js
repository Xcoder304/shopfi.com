import nc from "next-connect";
import db from "../../../utils/db";
import User from "../../../modals/User";
import bcrypt from "bcryptjs";
const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const user = await User.findOneAndUpdate(
    { _id: req.body.id },
    {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      name: req.body.name,
      email: req.body.email,
      phonenumber: req.body.phonenumber,
      address: req.body.address,
      isAdmin: req.body.isAdmin,
    }
  );

  // updating user password
  if (req.body.password) {
    const passUser = await User.findOne({ _id: req.body.id });
    if (bcrypt.compareSync(req.body.password, passUser.password)) {
      await User.findOneAndUpdate(
        { _id: req.body.id },
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

  // updating user Profile img
  res.send({
    success: true,
    user: user,
    message: "Details are Updated 😎",
  });

  s;
});

export default handler;
