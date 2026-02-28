import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Mail, Lock, User, Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Định nghĩa schema validation với Yup
const registerSchema = yup.object({
  fullName: yup
    .string()
    .required("Vui lòng nhập họ và tên")
    .trim()
    .min(2, "Họ tên phải có ít nhất 2 ký tự")
    .max(50, "Họ tên quá dài")
    .matches(/^[a-zA-ZÀ-ỹ\s]+$/, "Họ tên không được chứa số hoặc ký tự đặc biệt"),
  email: yup
    .string()
    .required("Vui lòng nhập email")
    .email("Email không hợp lệ")
    .trim()
    .max(100, "Email quá dài")
    .test('email-unique', 'Email đã được đăng ký', function (value) {
      if (!value) return true;
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      return !users.some((user: any) => user.email === value);
    }),

  password: yup
    .string()
    .required("Vui lòng nhập mật khẩu")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .max(30, "Mật khẩu quá dài")
    .matches(/[A-Z]/, "Mật khẩu phải chứa ít nhất 1 chữ hoa")
    .matches(/[a-z]/, "Mật khẩu phải chứa ít nhất 1 chữ thường")
    .matches(/\d/, "Mật khẩu phải chứa ít nhất 1 số")
    .matches(/[!@#$%^&*]/, "Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt (!@#$%^&*)"),

  confirmPassword: yup
    .string()
    .required("Vui lòng xác nhận mật khẩu")
    .oneOf([yup.ref('password')], "Mật khẩu không khớp"),

  agreeToTerms: yup
    .boolean()
    .oneOf([true], "Vui lòng đồng ý với điều khoản")
    .required("Vui lòng đồng ý với điều khoản"),
});

type RegisterFormData = yup.InferType<typeof registerSchema>;

const RegisterPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Khởi tạo React Hook Form với Yup resolver
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    }
  });

  // Watch password để hiển thị validation rules realtime
  const password = watch("password", "");

  // Password validation rules để hiển thị UI
  const passwordValidation = {
    minLength: { met: password.length >= 6 },
    hasUpperCase: { met: /[A-Z]/.test(password) },
    hasLowerCase: { met: /[a-z]/.test(password) },
    hasNumber: { met: /\d/.test(password) },
    hasSpecialChar: { met: /[!@#$%^&*]/.test(password) },
  };

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true);

    // Giả lập API call
    setTimeout(() => {
      try {
        // Lấy danh sách users hiện có
        const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Double-check email unique (phòng trường hợp có người dùng khác đăng ký cùng lúc)
        const emailExists = existingUsers.some((user: any) => user.email === data.email);
        if (emailExists) {
          setError("email", {
            type: "manual",
            message: "Email đã được đăng ký"
          });
          setIsSubmitting(false);
          return;
        }

        // Tạo user mới với ID duy nhất
        const newUser = {
          id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          fullName: data.fullName.trim(),
          email: data.email,
          password: data.password, // Trong thực tế nên hash password
          createdAt: new Date().toISOString(),
          role: "student"
        };
        
        // Thêm user mới vào danh sách
        existingUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(existingUsers));
        
        alert(`Đăng ký thành công! Chào mừng ${data.fullName}. Vui lòng đăng nhập.`);
        navigate("/login");
      } catch (error) {
        alert("Có lỗi xảy ra, vui lòng thử lại");
      } finally {
        setIsSubmitting(false);
      }
    }, 1500);
  };

  return (
    <>
      <title>Register Page</title>
      <meta name="description" content="Register Page" />
    <div className=" flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-md py-1">

     {/* Header */}
<h1 className="text-2xl font-bold text-center text-gray-800 mb-6 uppercase">
  ĐĂNG KÝ
</h1>
        {/* Card */}
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full name */}
            <div>
              <label className="text-sm font-medium text-gray-700">Họ và tên</label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  {...register("fullName")}
                  className={`w-full pl-9 py-2.5 border rounded-lg text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 ${
                    errors.fullName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Nguyễn Văn A"
                />
              </div>
              {errors.fullName && (
                <p className="text-xs text-red-600 mt-1">{errors.fullName.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  {...register("email")}
                  className={`w-full pl-9 py-2.5 border rounded-lg text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="example@gmail.com"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-700">Mật khẩu</label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className={`w-full pl-9 pr-9 py-2.5 border rounded-lg text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-600 mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Password rules */}
            <div className="grid grid-cols-2 gap-2 text-xs bg-gray-50 p-3 rounded-lg">
              {Object.entries(passwordValidation).map(([key, rule]) => (
                <div key={key} className="flex items-center gap-1.5">
                  {rule.met ? (
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                  ) : (
                    <XCircle className="h-3.5 w-3.5 text-gray-300 flex-shrink-0" />
                  )}
                  <span className={rule.met ? "text-emerald-600 font-medium" : "text-gray-500"}>
                    {key === "minLength" && "≥ 6 ký tự"}
                    {key === "hasUpperCase" && "Chữ hoa (A-Z)"}
                    {key === "hasLowerCase" && "Chữ thường (a-z)"}
                    {key === "hasNumber" && "Có số (0-9)"}
                    {key === "hasSpecialChar" && "Ký tự đặc biệt (!@#$%^&*)"}
                  </span>
                </div>
              ))}
            </div>

            {/* Confirm password */}
            <div>
              <label className="text-sm font-medium text-gray-700">Xác nhận mật khẩu</label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                  className={`w-full pl-9 pr-9 py-2.5 border rounded-lg text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 ${
                    errors.confirmPassword ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-red-600 mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                {...register("agreeToTerms")}
                className="mt-1 h-4 w-4 text-emerald-600 rounded focus:ring-emerald-500"
                id="agreeToTerms"
              />
              <label htmlFor="agreeToTerms" className="text-sm text-gray-600">
                Tôi đồng ý với{" "}
                <Link to="/terms" className="text-emerald-600 hover:text-emerald-700 font-medium">
                  Điều khoản
                </Link>{" "}
                &{" "}
                <Link to="/privacy" className="text-emerald-600 hover:text-emerald-700 font-medium">
                  Chính sách
                </Link>
              </label>
            </div>

            {errors.agreeToTerms && (
              <p className="text-xs text-red-600">{errors.agreeToTerms.message}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Đang xử lý...
                </div>
              ) : (
                "Tạo tài khoản"
              )}
            </button>
            <div className="text-center mb-6">
  <p className="text-gray-600">
    Đã có tài khoản?{" "}
    <Link to="/login" className="text-emerald-600 font-semibold hover:text-emerald-700">
      Đăng nhập
    </Link>
  </p>
</div>
          </form>
        </div>

        {/* Security note */}
        <p className="text-xs text-center text-gray-500 mt-4">
          Bằng việc đăng ký, bạn đồng ý với{" "}
          <Link to="/terms" className="text-emerald-600 hover:underline">Điều khoản</Link>{" "}
          và{" "}
          <Link to="/privacy" className="text-emerald-600 hover:underline">Chính sách</Link>{" "}
          của chúng tôi
        </p>
      </div>
    </div>
      </>
  );
};

export default RegisterPage;