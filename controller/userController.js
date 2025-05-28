const  User  = require('../module/User');
const asyncHandler = require('express-async-handler');
const cloudinary = require('../config/Cloud');
const Jwt = require('jsonwebtoken');
const uploadFromBuffer = require('../middelware/uploadImage');
module.exports.getAllUser = asyncHandler(async(req,res)=>{
    try{
        const user =await User.find().select('-password')
        if(!user)res.status(404).json({message:'user not found'})
            res.status(200).json(user)
    }catch(err){res.status(500).json(err)}
})
module.exports.getUser = asyncHandler(async(req,res)=>{
    try{
        const user =await User.findById(req.params.id).select('-password')
        if(!user)res.status(404).json({message:'user not found'})
            res.status(200).json(user)
    }catch(err){res.status(500).json(err)}
})
module.exports.updateUser = asyncHandler(async(req,res)=>{
    try{
        const user =await User.findById(req.params.id).select('-password')
        if(!user)res.status(404).json({message:'user not found'})
            const edit = await User.findByIdAndUpdate(req.params.id ,{
        isAdmin:req.body.isAdmin,
        name:req.body.name,
        address:req.body.address,
        phone:req.body.phone,
        isTrader:req.body.isTrader,
            },{new:true})
            res.status(200).json(edit)
    }catch(err){res.status(500).json(err)}
})
module.exports.deleteUser = asyncHandler(async(req,res)=>{
    try{
        const user =await User.findById(req.params.id).select('-password')
        if(!user)res.status(404).json({message:'user not found'})
          const deleteUser = await User.findByIdAndDelete(req.params.id)
            res.status(200).json({message:'user deleted'})
    }catch(err){res.status(500).json(err)}
})

module.exports.uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No image uploaded' });
  }

  const user = await User.findById(req.params.id).select('-password');
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

 

  try {
    // 1. ارفع الصورة
    const result = await uploadFromBuffer(req.file.buffer);

    // 2. احذف الصورة القديمة لو فيه
    if (user.image?.id) {
      await cloudinary.uploader.destroy(user.image.id);
    }

    // 3. حدّث بيانات المستخدم
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        image: {
          url: result.secure_url,
          id: result.public_id,
        },
      },
      { new: true }
    );

    res.status(201).json(updatedUser);
  } catch (err) {
    console.error('❌ Error uploading image:', err);
    res.status(500).json({ message: 'Upload failed', error: err });
  }
});
  module.exports.getUserByToken = asyncHandler(async(req, res)=>{
    try{
      const token = req.headers.authorization.split(' ')[1];
      const decoded = Jwt.verify(token ,process.env.JWT_SECRET || 'secret12345')
      const user = await User.findById(decoded.id).select('-password')
      if(!user)res.status(404).json({message:'user not found'})
        res.status(200).json(user)
    }catch(err){res.status(500).json(err)}
  })