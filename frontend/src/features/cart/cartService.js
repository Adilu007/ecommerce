import axiosInstance from "../../api/axiosInstance";

const addToCart = async (productId) => {
  try {
    console.log("Cart Service - Adding product:", productId);
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("Cart Service - User found:", !!user);
    
    if (!user?.token) {
      throw new Error("No token found. Please login again.");
    }
    const token = user.token;

    console.log("Cart Service - Making API call to /auth/addToCart");
    const response = await axiosInstance.post(
      "/auth/addToCart",
      { productId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Cart Service - API response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Add to cart error:", error);
    console.error("Error response:", error.response?.data);
    throw error;
  }
};

const getCartItems = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.token) {
      throw new Error("No token found. Please login again.");
    }
    const token = user.token;

    const response = await axiosInstance.get("/auth/getCart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Get cart items error:", error);
    throw error;
  }
};

const removeFromCart = async (productId) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.token) {
      throw new Error("No token found. Please login again.");
    }
    const token = user.token;

    const response = await axiosInstance.delete(
      `/auth/removeFromCart/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Remove from cart error:", error);
    throw error;
  }
};

const cartService = {
  addToCart,
  getCartItems,
  removeFromCart,
};

export default cartService;