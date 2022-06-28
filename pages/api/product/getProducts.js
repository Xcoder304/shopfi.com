import nc from "next-connect";
import db from "../../../utils/db";
import Product from "../../../modals/Product";

const handler = nc();

handler.get(async (req, res) => {
  db.connect();
  let query = [];
  console.log(req.query);

  // search
  if (req.query.keyword && req.query.keyword !== "") {
    query.push({
      $match: {
        $or: [
          {
            name: { $regex: req.query.keyword },
          },
        ],
      },
    });
  }
  // category
  if (req.query.category) {
    query.push({
      $match: {
        category: req.query.category,
      },
    });
  }

  if (!req.query.category && !req.query.keyword) {
    query.push({
      $match: {},
    });
  }

  // console.log(req.query);
  // let query = {};
  // if (req.query.category) {
  //   query.category = req.query.category;
  // }
  // if (req.query.keyword) {
  //   query.$or = [{ name: { $regex: req.query.keyword } }];
  // }

  // const product = await Product.find(query);
  let product = req.query
    ? await Product.aggregate(query)
    : await Product.find({});
  db.disconnect();

  res.send(product);
});

export default handler;
