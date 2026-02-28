import { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Vui lòng nhập họ tên";
    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }
    if (!formData.message.trim()) newErrors.message = "Vui lòng nhập nội dung";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Giả lập gửi form
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  return (
    <>
      <title>Contact Page</title>
      <meta name="description" content="Contact Page" />
    <div className=" bg-white text-gray-900 font-sans">
      <div className="max-w-6xl mx-auto px-6 py-20">
        
        {/* Header */}
        <div className="mb-16 border-b border-gray-100 pb-8">
          <h1 className="text-3xl font-medium tracking-tight mb-2">Liên hệ</h1>
          <p className="text-gray-500 max-w-xl">
            Chúng tôi sẵn sàng hỗ trợ bạn. Vui lòng điền vào biểu mẫu hoặc liên hệ qua thông tin bên dưới.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          
          {/* Left Column: Info */}
          <div className="space-y-10">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Thông tin liên lạc</h3>
              <div className="space-y-4 text-gray-700">
                <p><strong>Email:</strong> support@educourse.vn</p>
                <p><strong>Điện thoại:</strong> 1900 1234</p>
                <p><strong>Địa chỉ:</strong> Tầng 5, Toà nhà Innovate, Quận 1, TP.HCM</p>
                <p><strong>Giờ làm việc:</strong> Thứ 2 - Thứ 6 (8:00 - 17:00)</p>
              </div>
            </div>

            {isSubmitted && (
              <div className="p-4 border border-green-200 bg-green-50 text-green-800 text-sm rounded-sm">
                Đã gửi thành công. Chúng tôi sẽ phản hồi sớm.
              </div>
            )}
          </div>

          {/* Right Column: Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full bg-transparent border-b ${errors.name ? 'border-red-500' : 'border-gray-300'} py-2 focus:outline-none focus:border-black transition-colors`}
                  placeholder="Nguyễn Văn A"
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-transparent border-b ${errors.email ? 'border-red-500' : 'border-gray-300'} py-2 focus:outline-none focus:border-black transition-colors`}
                  placeholder="example@gmail.com"
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nội dung</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full bg-transparent border-b ${errors.message ? 'border-red-500' : 'border-gray-300'} py-2 focus:outline-none focus:border-black transition-colors resize-none`}
                  placeholder="Bạn cần chúng tôi hỗ trợ gì?"
                />
                {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 px-6 py-2 bg-black text-white text-sm font-medium hover:bg-gray-800 disabled:opacity-50 transition-colors"
              >
                {isSubmitting ? "Đang gửi..." : "Gửi tin nhắn"}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
      </>
  );
};

export default ContactPage;