import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Mail, Lock, User, Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Password validation rules
  const passwordRules = {
    minLength: { value: 8, met: false },
    hasUpperCase: { value: /[A-Z]/, met: false },
    hasLowerCase: { value: /[a-z]/, met: false },
    hasNumber: { value: /\d/, met: false },
    hasSpecialChar: { value: /[!@#$%^&*]/, met: false },
  };

  const [passwordValidation, setPasswordValidation] = useState(passwordRules);

  const updatePasswordRules = (password: string) => {
    const rules = { ...passwordRules };
    rules.minLength.met = password.length >= 8;
    rules.hasUpperCase.met = /[A-Z]/.test(password);
    rules.hasLowerCase.met = /[a-z]/.test(password);
    rules.hasNumber.met = /\d/.test(password);
    rules.hasSpecialChar.met = /[!@#$%^&*]/.test(password);
    return rules;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Vui lòng nhập họ và tên";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    } else {
      // Check if email already exists
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const emailExists = existingUsers.some((user: any) => user.email === formData.email);
      if (emailExists) {
        newErrors.email = "Email đã được đăng ký";
      }
    }

    if (!formData.password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    } else {
      const rules = updatePasswordRules(formData.password);
      const allMet = Object.values(rules).every(rule => rule.met);
      if (!allMet) {
        newErrors.password = "Mật khẩu không đủ mạnh";
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu không khớp";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "Vui lòng đồng ý với điều khoản";
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

    // Giả lập API call
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Lấy danh sách users hiện có
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Tạo user mới với ID duy nhất
      const newUser = {
        id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        createdAt: new Date().toISOString(),
        role: "student"
      };
      
      // Thêm user mới vào danh sách
      existingUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));
      
      alert(`Đăng ký thành công! Chào mừng ${formData.fullName}. Vui lòng đăng nhập.`);
      navigate("/login");
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }

    if (name === "password") {
      setPasswordValidation(updatePasswordRules(value));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <Link to="/" className="inline-block mb-3">
            <div className="h-12 w-12 bg-emerald-600 rounded-xl flex items-center justify-center mx-auto">
              <span className="text-white font-bold">EC</span>
            </div>
          </Link>
          <h1 className="text-2xl font-semibold text-gray-900">
            Tạo tài khoản
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Đã có tài khoản?{" "}
            <Link to="/login" className="text-emerald-600 font-medium">
              Đăng nhập
            </Link>
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border rounded-xl p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full name */}
            <div>
              <label className="text-sm text-gray-600">Họ và tên</label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full pl-9 py-2.5 border rounded-lg text-sm focus:ring-1 focus:ring-emerald-500 ${
                    errors.fullName ? "border-red-500" : ""
                  }`}
                  placeholder="Nguyễn Văn A"
                />
              </div>
              {errors.fullName && (
                <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-9 py-2.5 border rounded-lg text-sm focus:ring-1 focus:ring-emerald-500 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  placeholder="example@gmail.com"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-600 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-600">Mật khẩu</label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-9 pr-9 py-2.5 border rounded-lg text-sm focus:ring-1 focus:ring-emerald-500 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Password rules */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              {Object.entries(passwordValidation).map(([key, rule]) => (
                <div key={key} className="flex items-center gap-1">
                  {rule.met ? (
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                  ) : (
                    <XCircle className="h-3.5 w-3.5 text-gray-300" />
                  )}
                  <span className={rule.met ? "text-emerald-600" : "text-gray-500"}>
                    {key === "minLength" && "≥ 8 ký tự"}
                    {key === "hasUpperCase" && "Chữ hoa"}
                    {key === "hasLowerCase" && "Chữ thường"}
                    {key === "hasNumber" && "Có số"}
                    {key === "hasSpecialChar" && "Ký tự đặc biệt"}
                  </span>
                </div>
              ))}
            </div>

            {/* Confirm password */}
            <div>
              <label className="text-sm text-gray-600">Xác nhận mật khẩu</label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-9 pr-9 py-2.5 border rounded-lg text-sm focus:ring-1 focus:ring-emerald-500 ${
                    errors.confirmPassword ? "border-red-500" : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-red-600 mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="mt-1"
              />
              <span className="text-gray-600">
                Tôi đồng ý với{" "}
                <Link to="/terms" className="text-emerald-600">Điều khoản</Link>{" "}
                &{" "}
                <Link to="/privacy" className="text-emerald-600">Chính sách</Link>
              </span>
            </div>

            {errors.agreeToTerms && (
              <p className="text-xs text-red-600">{errors.agreeToTerms}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 rounded-lg text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400"
            >
              {isSubmitting ? "Đang xử lý..." : "Tạo tài khoản"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default RegisterPage;