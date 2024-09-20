const mongoose = require('mongoose');

let schema = new mongoose.Schema({
  productname: String, productdescription: String,
  productprice: Number, productcategory: String, productimage: String,
  productimage2: String, /*productimage3: String, productimage4: String, productimage5: String,*/
  addedBy: mongoose.Schema.Types.ObjectId,
  pLoc: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number]
    }
  }
})
schema.index({ pLoc: '2dsphere' });
const Products = mongoose.model('Products', schema);



module.exports.search = (req, res) => {
  let latitude = req.query.loc.split(',')[0];
  let longitude = req.query.loc.split(',')[1];
  let search = req.query.search;
  Products.find({
    $or: [
      { productname: { $regex: search, $options: 'i' } },
      { productdescription: { $regex: search, $options: 'i' } },
    ],
    pLoc: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [parseFloat(latitude), parseFloat(longitude)]
        },
        $maxDistance: 200000
      }
    }
  })
    .then((results) => {
      res.send({ message: "success", products: results })
    })
    .catch((err) => {
      res.send({ message: " servers error" })
    })
}

module.exports.getlikedProducts = (req, res) => {
  const userId = req.body.userId
  Products.find({ addedBy: userId })
    .then((result) => {
      res.send({ message: 'success', products: result })
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: " servers error" })
    })
}

module.exports.addProduct = (req, res) => {
  const productlatitude = req.body.productlatitude;
  const productlongitude = req.body.productlongitude;
  const productname = req.body.productname;
  const productdescription = req.body.productdescription;
  const productprice = req.body.productprice;
  const productcategory = req.body.productcategory;
  const productimage = req.files.productimage[0].filename;
  const productimage2 = req.files.productimage2[0].filename;
  const addedBy = req.body.userId;

  const product = new Products({
    productname, productdescription, productprice, productcategory, productimage, productimage2, addedBy,
    pLoc: { type: 'Point', coordinates: [productlatitude, productlongitude] }
  });
  product.save()
    .then(() => {
      res.send({ message: 'saved success...' })
    })
    .catch(() => {
      res.send({ message: 'server error' })
    })
}

module.exports.getProducts = (req, res) => {
  const catName = req.query.catName;
  Products.findOne({ productcategory: catName })
    .then((result) => {
      res.send({ message: "product found", products: result })
    })
    .catch((err) => {
      res.send({ message: " servers error" })
    })
}

module.exports.getProductsPid = (req, res) => {
  Products.findOne({ _id: req.params.pId })
    .populate('addedBy')
    .then((result) => {
      console.log(result, "user data")
      res.send({ message: "product found", product: result })
    })
    .catch((err) => {
      console.error(err);
      res.send({ message: " servers error" })
    })

}

module.exports.myProducts = (req, res) => {
  const userId = req.body.userId
  Products.find({ addedBy: userId })
    .then((result) => {
      res.send({ message: 'success', products: result })
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: " servers error" })
    })
}