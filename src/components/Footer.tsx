import { Facebook, Youtube, Instagram } from "lucide-react";
import { Link } from "react-router";
// Mock Link component
function Footer() {
  return (
    <div className="flex flex-col justify-end bg-gray-100">
      <footer className="bg-emerald-700 text-white w-full">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-wrap md:flex-nowrap justify-between items-start gap-8 text-left">

            {/* Brand - Chiếm không gian rộng hơn một chút nếu cần */}
            <div className="w-full md:w-1/3 min-w-[200px]">
              <h2 className="text-2xl font-bold mb-3">
                Edu<span className="text-emerald-200">Course</span>
              </h2>
              <p className="text-sm text-emerald-100 leading-relaxed max-w-xs">
                Nền tảng học trực tuyến giúp bạn nâng cao kỹ năng,
                phát triển sự nghiệp mọi lúc, mọi nơi.
              </p>
            </div>
            {/* Links */}
            <div className="min-w-[120px]">
              <h3 className="font-semibold mb-3 whitespace-nowrap">Liên kết</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="hover:text-emerald-200 transition">Trang chủ</Link></li>
                <li><Link to="/courses" className="hover:text-emerald-200 transition">Khóa học</Link></li>
                <li><Link to="/blog" className="hover:text-emerald-200 transition">Blog</Link></li>
                <li><Link to="/contact" className="hover:text-emerald-200 transition">Liên hệ</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div className="min-w-[150px]">
              <h3 className="font-semibold mb-3 whitespace-nowrap">Hỗ trợ</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="#" className="hover:text-emerald-200 transition">Câu hỏi thường gặp</Link></li>
                <li><Link to="#" className="hover:text-emerald-200 transition">Điều khoản</Link></li>
                <li><Link to="#" className="hover:text-emerald-200 transition">Chính sách bảo mật</Link></li>
              </ul>
            </div>

            {/* Social */}
            <div className="min-w-[150px]">
              <h3 className="font-semibold mb-3 whitespace-nowrap">Theo dõi</h3>
              <div className="flex gap-4">
                <a href="#" className="hover:text-emerald-200 transition"><Facebook size={20} /></a>
                <a href="#" className="hover:text-emerald-200 transition"><Youtube size={20} /></a>
                <a href="#" className="hover:text-emerald-200 transition"><Instagram size={20} /></a>
              </div>
            </div>

          </div>

          {/* Bottom */}
          <div className="border-t border-emerald-600 mt-8 pt-4 text-center text-xs sm:text-sm text-emerald-100">
            © {new Date().getFullYear()} EduCourse. All rights reserved.
          </div>

        </div>
      </footer>
    </div>
  );
}

export default Footer;