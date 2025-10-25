import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails } from "../features/products/productSlice";
import { addToCart, getCartItems } from "../features/cart/cartSlice";
import { useNavigate, useParams } from "react-router-dom";
import { Heart } from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { productDetails, isLoading, isError, message } = useSelector((state) => state.product);
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate()
  
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (id) dispatch(fetchProductDetails(id));
    dispatch(getCartItems()); // Load cart items to check if product is already in cart
  }, [dispatch, id]);

  // Update selectedVariant when productDetails changes to ensure valid index
  useEffect(() => {
    if (productDetails?.variants?.length > 0 && selectedVariant >= productDetails.variants.length) {
      setSelectedVariant(0);
    }
  }, [productDetails, selectedVariant]);

  const handleQuantityChange = (change) => {
    if (!productDetails?.variants?.[selectedVariant]) return;
    
    const newQuantity = quantity + change;
    const maxQuantity = productDetails.variants[selectedVariant].quantity;
    if (newQuantity >= 1 && newQuantity <= maxQuantity) {
      setQuantity(newQuantity);
    }
  };

  // Check if product is already in cart
  const isInCart = cartItems.some(item => item.product._id === id);

  // Handle add to cart
  const handleAddToCart = () => {
    dispatch(addToCart(id));
  };

  // Loading states and error handling
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">{message}</p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!productDetails) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg">No product found.</p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Safety check for variants
  if (!productDetails.variants || productDetails.variants.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">Product has no variants available.</p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const selectedVariantData = productDetails.variants[selectedVariant] || productDetails.variants[0];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
        
      <div className="max-w-4xl mx-auto mb-4">
        <span className="text-gray-600">Home</span>
        <span className="text-gray-600 mx-2">&gt;</span>
        <span className="text-gray-600">Product details</span>
      </div>

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <div className="bg-gray-200 rounded-lg h-80 flex items-center justify-center mb-4">
              {productDetails.images && productDetails.images.length > 0 ? (
                <img
                  src={`http://localhost:3000/${productDetails.images[selectedImage]}`}
                  alt={productDetails.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <span className="text-gray-500">No image available</span>
              )}
            </div>
            
            {productDetails.images && productDetails.images.length > 1 && (
              <div className="flex gap-2">
                {productDetails.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-16 h-16 border-2 rounded-lg overflow-hidden ${
                      selectedImage === index ? 'border-blue-500' : 'border-gray-300'
                    }`}
                  >
                    <img
                      src={`http://localhost:3000/${img}`}
                      alt={`${productDetails.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-2">{productDetails.title || 'Product Title'}</h2>
            <p className="text-2xl font-bold text-gray-900 mb-4">
              ${selectedVariantData?.price || '0.00'}
            </p>
            <div className="mb-6">
              <p className="text-green-600 font-medium mb-1">
                Availability: <span className="text-green-600">✓ In stock</span>
              </p>
              <p className="text-orange-500 text-sm">
                Hurry up! only {selectedVariantData?.quantity || 0} product left in stock!
              </p>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <span className="text-gray-700 font-medium w-20">RAM:</span>
                  <div className="flex space-x-2">
                    {productDetails.variants?.map((variant, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedVariant(idx);
                          setQuantity(1);
                        }}
                        className={`px-4 py-2 border rounded-lg ${
                          selectedVariant === idx
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-300 text-gray-700 hover:border-gray-400"
                        }`}
                      >
                        {variant?.ram || `Variant ${idx + 1}`}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center mb-6">
                  <span className="text-gray-700 font-medium w-20">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg w-32">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="flex-1 py-2 text-gray-600 hover:bg-gray-100 rounded-l-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="flex-1 text-center py-2">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="flex-1 py-2 text-gray-600 hover:bg-gray-100 rounded-r-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={quantity >= (selectedVariantData?.quantity || 0)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => navigate(`/edit-product/${id}`)}>
                  Edit product
                </button>
                <button className="px-6 py-3 bg-[#FFBA00] hover:bg-[#FF6C00] text-white rounded-lg transition-colors font-medium">
                  Buy it now
                </button>
                <button 
                  onClick={handleAddToCart}
                  className={`px-4 py-3 border rounded-lg transition-colors flex items-center justify-center ${
                    isInCart 
                      ? 'border-red-500 bg-red-50 text-red-600 hover:bg-red-100' 
                      : 'border-gray-300 text-gray-700 hover:border-red-500 hover:text-red-600 hover:bg-red-50'
                  }`}
                  title={isInCart ? "In Cart" : "Add to Cart"}
                >
                  <Heart 
                    size={20} 
                    className={isInCart ? 'fill-current' : ''} 
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;