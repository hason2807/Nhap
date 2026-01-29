import { Link } from "react-router";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";
import { useState } from "react";

const CartPage = () => {
  // Mock cart data
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Lập Trình Web Fullstack với React & Node.js",
      instructor: "Nguyễn Văn An",
      price: 1599000,
      originalPrice: 2999000,
      image: "react",
      category: "Lập Trình",
      lessons: 48,
      duration: "32 giờ",
      quantity: 1,
    },
    {
      id: 2,
      title: "Digital Marketing A-Z",
      instructor: "Trần Thị Bình",
      price: 1299000,
      originalPrice: 2499000,
      image: "marketing",
      category: "Marketing",
      lessons: 52,
      duration: "28 giờ",
      quantity: 1,
    },
    {
      id: 3,
      title: "UI/UX Design Masterclass với Figma",
      instructor: "Lê Hoàng Cường",
      price: 1199000,
      originalPrice: 1999000,
      image: "design",
      category: "Thiết Kế",
      lessons: 36,
      duration: "24 giờ",
      quantity: 1,
    },
  ]);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = cartItems.reduce((sum, item) => 
    sum + (item.originalPrice - item.price) * item.quantity, 0
  );
  const total = subtotal;

  const updateQuantity = (id: number, change: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mx-auto h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center mb-6">
              <ShoppingBag className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Giỏ hàng trống</h2>
            <p className="text-gray-600 mb-8">Chưa có khóa học nào trong giỏ hàng của bạn</p>
            <Link
              to="/courses"
              className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-8 py-3 text-lg font-semibold text-white hover:bg-emerald-700"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Khám phá khóa học
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Giỏ hàng của bạn</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">
                    {cartItems.length} khóa học trong giỏ hàng
                  </h2>
                  <button
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Xóa tất cả
                  </button>
                </div>
              </div>

              <div className="divide-y">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-4">
                    <div className="flex-shrink-0">
                      <div className="h-32 w-48 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                        <span className="text-2xl">
                          {item.image === "react" && "⚛️"}
                          {item.image === "marketing" && "📢"}
                          {item.image === "design" && "🎨"}
                        </span>
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                          <p className="text-gray-600 text-sm mb-2">{item.instructor}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>{item.lessons} bài học</span>
                            <span>•</span>
                            <span>{item.duration}</span>
                            <span>•</span>
                            <span className="bg-gray-100 px-2 py-1 rounded">{item.category}</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="font-bold text-lg text-emerald-600">
                            {(item.price * item.quantity).toLocaleString()}₫
                          </div>
                          {item.originalPrice > item.price && (
                            <div className="text-sm text-gray-400 line-through">
                              {(item.originalPrice * item.quantity).toLocaleString()}₫
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="h-8 w-8 rounded-full border flex items-center justify-center hover:bg-gray-100"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="h-8 w-8 rounded-full border flex items-center justify-center hover:bg-gray-100"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="flex items-center gap-2 text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span>Xóa</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/courses"
                className="inline-flex items-center text-emerald-600 hover:text-emerald-800 font-medium"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Tiếp tục mua sắm
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <h2 className="text-xl font-semibold mb-6">Tóm tắt đơn hàng</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tạm tính:</span>
                  <span className="font-medium">{subtotal.toLocaleString()}₫</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Giảm giá:</span>
                  <span className="text-emerald-600 font-medium">
                    -{discount.toLocaleString()}₫
                  </span>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Tổng cộng:</span>
                    <span className="text-emerald-600">{total.toLocaleString()}₫</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <Link
                  to="/checkout"
                  className="block w-full bg-emerald-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-emerald-700 transition"
                >
                  Thanh toán ngay
                </Link>

                <button className="w-full border border-emerald-600 text-emerald-600 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition">
                  Áp dụng mã giảm giá
                </button>
              </div>

              <div className="mt-8 pt-6 border-t">
                <h3 className="font-semibold mb-4">Chính sách mua hàng</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="text-emerald-600 mr-2">✓</span>
                    Truy cập trọn đời
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-600 mr-2">✓</span>
                    Hỗ trợ 24/7
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-600 mr-2">✓</span>
                    Chứng chỉ hoàn thành
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-600 mr-2">✓</span>
                    Hoàn tiền trong 30 ngày
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;