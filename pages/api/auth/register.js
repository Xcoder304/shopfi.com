import nc from "next-connect";
import db from "../../../utils/db";
import User from "../../../modals/User";
var bcrypt = require("bcryptjs");

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const user = await new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    name: req.body.name,
    email: req.body.email,
    phonenumber: req.body.phonenumber,
    profileImg: req.body.profileImg,
    password: bcrypt.hashSync(req.body.password),
    isAdmin: req.body.isAdmin,
    MainAdmin: req.body.MainAdmin,
  });
  user.save();

  res.send({ success: true, message: "user added" });
});

export default handler;
