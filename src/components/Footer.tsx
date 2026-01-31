import { Link } from "react-router";
import { Facebook, Youtube, Instagram } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-emerald-700 text-white"> {/* Bỏ mt-16 */}
      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Top */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold mb-3">
              Edu<span className="text-emerald-200">Course</span>
            </h2>
            <p className="text-sm text-emerald-100 leading-relaxed">
              Nền tảng học trực tuyến giúp bạn nâng cao kỹ năng,
              phát triển sự nghiệp mọi lúc, mọi nơi.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-3">Liên kết</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-emerald-200 transition">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-emerald-200 transition">
                  Khóa học
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-emerald-200 transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-emerald-200 transition">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-3">Hỗ trợ</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="#" className="hover:text-emerald-200 transition">
                  Câu hỏi thường gặp
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-emerald-200 transition">
                  Điều khoản
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-emerald-200 transition">
                  Chính sách bảo mật
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-3">Theo dõi chúng tôi</h3>
            <div className="flex justify-center md:justify-start gap-4">
              <a href="#" className="hover:text-emerald-200 transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-emerald-200 transition">
                <Youtube size={20} />
              </a>
              <a href="#" className="hover:text-emerald-200 transition">
                <Instagram size={20} />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-emerald-600 mt-8 pt-4 text-center text-xs sm:text-sm text-emerald-100">
          © {new Date().getFullYear()} EduCourse. All rights reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;