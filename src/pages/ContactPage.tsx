import { useState } from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageSquare, 
  User, 
  CheckCircle,
} from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Contact methods
  const contactMethods = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Điện thoại",
      details: ["1900 1234", "0987 654 321"],
      description: "Thứ 2 - Thứ 6: 8:00 - 17:00",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      details: ["support@educourse.vn", "contact@educourse.vn"],
      description: "Phản hồi trong vòng 24 giờ",
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Văn phòng",
      details: ["Tầng 5, Toà nhà Innovate", "123 Đường ABC, Quận 1", "TP. Hồ Chí Minh"],
      description: "Làm việc trực tiếp theo lịch hẹn",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Giờ làm việc",
      details: ["Thứ 2 - Thứ 6: 8:00 - 17:00", "Thứ 7: 8:00 - 12:00", "Chủ nhật: Nghỉ"],
      description: "Hỗ trợ trực tuyến 24/7",
      color: "bg-amber-100 text-amber-600",
    },
  ];

  // FAQs
  const faqs = [
    {
      question: "Làm thế nào để đăng ký khóa học?",
      answer: "Bạn có thể đăng ký trực tiếp trên website bằng cách chọn khóa học và nhấn 'Mua ngay', hoặc liên hệ hotline để được tư vấn.",
    },
    {
      question: "Chính sách hoàn tiền như thế nào?",
      answer: "Chúng tôi có chính sách hoàn tiền trong vòng 30 ngày nếu bạn không hài lòng với khóa học. Liên hệ bộ phận hỗ trợ để được hướng dẫn.",
    },
    {
      question: "Làm sao để trở thành giảng viên?",
      answer: "Nếu bạn có chuyên môn và muốn chia sẻ kiến thức, vui lòng gửi CV và đề xuất khóa học đến email: instructor@educourse.vn",
    },
    {
      question: "Có hỗ trợ học viên quốc tế không?",
      answer: "Có, chúng tôi hỗ trợ thanh toán quốc tế và có các khóa học bằng tiếng Anh. Liên hệ để biết thêm chi tiết.",
    },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Vui lòng nhập họ tên";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Vui lòng nhập tiêu đề";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Vui lòng nhập nội dung";
    } else if (formData.message.length < 10) {
      newErrors.message = "Nội dung quá ngắn (tối thiểu 10 ký tự)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Giả lập gửi form
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      
      // Tự động ẩn thông báo sau 5 giây
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gray-170 py-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center text-black">
      <h1 className="text-4xl font-bold mb-4 sm:text-5xl">
        Liên Hệ Với Chúng Tôi
      </h1>
      <p className="text-xl opacity-90 max-w-3xl mx-auto">
        Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. 
        Đừng ngần ngại liên hệ nếu bạn có bất kỳ câu hỏi nào.
      </p>
    </div>
  </div>
</section>


      {/* Success Message */}
      {isSubmitted && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-6 w-6 text-emerald-600" />
              <div>
                <h3 className="font-semibold text-emerald-800">Gửi thành công!</h3>
                <p className="text-emerald-700">
                  Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi trong thời gian sớm nhất.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left - Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="h-6 w-6 text-emerald-600" />
                <h2 className="text-2xl font-bold">Gửi Tin Nhắn Cho Chúng Tôi</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Họ và tên *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                          errors.name ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Nguyễn Văn A"
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="example@gmail.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Số điện thoại
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="0987 654 321"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tiêu đề *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                        errors.subject ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Ví dụ: Tư vấn khóa học lập trình"
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nội dung tin nhắn *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                      errors.message ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Xin vui lòng mô tả chi tiết vấn đề của bạn..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800"
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Đang gửi...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Send className="h-5 w-5" />
                      Gửi Tin Nhắn
                    </div>
                  )}
                </button>
              </form>
            </div>

            {/* FAQs Section */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-6">Câu Hỏi Thường Gặp</h2>
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="font-semibold text-lg mb-2 text-emerald-700">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Contact Info */}
          <div className="lg:col-span-1">
            {/* Contact Methods */}
            <div className="space-y-6">
              {contactMethods.map((method, idx) => (
                <div key={idx} className="bg-white rounded-2xl shadow-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className={`${method.color} p-3 rounded-lg`}>
                      {method.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">{method.title}</h3>
                      <div className="space-y-1">
                        {method.details.map((detail, i) => (
                          <p key={i} className="text-gray-700">{detail}</p>
                        ))}
                      </div>
                      <p className="text-sm text-gray-500 mt-2">{method.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Map Placeholder */}
            <div className="mt-8 bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-emerald-400 to-blue-400 flex items-center justify-center">
                <div className="text-center text-white">
                  <MapPin className="h-12 w-12 mx-auto mb-3" />
                  <p className="font-semibold">Vị Trí Của Chúng Tôi</p>
                  <p className="text-sm opacity-90">Tầng 5, Toà nhà Innovate</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">Đến Thăm Văn Phòng</h3>
                <p className="text-gray-600 mb-3">
                  Chúng tôi rất vui được đón tiếp bạn tại văn phòng. Vui lòng đặt lịch hẹn trước.
                </p>
                <button className="w-full py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition">
                  Đặt Lịch Hẹn
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600">24/7</div>
              <div className="text-gray-600">Hỗ Trợ Trực Tuyến</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600">2h</div>
              <div className="text-gray-600">Phản Hồi Nhanh</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600">98%</div>
              <div className="text-gray-600">Hài Lòng</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600">10K+</div>
              <div className="text-gray-600">Khách Hàng</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;