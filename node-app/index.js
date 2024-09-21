const express = require('express')
const cors = require('cors')
const path = require('path')
var jwt = require('jsonwebtoken');
const multer = require('multer');
const http = require('http');
const { Server } = require('socket.io');
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
const httpServer = http.createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: '*'
  }
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
const port = 4000
const mongoose = require('mongoose');
const productController = require('./controllers/productController')
const userController = require('./controllers/userController')
mongoose.connect('mongodb+srv://moodyadi30:V6uoXxKO7k2tKHSO@cluster0.sn4hv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');



// app.use(express.urlencoded({ extended: true }));
// app.use(express.json()); Remember

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/search', productController.search)
app.post('/liked-products', userController.likedProducts)
app.post('/disliked-products', userController.dislikedProducts)
app.post('/add-product', upload.fields([{ name: 'productimage' }, { name: 'productimage2' }]), productController.addProduct)
app.post('/edit-product', upload.fields([{ name: 'productimage' }, { name: 'productimage2' }]), productController.editProduct)
app.get('/get-products', productController.getProducts)
app.post('/delete-product', productController.deleteProduct)
app.post('/get-liked-products', userController.getlikedProducts)
app.post('/my-products', productController.myProducts)
app.get('/get-product/:pId', productController.getProductsPid)
app.get('/my-profile/:userId', userController.myProfileuid)
app.get('/get-user/:uId', userController.getUseruid)
app.post('/signup', userController.signUp)
app.post('/login', userController.login)
let messages = [];
io.on('connection', (socket) => {
  socket.on('sendMsg', (data) => {
    messages.push(data)
    io.emit('getMsg',messages)
  })
  io.emit('getMsg',messages)
})
httpServer.listen(port, () => {
  console.log(`Example http server listening on port ${port}`)
})