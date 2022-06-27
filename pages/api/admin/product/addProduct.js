import nc from "next-connect";
import db from "../../../../utils/db";
import Product from "../../../../modals/Product";

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const check = await Product.findOne({ _id: req.body.id });

  if (check) {
    res.send({ success: false, message: "This Product already Exites" });
  } else {
    const upload = await new Product(req.body);
    upload.save();
    res.send({ success: true, message: "New Product Created Successfully" });
  }

  await db.disconnect();
});

export default handler;
