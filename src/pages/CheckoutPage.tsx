import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { CreditCard, Wallet, Banknote, Lock, ShieldCheck, ArrowLeft, CheckCircle, User, Phone, Mail, AlertCircle } from "lucide-react";
import { useCartStore } from "../stores/cartStore";
import { useAuthStore } from "../stores/authStore";
import { usePurchaseStore } from "../stores/purchaseStore";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart, removeFromCart } = useCartStore();
  const { user, isLoggedIn } = useAuthStore();
  const { addMultiplePurchases, checkPurchased } = usePurchaseStore();
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    paymentMethod: "momo",
  });

  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [alreadyPurchasedCourses, setAlreadyPurchasedCourses] = useState<number[]>([]);

  // Kiểm tra đăng nhập và khóa học đã mua
  useEffect(() => {
    if (!isLoggedIn || !user) {
      navigate("/login?redirect=/checkout");
      return;
    }
    
    // Auto-fill form với thông tin user
    setFormData(prev => ({
      ...prev,
      fullName: user.fullName || "",
      email: user.email || "",
      phone: user.phone || ""
    }));

    // Kiểm tra khóa học đã mua
    const userId = user.id || user.email;
    const purchased = cartItems
      .filter(item => checkPurchased(userId, item.id))
      .map(item => item.id);
    
    setAlreadyPurchasedCourses(purchased);
  }, [isLoggedIn, user, cartItems, navigate, checkPurchased]);

  // Tính tổng số khóa học chưa mua
  const newCourses = cartItems.filter(item => !alreadyPurchasedCourses.includes(item.id));
  const alreadyOwnedCourses = cartItems.filter(item => alreadyPurchasedCourses.includes(item.id));

  // Calculate totals chỉ tính khóa học mới
  const subtotal = newCourses.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const couponDiscount = couponApplied ? 200000 : 0;
  const total = subtotal - couponDiscount;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    }

    if (!isLoggedIn || !user) {
      alert("Vui lòng đăng nhập để thanh toán!");
      navigate("/login?redirect=/checkout");
      return;
    }

    // Kiểm tra nếu tất cả khóa học đều đã mua
    if (newCourses.length === 0) {
      const shouldProceed = window.confirm(
        "Tất cả khóa học trong giỏ hàng đều đã được mua trước đó.\n\nBạn có muốn xóa chúng khỏi giỏ hàng không?"
      );
      
      if (shouldProceed) {
        alreadyOwnedCourses.forEach(item => {
          removeFromCart(item.id);
        });
        navigate("/my-courses");
      }
      return;
    }

    // Hiển thị cảnh báo nếu có khóa học đã mua
    if (alreadyOwnedCourses.length > 0) {
      const courseNames = alreadyOwnedCourses.map(item => item.title).join("\n• ");
      const shouldContinue = window.confirm(
        `Một số khóa học đã có trong thư viện của bạn:\n\n• ${courseNames}\n\nChỉ các khóa học mới sẽ được tính tiền. Tiếp tục thanh toán?`
      );
      
      if (!shouldContinue) {
        return;
      }
    }

    setIsProcessing(true);

    // Giả lập xử lý thanh toán
    setTimeout(() => {
      try {
        const userId = user.id || user.email;

        // Tạo danh sách khóa học mới để thêm vào purchases
        const newPurchases = newCourses.map(course => ({
          courseId: course.id,
          title: course.title,
          instructor: course.instructor,
          category: course.category,
          purchaseDate: new Date().toISOString(),
          expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
          progress: 0,
          lastAccessed: new Date().toISOString(),
          completedLessons: 0,
          totalLessons: course.lessons || 10,
          duration: course.duration || "2 giờ",
          certificate: true,
          image: course.image || "general",
          price: course.price || 0
        }));

        // Thêm tất cả khóa học mới vào purchases
        addMultiplePurchases(userId, newPurchases);

        // Xóa giỏ hàng
        clearCart();

        setIsProcessing(false);
        
        // Hiển thị thông báo thành công
        let message = `🎉 Thanh toán thành công!\n\n`;
        message += `Đã thêm ${newCourses.length} khóa học vào tài khoản của bạn.\n`;
        
        if (alreadyOwnedCourses.length > 0) {
          message += `\n(${alreadyOwnedCourses.length} khóa học đã có trong thư viện, không tính phí)`;
        }
        
        message += `\n\nVui lòng kiểm tra trang 'Khóa học của tôi'.`;
        
        alert(message);
        navigate("/my-courses");
      } catch (error) {
        console.error("Error in checkout:", error);
        setIsProcessing(false);
        alert("Đã có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại!");
      }
    }, 1500);
  };

  const applyCoupon = () => {
    if (!coupon.trim()) {
      setCouponError("Vui lòng nhập mã giảm giá");
      return;
    }

    const validCoupons = ["EDU2024", "WELCOME10", "SAVE20", "STUDENT50"];
    
    if (validCoupons.includes(coupon.toUpperCase())) {
      setCouponApplied(true);
      setCouponError("");
    } else {
      setCouponApplied(false);
      setCouponError("Mã giảm giá không hợp lệ hoặc đã hết hạn");
    }
  };

  const removeCoupon = () => {
    setCoupon("");
    setCouponApplied(false);
    setCouponError("");
  };

  // Reset coupon when cart changes
  useEffect(() => {
    if (couponApplied) {
      setCouponApplied(false);
      setCoupon("");
    }
  }, [cartItems]);

  if (!isLoggedIn) {
    return (
       <>
      <title>Checkout Page</title>
      <meta name="description" content="Checkout Page" />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mx-auto h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center mb-6">
              <Lock className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Vui lòng đăng nhập</h2>
            <p className="text-gray-600 mb-8">Bạn cần đăng nhập để thanh toán</p>
            <Link
              to="/login?redirect=/checkout"
              className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-8 py-3 text-lg font-semibold text-white hover:bg-emerald-700"
            >
              Đăng nhập ngay
            </Link>
          </div>
        </div>
      </div>
        </>
    );
  }

  if (cartItems.length === 0) {
    return (
      <>
      <title>Checkout Page</title>
      <meta name="description" content="Checkout Page" />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mx-auto h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center mb-6">
              <CreditCard className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Không có sản phẩm để thanh toán</h2>
            <p className="text-gray-600 mb-8">Giỏ hàng của bạn đang trống</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/courses"
                className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-8 py-3 text-lg font-semibold text-white hover:bg-emerald-700"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Chọn khóa học
              </Link>
              <Link
                to="/cart"
                className="inline-flex items-center justify-center rounded-lg border border-gray-600 px-8 py-3 text-lg font-semibold text-gray-600 hover:bg-gray-50"
              >
                Quay lại giỏ hàng
              </Link>
            </div>
          </div>
        </div>
      </div>
        </>
    );
  }

  return (
    <>
      <title>Checkout Page</title>
      <meta name="description" content="Checkout Page" />
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            to="/cart"
            className="inline-flex items-center text-emerald-600 hover:text-emerald-800 font-medium"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại giỏ hàng
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Thanh toán</h1>

        {/* Warning về khóa học đã mua */}
        {alreadyOwnedCourses.length > 0 && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-amber-800 mb-1">⚠️ Lưu ý quan trọng</p>
                <p className="text-sm text-amber-700">
                  {alreadyOwnedCourses.length} khóa học đã có trong thư viện của bạn. 
                  Chỉ {newCourses.length} khóa học mới sẽ được tính tiền.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <User className="h-6 w-6 text-emerald-600" />
                <h2 className="text-2xl font-bold">Thông tin thanh toán</h2>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Personal Information */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">Thông tin cá nhân</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Họ và tên *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="Nguyễn Văn A"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="example@gmail.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Số điện thoại *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="0987654321"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mã giảm giá
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={coupon}
                          onChange={(e) => {
                            setCoupon(e.target.value);
                            if (couponError) setCouponError("");
                          }}
                          className={`flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                            couponApplied ? "bg-emerald-50 border-emerald-200" : ""
                          }`}
                          placeholder="Nhập mã giảm giá"
                          disabled={couponApplied}
                        />
                        {couponApplied ? (
                          <button
                            type="button"
                            onClick={removeCoupon}
                            className="px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition whitespace-nowrap"
                          >
                            Hủy
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={applyCoupon}
                            className="px-4 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition whitespace-nowrap"
                          >
                            Áp dụng
                          </button>
                        )}
                      </div>
                      {couponError && (
                        <p className="mt-2 text-sm text-red-600">{couponError}</p>
                      )}
                      {couponApplied && (
                        <div className="mt-2 flex items-center gap-2 text-emerald-600">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-sm">Đã áp dụng mã giảm giá thành công!</span>
                        </div>
                      )}
                      <div className="mt-2 text-xs text-gray-500">
                        Mã giảm giá có sẵn: EDU2024, WELCOME10, SAVE20, STUDENT50
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">Phương thức thanh toán</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { id: "momo", label: "Ví MoMo", icon: <Wallet className="h-5 w-5" />, color: "bg-pink-500" },
                      { id: "zalopay", label: "ZaloPay", icon: <Banknote className="h-5 w-5" />, color: "bg-blue-500" },
                      { id: "credit-card", label: "Thẻ tín dụng/ghi nợ", icon: <CreditCard className="h-5 w-5" />, color: "bg-purple-500" },
                      { id: "bank-transfer", label: "Chuyển khoản ngân hàng", icon: <Banknote className="h-5 w-5" />, color: "bg-green-500" },
                    ].map((method) => (
                      <div key={method.id}>
                        <input
                          type="radio"
                          id={method.id}
                          name="paymentMethod"
                          value={method.id}
                          checked={formData.paymentMethod === method.id}
                          onChange={handleInputChange}
                          className="hidden"
                        />
                        <label
                          htmlFor={method.id}
                          className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                            formData.paymentMethod === method.id
                              ? "border-emerald-500 bg-emerald-50"
                              : "border-gray-300 hover:border-emerald-300"
                          }`}
                        >
                          <div className={`${method.color} h-10 w-10 rounded-lg flex items-center justify-center mr-3`}>
                            <div className="text-white">
                              {method.icon}
                            </div>
                          </div>
                          <div>
                            <div className="font-medium">{method.label}</div>
                            <div className="text-xs text-gray-500">
                              {method.id === "momo" && "Thanh toán nhanh qua ví MoMo"}
                              {method.id === "zalopay" && "Thanh toán qua ZaloPay"}
                              {method.id === "credit-card" && "Visa, Mastercard, JCB"}
                              {method.id === "bank-transfer" && "Chuyển khoản trực tiếp"}
                            </div>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Security Assurance */}
                <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-lg mb-6">
                  <ShieldCheck className="h-6 w-6 text-emerald-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-emerald-800">Thanh toán an toàn 100%</p>
                    <p className="text-sm text-emerald-700">
                      • Khóa học sẽ được kích hoạt ngay sau khi thanh toán thành công<br />
                      • Hoàn tiền trong 30 ngày nếu không hài lòng<br />
                      • Hỗ trợ 24/7 qua email và hotline
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing || newCourses.length === 0}
                  className={`w-full py-4 rounded-lg text-lg font-semibold transition flex items-center justify-center gap-2 ${
                    isProcessing
                      ? "bg-gray-400 cursor-not-allowed"
                      : newCourses.length === 0
                      ? "bg-gray-300 cursor-not-allowed text-gray-500"
                      : "bg-emerald-600 hover:bg-emerald-700 text-white"
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Đang xử lý thanh toán...
                    </>
                  ) : newCourses.length === 0 ? (
                    "Tất cả khóa học đã được mua"
                  ) : (
                    <>
                      <Lock className="h-5 w-5" />
                      Thanh toán {total.toLocaleString()}₫
                    </>
                  )}
                </button>

                {newCourses.length === 0 && (
                  <p className="mt-4 text-center text-sm text-gray-600">
                    Tất cả khóa học trong giỏ hàng đều đã có trong thư viện của bạn.
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <h2 className="text-xl font-semibold mb-6">
                Đơn hàng của bạn
                {alreadyOwnedCourses.length > 0 && (
                  <span className="ml-2 text-sm font-normal text-amber-600">
                    ({alreadyOwnedCourses.length} khóa học đã sở hữu)
                  </span>
                )}
              </h2>

              {/* Course List */}
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
                {cartItems.map((item) => {
                  const isAlreadyOwned = alreadyPurchasedCourses.includes(item.id);
                  
                  return (
                    <div key={item.id} className={`flex items-start gap-3 ${isAlreadyOwned ? 'opacity-60' : ''}`}>
                      <div className="h-12 w-12 rounded bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center flex-shrink-0">
                        <span className="text-lg">
                          {item.image === "react" && "⚛️"}
                          {item.image === "marketing" && "📢"}
                          {item.image === "design" && "🎨"}
                          {!["react", "marketing", "design"].includes(item.image) && "📚"}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-sm line-clamp-2">{item.title}</p>
                          {isAlreadyOwned && (
                            <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 text-xs rounded whitespace-nowrap">
                              Đã sở hữu
                            </span>
                          )}
                        </div>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs text-gray-500">Số lượng: {item.quantity}</span>
                          <div className="flex flex-col items-end">
                            <span className={`font-medium text-sm ${isAlreadyOwned ? 'line-through text-gray-400' : ''}`}>
                              {(item.price * item.quantity).toLocaleString()}₫
                            </span>
                            {isAlreadyOwned && (
                              <span className="text-xs text-emerald-600">Miễn phí</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Order Summary */}
              <div className="space-y-3 pt-6 border-t">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tổng giỏ hàng:</span>
                  <span className="font-medium">{useCartStore.getState().cartTotal.toLocaleString()}₫</span>
                </div>

                {alreadyOwnedCourses.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Khóa học đã sở hữu:</span>
                    <span className="text-emerald-600 font-medium">
                      -{(useCartStore.getState().cartTotal - subtotal).toLocaleString()}₫
                    </span>
                  </div>
                )}

                {couponApplied && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Giảm giá coupon:</span>
                    <span className="text-emerald-600 font-medium">
                      -{couponDiscount.toLocaleString()}₫
                    </span>
                  </div>
                )}

                <div className="pt-4 border-t">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Tổng thanh toán:</span>
                    <span className="text-emerald-600">{total.toLocaleString()}₫</span>
                  </div>
                  
                  {(alreadyOwnedCourses.length > 0 || couponApplied) && (
                    <div className="mt-2 text-sm text-emerald-600">
                      Bạn đã tiết kiệm được {(
                        (useCartStore.getState().cartTotal - subtotal) + couponDiscount
                      ).toLocaleString()}₫
                    </div>
                  )}
                </div>
              </div>

              {/* What you get */}
              <div className="mt-8">
                <h3 className="font-semibold mb-4">Bạn sẽ nhận được</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-emerald-700">
                    <CheckCircle className="h-4 w-4" />
                    <span>Truy cập trọn đời khóa học</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-700">
                    <CheckCircle className="h-4 w-4" />
                    <span>Chứng chỉ hoàn thành có giá trị</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-700">
                    <CheckCircle className="h-4 w-4" />
                    <span>Tài liệu và bài tập đầy đủ</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-700">
                    <CheckCircle className="h-4 w-4" />
                    <span>Hỗ trợ từ giảng viên 24/7</span>
                  </div>
                </div>
              </div>

              {/* Support */}
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium mb-2">Cần hỗ trợ thanh toán?</p>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>📞 Hotline: <span className="font-semibold">1900 1234</span></p>
                  <p>✉️ Email: <span className="font-semibold">support@educourse.vn</span></p>
                  <p>🕒 Giờ làm việc: 8:00 - 22:00 (Thứ 2 - CN)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      </>
  );
};

export default CheckoutPage;