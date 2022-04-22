const express = require('express');

const ItemController = require('../controllers/item-controller');

// MIDDLEWARE
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
// END MIDDLEWARE

const router = express.Router();
router.get('/items', ItemController.getItems);
router.get('/item/:id', ItemController.getItemById);
router.post('/item', upload.single('file'), ItemController.createItem);
router.put('/item/:id', ItemController.updateItem);
router.delete('/item/:id', ItemController.deleteItem);

module.exports = router;
