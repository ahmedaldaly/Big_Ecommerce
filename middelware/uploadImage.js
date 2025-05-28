const cloudinary = require('../config/Cloud');
const streamifier = require('streamifier');
const uploadFromBuffer = (buffer) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'users' }, // أو عدل حسب ما تحب
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      streamifier.createReadStream(buffer).pipe(stream);
    });
  };
  module.exports = uploadFromBuffer