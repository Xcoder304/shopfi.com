import nc from "next-connect";
import db from "../../../../utils/db";
import Categories from "../../../../modals/Categories";

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const check = await Categories.findOne({ name: req.body.name });

  if (check) {
    res.send({
      success: false,
      message: `${req.body.name} Category Already exite Try Different Names`,
    });
  } else {
    const categorie = await new Categories(req.body);
    categorie.save();
    res.send({ success: true, message: "new categorie Created" });
  }

  await db.disconnect();
});

export default handler;
