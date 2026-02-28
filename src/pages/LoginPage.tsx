import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { Mail, Lock, Eye, EyeOff, Key } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuthStore } from "../stores/authStore";

// Định nghĩa schema validation với Yup
const loginSchema = yup.object({
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email")
    .trim()
    .max(100, "Email quá dài"),
  password: yup
    .string()
    .required("Vui lòng nhập mật khẩu")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .max(30, "Mật khẩu quá dài"),
});

type LoginFormData = yup.InferType<typeof loginSchema>;

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Khởi tạo React Hook Form với Yup resolver
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
  });

  // Lấy redirect URL từ query parameters
  const getRedirectUrl = () => {
    const params = new URLSearchParams(location.search);
    return params.get('redirect') || '/';
  };

  // Tự động điền email nếu đã chọn "Ghi nhớ đăng nhập" trước đó
  useEffect(() => {
    const remembered = localStorage.getItem('rememberMe');
    const savedEmail = localStorage.getItem('userEmail');
    
    if (remembered === 'true' && savedEmail) {
      setValue('email', savedEmail);
      setRememberMe(true);
    }
  }, [setValue]);

  const onSubmit = async (data: LoginFormData) => {
    setError("");
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      
      // Lấy danh sách users từ localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Tìm user với email và password khớp
      const foundUser = users.find(
        (user: any) => 
          user.email === data.email && 
          user.password === data.password
      );
      
      if (foundUser) {
        // Chuẩn bị user data
        const userData = {
          id: foundUser.id,
          email: foundUser.email,
          fullName: foundUser.fullName,
          phone: foundUser.phone,
          role: foundUser.role,
        };
        
        // Cập nhật Zustand authStore để Header nhận diện user
        login(userData);
        
        // Lưu thông tin đăng nhập hiện tại vào localStorage
        const loggedInUser = {
          ...userData,
          isLoggedIn: true,
          token: `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          lastLogin: new Date().toISOString()
        };
        
        localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
        
        // Nếu chọn "Ghi nhớ đăng nhập", lưu email vào localStorage
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
          localStorage.setItem('userEmail', data.email);
        } else {
          localStorage.removeItem('rememberMe');
          localStorage.removeItem('userEmail');
        }
        
        alert(`Đăng nhập thành công! Chào mừng ${foundUser.fullName}`);
        
        // Chuyển hướng đến URL được chỉ định hoặc trang chủ
        const redirectUrl = getRedirectUrl();
        navigate(redirectUrl);
      } else {
        setError("Email hoặc mật khẩu không chính xác");
      }
    }, 1500);
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <>
      <title>Login Page</title>
      <meta name="description" content="Login Page" />
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* Logo và heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Chào mừng trở lại
          </h1>
          <p className="text-gray-600">
            Đăng nhập để tiếp tục học tập
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center text-red-800">
                <Key className="h-5 w-5 mr-2" />
                <span className="font-medium">{error}</span>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  {...register("email")}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="example@gmail.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Mật khẩu *
                </label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  Quên mật khẩu?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="h-4 w-4 text-emerald-600 rounded focus:ring-emerald-500"
              />
              <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">
                Ghi nhớ đăng nhập
              </label>
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
                  Đang xử lý...
                </div>
              ) : (
                "Đăng nhập"
              )}
            </button>

            {/* Register Link */}
            <div className="text-center pt-4 border-t">
              <p className="text-gray-600">
                Chưa có tài khoản?{" "}
                <Link to="/register" className="text-emerald-600 font-semibold hover:text-emerald-700">
                  Đăng ký ngay
                </Link>
              </p>
            </div>
          </form>
        </div>
        
        {/* Security note */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center text-sm text-gray-500">
            <Lock className="h-4 w-4 mr-2" />
            <span>Thông tin của bạn được bảo mật an toàn</span>
          </div>
        </div>
      </div>
    </div>
      </>
  );
};

export default LoginPage;