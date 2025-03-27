import express from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';

const router = express.Router();

// Tạo sản phẩm mới
router.post('/', createProduct);

// Lấy tất cả sản phẩm
router.get('/', getAllProducts);

// Lấy thông tin sản phẩm theo ID
router.get('/:id', getProductById);

// Cập nhật sản phẩm theo ID
router.put('/:id', updateProduct);

// Xóa sản phẩm theo ID
router.delete('/:id', deleteProduct);

export default router;
