
const userRout = require('express').Router();
const {getAllUser,getUser,updateUser,deleteUser ,uploadImage,getUserByToken} = require('../controller/userController')
const {auth,authAndTrader,authAndAdmin,adminAndUser} = require('../middelware/authrazition')
const multer = require('multer')
const storage = multer.memoryStorage();
const upload = multer ({storage})
userRout.route('/').get(authAndAdmin,getAllUser)
userRout.route('/token').get(auth,getUserByToken)
userRout.route('/:id').get(getUser).put(adminAndUser,updateUser).delete(adminAndUser,deleteUser)
userRout.route('/image/:id').put(adminAndUser,upload.single('image'),uploadImage)
module.exports =userRout