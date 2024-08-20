import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  // await isAdminRequest(req,res)

  if (method === "GET") {
    // console.log("get api hitt");

    if (req.query?.id) {
      res.json(await Product.findOne({ _id: req.query?.id }));
    }

    // console.log("req", req.body);
    // const { _id } = req.body;

    // console.log("check", id);

    // const productDoc = await Product.findOne({ _id });
    // console.log("nowww", productDoc);
  }

  if (method === "POST") {
    const {
      title,
      description,
      price,
      category,
      properties,
      url,
      _id,
      review,
    } = req.body;
    // console.log('from server',reviews)
    //   const updateProductDoc= await Product.updateOne({_id},{title,description,price,category,url,properties,reviews})
    const product = await Product.findById({ _id });
    product.reviews.push(review);
    await product.save();
    // console.log("pls", product);
    res.json({ product }, { status: 200 });
  }
}
