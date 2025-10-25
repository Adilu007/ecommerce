import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems, removeFromCart } from "../features/cart/cartSlice";
import { X, Trash2 } from "lucide-react";

const CartSidebar = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { cartItems, totalItems, isLoading } = useSelector((state) => state.cart);

  useEffect(() => {
    if (isOpen) {
      dispatch(getCartItems());
    }
  }, [isOpen, dispatch]);

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Transparent Overlay for clicking to close */}
      <div 
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-80 bg-white z-50 shadow-lg transform transition-transform duration-300">
        {/* Header */}
        <div className="bg-[#003f62] text-white p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-[#003f62] font-semibold text-sm">{totalItems || 0}</span>
            </div>
            <span className="font-medium">Items</span>
          </div>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <X size={20} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="p-4 h-full overflow-y-auto">
          {isLoading ? (
            <div className="text-center py-8">Loading...</div>
          ) : cartItems && cartItems.length > 0 ? (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item._id} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex gap-3">
                    {/* Product Image */}
                    <img
                      src={
                        item.product.images?.[0]
                          ? `http://localhost:3000/${item.product.images[0]}`
                          : "/placeholder.png"
                      }
                      alt={item.product.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    
                    {/* Product Details */}
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-gray-800">
                        {item.product.title}
                      </h4>
                      <div className="text-lg font-semibold text-[#003f62] mt-1">
                        ${item.product.price || "0.00"}
                      </div>
                      
                      {/* Star Rating */}
                      <div className="flex items-center mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star} className="text-gray-300 text-xs">★</span>
                        ))}
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemoveItem(item.product._id)}
                      className="text-gray-400 hover:text-red-500 p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>Your cart is empty</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;