const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

const Users = mongoose.model('Users', {
  username: String,
  password: String,
  mobile: String,
  gsuiteid: String,
  likedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }]
});


module.exports.likedProducts = (req, res) => {
  let productId = req.body.productId;
  let userId = req.body.userId;
  Users.updateOne({ _id: userId }, { $addToSet: { likedProducts: productId } })
    .then(() => {
      res.send({ message: 'liked success...' })
    })
    .catch(() => {
      res.send({ message: 'server error' })
    })
}

module.exports.dislikedProducts = (req, res) => {
  let productId = req.body.productId;
  let userId = req.body.userId;
  Users.updateOne({ _id: userId }, { $pull: { likedProducts: productId } })
    .then(() => {
      res.send({ message: 'Disliked success...' })
    })
    .catch(() => {
      res.send({ message: 'server error' })
    })
}

module.exports.signUp = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const gsuiteid = req.body.gsuiteid;
  const mobile = req.body.mobile;
  const user = new Users({ username: username, password: password, gsuiteid, mobile });
  user.save()
    .then(() => {
      res.send({ message: 'saved success.' })
    })
    .catch(() => {
      res.send({ message: 'server err' })
    })
}


module.exports.myProfileuid = (req, res) => {
  let uid = req.params.userId
  Users.findOne({ _id: uid })
    .then((result) => {
      res.send({ message: "success", user: { gsuiteid: result.gsuiteid, mobile: result.mobile, username: result.username } })
    })
    .catch((err) => {
      res.send({ message: " servers error" })
    })
  return;
}

module.exports.getUseruid = (req, res) => {
  const _userId = req.params.uId;
  Users.findOne({ _id: _userId })
    .then((result) => {
      res.send({ message: "success", user: { gsuiteid: result.gsuiteid, mobile: result.mobile, username: result.username } })
    })
    .catch((err) => {
      res.send({ message: " servers error" })
    })
}

module.exports.login = (req, res) => {
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
          res.send({ message: 'user found', token: token, userId: result._id, username: result.username })
        } else {
          res.send({ message: "password not match" })
        }

      }
    })
    .catch(() => {
      res.send({ message: 'server error' })
    })
}

module.exports.getlikedProducts = (req, res) => {    //Remember
  Users.findOne({ _id: req.body.userId }).populate('likedProducts')
    .then((result) => {
      res.send({ message: 'success', products: result.likedProducts })
    })
    .catch((err) => {
      res.send({ message: 'server err' })
    })
}