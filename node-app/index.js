const express = require('express')
const cors = require('cors')
const path = require('path')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})
const upload = multer({ storage: storage })
const bodyParser = require('body-parser')
const app = express()
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
const port = 4000
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://moodyadi30:V6uoXxKO7k2tKHSO@cluster0.sn4hv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

const Users = mongoose.model('Users', {
  username: String,
  password: String,
  mobile: String,
  gsuiteid: String,
  likedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }]
});
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


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/search', (req, res) => {
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
      console.error("Error occurred:", err); // Log the error details
      res.send({ message: " servers error" })
    })
})
app.post('/liked-products', (req, res) => {
  let productId = req.body.productId;
  let userId = req.body.userId;
  Users.updateOne({ _id: userId }, { $addToSet: { likedProducts: productId } })
    .then(() => {
      res.send({ message: 'liked success...' })
    })
    .catch(() => {
      res.send({ message: 'server error' })
    })
})

app.post('/add-product', upload.fields([{ name: 'productimage' }, { name: 'productimage2' }]), (req, res) => {
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
})

app.get('/get-products', (req, res) => {
  const catName = req.query.catName;
  Products.find()
    .then((result) => {
      console.log(result)
      res.send({ message: "product found", products: result })
    })
    .catch((err) => {
      res.send({ message: " servers error" })
    })
})

app.post('/get-liked-products', (req, res) => {
  Users.findOne({ _id: req.body.userId }).populate('likedProducts')
    .then((result) => {
      res.send({ message: 'success', products: result.likedProducts })
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: " servers error" })
    })
})
app.post('/my-products', (req, res) => {
  const userId = req.body.userId
  Products.find({ addedBy: userId })
    .then((result) => {
      res.send({ message: 'success', products: result })
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: " servers error" })
    })
})

app.get('/get-product/:pId', (req, res) => {
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

})

app.get('/my-profile/:userId', (req, res) => {
  let uid = req.params.userId
  Users.findOne({ _id: uid })
    .then((result) => {
      res.send({ message: "success", user: { gsuiteid: result.gsuiteid, mobile: result.mobile, username: result.username } })
    })
    .catch((err) => {
      console.error(err);
      res.send({ message: " servers error" })
    })

})
app.get('/get-user/:uId', (req, res) => {
  const _userId = req.params.uId;
  Users.findOne({ _id: _userId })
    .then((result) => {
      res.send({ message: "success", user: { gsuiteid: result.gsuiteid, mobile: result.mobile, username: result.username } })
    })
    .catch((err) => {
      console.error(err);
      res.send({ message: " servers error" })
    })
})

app.post('/signup', (req, res) => {
  const username = req.body.username;
  const gsuiteid = req.body.gsuiteid;
  const password = req.body.password;
  const mobile = req.body.mobile;
  const user = new Users({ username: username, gsuiteid: gsuiteid, password: password, mobile: mobile });
  user.save()
    .then(() => {
      res.send({ message: 'saved success...' })
    })
    .catch(() => {
      res.send({ message: 'server error' })
    })
})

app.post('/login', (req, res) => {
  const username = req.body.username;
  const gsuiteid = req.body.gsuiteid;
  const password = req.body.password;
  Users.findOne({ username: username })
    .then((result) => {
      console.log(result, "user data")
      if (!result) {
        res.send({ message: "user not found" })
      } else {
        if (result.password == password) {
          const token = jwt.sign({
            data: result
          }, 'MY_KEY', { expiresIn: 60 * 60 });
          res.send({ message: 'user found', token: token, userId: result._id })
        } else {
          res.send({ message: "password not match" })
        }

      }
    })
    .catch(() => {
      res.send({ message: 'server error' })
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})