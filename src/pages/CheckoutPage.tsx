import { useState } from "react";
import { Link } from "react-router";
import { CreditCard, Wallet, Banknote, Lock, ShieldCheck, ArrowLeft, CheckCircle } from "lucide-react";

const CheckoutPage = () => {
  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    paymentMethod: "credit-card",
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
  });

  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false); // Đã sửa
  const [couponError, setCouponError] = useState(""); // Thêm state cho lỗi coupon
  const [isProcessing, setIsProcessing] = useState(false); // Thêm state cho trạng thái xử lý

  // Mock order summary
  const orderItems = [
    { name: "Lập Trình Web Fullstack với React & Node.js", price: 1599000 },
    { name: "Digital Marketing A-Z", price: 1299000 },
    { name: "UI/UX Design Masterclass với Figma", price: 1199000 },
  ];

  const subtotal = orderItems.reduce((sum, item) => sum + item.price, 0);
  const discount = couponApplied ? 500000 : 0; // Giảm giá chỉ khi coupon được áp dụng
  const total = subtotal - discount;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Giả lập xử lý thanh toán
    setTimeout(() => {
      alert("Đặt hàng thành công! Cảm ơn bạn đã mua sắm.");
      setIsProcessing(false);
      // Thực tế sẽ gọi API thanh toán ở đây
    }, 1500);
  };

  const applyCoupon = () => {
    if (!coupon.trim()) {
      setCouponError("Vui lòng nhập mã giảm giá");
      return;
    }

    // Danh sách mã giảm giá hợp lệ
    const validCoupons = ["EDU2024", "WELCOME10", "SAVE20", "STUDENT50"];
    
    if (validCoupons.includes(coupon.toUpperCase())) {
      setCouponApplied(true);
      setCouponError("");
      alert(`Áp dụng mã giảm giá "${coupon}" thành công! Bạn được giảm 500,000₫`);
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

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            to="/cart"
            className="inline-flex items-center text-emerald-600 hover:text-emerald-800 font-medium"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại giỏ hàng
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-2xl font-bold mb-6">Thông tin thanh toán</h2>

              <form onSubmit={handleSubmit}>
                {/* Personal Information */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">Thông tin cá nhân</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Họ và tên *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="Nguyễn Văn A"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="example@gmail.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Số điện thoại *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="0987654321"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mã bưu điện
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="100000"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">Địa chỉ giao hàng</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Địa chỉ *
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        rows={3}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="Số nhà, tên đường, phường/xã..."
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Thành phố *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="Hà Nội"
                        />
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
                            className={`flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                              couponApplied ? "bg-emerald-50 border-emerald-200" : ""
                            }`}
                            placeholder="Nhập mã giảm giá"
                            disabled={couponApplied}
                          />
                          {couponApplied ? (
                            <button
                              type="button"
                              onClick={removeCoupon}
                              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                            >
                              Hủy
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={applyCoupon}
                              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
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
                          Mã giảm giá hợp lệ: EDU2024, WELCOME10, SAVE20, STUDENT50
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">Phương thức thanh toán</h3>
                  <div className="space-y-4">
                    {[
                      { id: "credit-card", label: "Thẻ tín dụng/ghi nợ", icon: <CreditCard className="h-5 w-5" /> },
                      { id: "momo", label: "Ví MoMo", icon: <Wallet className="h-5 w-5" /> },
                      { id: "zalopay", label: "ZaloPay", icon: <Banknote className="h-5 w-5" /> },
                      { id: "bank-transfer", label: "Chuyển khoản ngân hàng", icon: <Banknote className="h-5 w-5" /> },
                    ].map((method) => (
                      <div key={method.id} className="flex items-center">
                        <input
                          type="radio"
                          id={method.id}
                          name="paymentMethod"
                          value={method.id}
                          checked={formData.paymentMethod === method.id}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-emerald-600"
                        />
                        <label htmlFor={method.id} className="ml-3 flex items-center gap-2 cursor-pointer">
                          {method.icon}
                          <span>{method.label}</span>
                        </label>
                      </div>
                    ))}
                  </div>

                  {/* Card Details (only show for credit card) */}
                  {formData.paymentMethod === "credit-card" && (
                    <div className="mt-6 p-4 border rounded-lg bg-gray-50">
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Số thẻ *
                          </label>
                          <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            placeholder="1234 5678 9012 3456"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Ngày hết hạn *
                          </label>
                          <input
                            type="text"
                            name="cardExpiry"
                            value={formData.cardExpiry}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Mã CVC *
                          </label>
                          <input
                            type="text"
                            name="cardCVC"
                            value={formData.cardCVC}
                            onChange={handleInputChange}
                            placeholder="123"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Security Assurance */}
                <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-lg mb-6">
                  <ShieldCheck className="h-6 w-6 text-emerald-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-emerald-800">Thanh toán an toàn</p>
                    <p className="text-sm text-emerald-700">
                      Thông tin của bạn được bảo mật bằng mã hóa SSL 256-bit. Chúng tôi không lưu trữ thông tin thẻ tín dụng.
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`w-full py-4 rounded-lg text-lg font-semibold transition flex items-center justify-center gap-2 ${
                    isProcessing
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-emerald-600 hover:bg-emerald-700 text-white"
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Đang xử lý...
                    </>
                  ) : (
                    <>
                      <Lock className="h-5 w-5" />
                      Hoàn tất đặt hàng - {total.toLocaleString()}₫
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <h2 className="text-xl font-semibold mb-6">Đơn hàng của bạn</h2>

              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
                {orderItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium text-sm line-clamp-2">{item.name}</p>
                    </div>
                    <div className="ml-4 text-right">
                      <p className="font-medium">{item.price.toLocaleString()}₫</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tạm tính:</span>
                  <span className="font-medium">{subtotal.toLocaleString()}₫</span>
                </div>

                {/* Hiển thị discount chỉ khi coupon được áp dụng */}
                {couponApplied && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Giảm giá:</span>
                    <span className="text-emerald-600 font-medium">
                      -{discount.toLocaleString()}₫
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
                      Bạn đã tiết kiệm được {discount.toLocaleString()}₫
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold mb-4">Điều khoản và điều kiện</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <p>• Bằng cách hoàn tất đặt hàng, bạn đồng ý với các điều khoản dịch vụ của chúng tôi.</p>
                  <p>• Bạn sẽ nhận được email xác nhận đơn hàng trong vòng 24 giờ.</p>
                  <p>• Truy cập khóa học ngay sau khi thanh toán thành công.</p>
                  <p>• Hỗ trợ hoàn tiền trong 30 ngày nếu không hài lòng.</p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Đảm bảo hoàn tiền 100% trong 30 ngày</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;