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
    const upload = await new Product({
      ...req.body,
      name: req.body.name.toLowerCase(),
    });
    upload.save();
    res.send({ success: true, message: "New Product Created Successfully" });
  }
});

export default handler;
