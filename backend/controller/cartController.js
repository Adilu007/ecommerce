import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Find user's cart or create new one
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );

    if (existingItemIndex > -1) {
      // Item already exists, just return current cart
      await cart.populate('items.product');
      return res.json({
        message: 'Item already in cart',
        cartItems: cart.items,
        totalItems: cart.items.length
      });
    } else {
      // Add new item to cart
      cart.items.push({ product: productId });
    }

    await cart.save();
    await cart.populate('items.product');

    res.json({
      message: 'Item added to cart successfully',
      cartItems: cart.items,
      totalItems: cart.items.length
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get cart items
const getCartItems = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    
    if (!cart) {
      return res.json({ cartItems: [], totalItems: 0 });
    }

    res.json({
      cartItems: cart.items,
      totalItems: cart.items.length
    });
  } catch (error) {
    console.error('Get cart items error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Remove item from cart
    cart.items = cart.items.filter(
      item => item.product.toString() !== productId
    );

    await cart.save();
    await cart.populate('items.product');

    res.json({
      message: 'Item removed from cart',
      cartItems: cart.items,
      totalItems: cart.items.length
    });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Clear cart
const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    await Cart.findOneAndUpdate(
      { user: userId },
      { items: [] },
      { new: true }
    );

    res.json({
      message: 'Cart cleared',
      cartItems: [],
      totalItems: 0
    });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export {
  addToCart,
  getCartItems,
  removeFromCart,
  clearCart
};