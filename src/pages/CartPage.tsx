import { Link, useNavigate } from "react-router";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, CreditCard, Tag, Shield, Lock } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";

const CartPage = () => {
  const navigate = useNavigate();
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart,
    cartTotal 
  } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Kiểm tra đăng nhập khi component mount
  useEffect(() => {
    const checkLogin = () => {
      const currentUser = localStorage.getItem('currentUser');
      setIsLoggedIn(!!currentUser);
    };

    checkLogin();
    window.addEventListener('storage', checkLogin);
    return () => window.removeEventListener('storage', checkLogin);
  }, []);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalDiscount = cartItems.reduce((sum, item) => 
    sum + (item.originalPrice - item.price) * item.quantity, 0
  );
  
  const couponDiscount = couponApplied ? 200000 : 0;
  const total = cartTotal - couponDiscount;

  const handleUpdateQuantity = (id: number, change: number) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
      const newQuantity = Math.max(1, item.quantity + change);
      updateQuantity(id, newQuantity);
    }
  };

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      setCouponError("Vui lòng nhập mã giảm giá");
      return;
    }

    const validCoupons = ["EDU2024", "SAVE20", "WELCOME10", "STUDENT50"];
    
    if (validCoupons.includes(couponCode.toUpperCase())) {
      setCouponApplied(true);
      setCouponError("");
    } else {
      setCouponApplied(false);
      setCouponError("Mã giảm giá không hợp lệ hoặc đã hết hạn");
    }
  };

  const handleRemoveCoupon = () => {
    setCouponCode("");
    setCouponApplied(false);
    setCouponError("");
  };

  const handleCheckout = () => {
    if (!isLoggedIn) {
      const shouldLogin = window.confirm(
        "Bạn cần đăng nhập để thanh toán.\n\nBạn có muốn đăng nhập ngay bây giờ?"
      );
      
      if (shouldLogin) {
        navigate("/login?redirect=/cart");
      }
      return;
    }

    if (cartItems.length === 0) {
      alert("Giỏ hàng của bạn đang trống!");
      return;
    }

    navigate("/checkout");
  };

  // Nếu chưa đăng nhập
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mx-auto h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center mb-6">
              <Lock className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Vui lòng đăng nhập</h2>
            <p className="text-gray-600 mb-8">
              Bạn cần đăng nhập để xem giỏ hàng và thanh toán
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login?redirect=/cart"
                className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-8 py-3 text-lg font-semibold text-white hover:bg-emerald-700 transition-colors"
              >
                Đăng nhập ngay
              </Link>
              <Link
                to="/courses"
                className="inline-flex items-center justify-center rounded-lg border border-emerald-600 px-8 py-3 text-lg font-semibold text-emerald-600 hover:bg-emerald-50 transition-colors"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Khám phá khóa học
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/courses"
                className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-8 py-3 text-lg font-semibold text-white hover:bg-emerald-700 transition-colors"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Khám phá khóa học
              </Link>
              <Link
                to="/my-courses"
                className="inline-flex items-center justify-center rounded-lg border border-gray-600 px-8 py-3 text-lg font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Xem khóa học đã mua
              </Link>
            </div>
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
                    className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
                  >
                    Xóa tất cả
                  </button>
                </div>
              </div>

              <div className="divide-y">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-4 hover:bg-gray-50 transition-colors">
                    {/* Course Image */}
                    <div className="flex-shrink-0">
                      <div className="h-32 w-48 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                        <span className="text-2xl">
                          {item.image === "react" && "⚛️"}
                          {item.image === "marketing" && "📢"}
                          {item.image === "design" && "🎨"}
                          {item.image === "data" && "📊"}
                          {item.image === "english" && "🇺🇸"}
                          {!["react", "marketing", "design", "data", "english"].includes(item.image) && "📚"}
                        </span>
                      </div>
                    </div>

                    {/* Course Details */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1 hover:text-emerald-600 transition-colors">
                            <Link to={`/courses/${item.id}`}>
                              {item.title}
                            </Link>
                          </h3>
                          <p className="text-gray-600 text-sm mb-2">{item.instructor}</p>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                            <span>{item.lessons} bài học</span>
                            <span className="hidden sm:inline">•</span>
                            <span>{item.duration}</span>
                            <span className="hidden sm:inline">•</span>
                            <span className="bg-gray-100 px-2 py-1 rounded">{item.category}</span>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="mt-4 sm:mt-0 text-right">
                          <div className="font-bold text-lg text-emerald-600">
                            {(item.price * item.quantity).toLocaleString()}₫
                          </div>
                          {item.originalPrice > item.price && (
                            <div className="text-sm text-gray-400 line-through">
                              {(item.originalPrice * item.quantity).toLocaleString()}₫
                            </div>
                          )}
                          <div className="text-xs text-emerald-600 mt-1">
                            Tiết kiệm: {((item.originalPrice - item.price) * item.quantity).toLocaleString()}₫
                          </div>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="mt-6 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleUpdateQuantity(item.id, -1)}
                            className="h-8 w-8 rounded-full border flex items-center justify-center hover:bg-gray-100 transition-colors"
                            aria-label="Giảm số lượng"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => handleUpdateQuantity(item.id, 1)}
                            className="h-8 w-8 rounded-full border flex items-center justify-center hover:bg-gray-100 transition-colors"
                            aria-label="Tăng số lượng"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="flex items-center gap-2 text-red-600 hover:text-red-800 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="text-sm">Xóa</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Continue Shopping */}
            <div className="mt-6">
              <Link
                to="/courses"
                className="inline-flex items-center text-emerald-600 hover:text-emerald-800 font-medium transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Tiếp tục mua sắm
              </Link>
            </div>

            {/* Security Note */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-800">Mua sắm an toàn</p>
                  <p className="text-sm text-blue-700">
                    Thông tin của bạn được bảo mật và mã hóa. Chúng tôi cam kết hoàn tiền 100% nếu bạn không hài lòng với khóa học.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <h2 className="text-xl font-semibold mb-6">Tóm tắt đơn hàng</h2>

              {/* Coupon Section */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium">Mã giảm giá</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => {
                      setCouponCode(e.target.value);
                      if (couponError) setCouponError("");
                    }}
                    placeholder="Nhập mã giảm giá"
                    disabled={couponApplied}
                    className={`flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none ${
                      couponApplied ? "bg-emerald-50 border-emerald-200" : ""
                    }`}
                  />
                  {couponApplied ? (
                    <button
                      type="button"
                      onClick={handleRemoveCoupon}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Hủy
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
                    >
                      Áp dụng
                    </button>
                  )}
                </div>
                {couponError && (
                  <p className="mt-2 text-sm text-red-600">{couponError}</p>
                )}
                {couponApplied && (
                  <p className="mt-2 text-sm text-emerald-600">
                    ✓ Đã áp dụng mã giảm giá thành công!
                  </p>
                )}
                <p className="mt-2 text-xs text-gray-500">
                  Mã giảm giá có sẵn: EDU2024, SAVE20, WELCOME10, STUDENT50
                </p>
              </div>

              {/* Order Details */}
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tạm tính:</span>
                  <span className="font-medium">{subtotal.toLocaleString()}₫</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Giảm giá khóa học:</span>
                  <span className="text-emerald-600 font-medium">
                    -{totalDiscount.toLocaleString()}₫
                  </span>
                </div>

                {couponApplied && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Giảm giá coupon:</span>
                    <span className="text-rose-600 font-medium">
                      -{couponDiscount.toLocaleString()}₫
                    </span>
                  </div>
                )}

                <div className="pt-4 border-t">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Tổng cộng:</span>
                    <span className="text-emerald-600">{total.toLocaleString()}₫</span>
                  </div>
                  {couponApplied && (
                    <div className="mt-2 text-sm text-emerald-600">
                      Bạn đã tiết kiệm được {(totalDiscount + couponDiscount).toLocaleString()}₫
                    </div>
                  )}
                </div>
              </div>

              {/* Checkout Button */}
              <div className="mt-8">
                <button
                  onClick={handleCheckout}
                  className="flex items-center justify-center gap-2 w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                >
                  <CreditCard className="h-5 w-5" />
                  Thanh toán ngay
                </button>
              </div>

              {/* Payment Methods */}
              <div className="mt-8 pt-6 border-t">
                <h3 className="font-semibold mb-4">Phương thức thanh toán</h3>
                <div className="grid grid-cols-4 gap-2">
                  <div className="h-10 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-sm">💳</span>
                  </div>
                  <div className="h-10 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-sm">🏦</span>
                  </div>
                  <div className="h-10 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-sm">📱</span>
                  </div>
                  <div className="h-10 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-sm">💰</span>
                  </div>
                </div>
              </div>

              {/* Policies */}
              <div className="mt-8 pt-6 border-t">
                <h3 className="font-semibold mb-4">Chính sách mua hàng</h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="text-emerald-600 mr-2">✓</span>
                    <span>Truy cập trọn đời tất cả khóa học</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-600 mr-2">✓</span>
                    <span>Hỗ trợ 24/7 từ giảng viên</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-600 mr-2">✓</span>
                    <span>Chứng chỉ hoàn thành có giá trị</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-600 mr-2">✓</span>
                    <span>Hoàn tiền trong 30 ngày nếu không hài lòng</span>
                  </li>
                </ul>
              </div>

              {/* Support */}
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium mb-2">Cần hỗ trợ?</p>
                <p className="text-sm text-gray-600">
                  📞 Gọi ngay: <span className="font-semibold">1900 1234</span>
                </p>
                <p className="text-sm text-gray-600">
                  ✉️ Email: <span className="font-semibold">support@educourse.vn</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;