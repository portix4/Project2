const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')

cloudinary.config({
    cloud_name: 'dxq4bssju',
    api_key: '737531241113298',
    api_secret: 'bWIMcQ6EAVHDP9hQ9UoIpzB7ecc'
});

const storage = new CloudinaryStorage({ cloudinary })

module.exports = multer({ storage })
