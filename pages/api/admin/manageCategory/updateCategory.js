import nc from "next-connect";
import db from "../../../../utils/db";
import Categories from "../../../../modals/Categories";

const handler = nc();

handler.post(async (req, res) => {
  console.log(req.body);

  await db.connect();
  const check = await Categories.findOne({ name: req.body.name });
  if (check) {
    res.send({
      success: false,
      message: `${req.body.name} Category Already exite Try Different Names`,
    });
  } else {
    const update = await Categories.findOneAndUpdate(
      { _id: req.body.id },
      { name: req.body.name }
    );
    res.send({ success: true, message: "Category Updated Successfully" });
  }

  await db.disconnect();
});

export default handler;
