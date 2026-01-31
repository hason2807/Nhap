import { useParams } from "react-router";
import { courses } from "../data/courses";
import { generateCourseImage } from "../utils/imageGenerator";
import { useCart } from "../context/CartContext";
import { ShoppingCart, CheckCircle, Clock, Users, Award, Globe, FileText, PlayCircle, Star, Check, BookOpen, ChevronRight, Shield, Download } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = courses.find((c) => c.id === Number(id));
  const { addToCart, cartItems } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState("curriculum");

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-6">
            <BookOpen className="h-12 w-12 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Khóa học không tồn tại</h1>
          <p className="text-gray-600 mb-8">Khóa học bạn đang tìm kiếm không có trong hệ thống.</p>
          <Link
            to="/courses"
            className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-8 py-3 text-lg font-semibold text-white hover:bg-emerald-700 transition-colors"
          >
            ← Quay lại danh sách khóa học
          </Link>
        </div>
      </div>
    );
  }

  const isInCart = cartItems.some(item => item.id === course.id);

  const handleAddToCart = () => {
    // Kiểm tra đăng nhập trước khi thêm vào giỏ hàng
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      const shouldLogin = window.confirm(
        "Bạn cần đăng nhập để thêm khóa học vào giỏ hàng.\n\nBạn có muốn chuyển đến trang đăng nhập ngay bây giờ?"
      );
      
      if (shouldLogin) {
        navigate(`/login?redirect=/courses/${course.id}`);
      }
      return;
    }

    addToCart({
      id: course.id,
      title: course.title,
      instructor: course.instructor,
      price: course.price,
      originalPrice: course.originalPrice,
      image: course.image,
      category: course.category,
      lessons: course.lessons,
      duration: course.duration
    });
    
    setAddedToCart(true);
    
    setTimeout(() => {
      setAddedToCart(false);
    }, 3000);
  };

  const calculateDiscount = () => {
    if (course.originalPrice > course.price) {
      return Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);
    }
    return 0;
  };

  const handleBuyNow = () => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      const shouldLogin = window.confirm(
        "Bạn cần đăng nhập để mua khóa học.\n\nBạn có muốn chuyển đến trang đăng nhập ngay bây giờ?"
      );
      
      if (shouldLogin) {
        navigate(`/login?redirect=/courses/${course.id}&action=buy`);
      }
      return;
    }

    // Thêm vào giỏ hàng và chuyển đến checkout
    handleAddToCart();
    setTimeout(() => {
      navigate("/checkout");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li>
              <Link to="/" className="text-sm text-gray-500 hover:text-emerald-600">
                Trang chủ
              </Link>
            </li>
            <li>
              <span className="mx-2 text-gray-400">/</span>
            </li>
            <li>
              <Link to="/courses" className="text-sm text-gray-500 hover:text-emerald-600">
                Khóa học
              </Link>
            </li>
            <li>
              <span className="mx-2 text-gray-400">/</span>
            </li>
            <li className="text-sm text-emerald-600 font-medium truncate max-w-xs">
              {course.title}
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Header */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Course Image */}
                <div className="md:w-1/3">
                  <div className="relative rounded-lg overflow-hidden">
                    <img
                      src={generateCourseImage(course.image)}
                      alt={course.title}
                      className="w-full h-48 object-cover"
                    />
                    {course.badge && (
                      <span className="absolute top-3 left-3 bg-emerald-600 text-white text-xs px-3 py-1 rounded-full">
                        {course.badge}
                      </span>
                    )}
                    {calculateDiscount() > 0 && (
                      <span className="absolute top-3 right-3 bg-rose-500 text-white text-xs px-3 py-1 rounded-full font-bold">
                        -{calculateDiscount()}%
                      </span>
                    )}
                  </div>
                </div>

                {/* Course Info */}
                <div className="md:w-2/3">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h1>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="font-medium">{course.rating.toFixed(1)}</span>
                      <span className="text-gray-500 ml-1">({course.students.toLocaleString()} học viên)</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      <span>Giảng viên: {course.instructor}</span>
                    </div>
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-2" />
                      <span>Ngôn ngữ: {course.language}</span>
                    </div>
                    <div className="flex items-center">
                      <Award className="h-4 w-4 mr-2" />
                      <span>Có chứng chỉ</span>
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-2" />
                      <span>{course.lessons} bài học</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm mb-6">
              <div className="border-b">
                <nav className="flex overflow-x-auto">
                  <button
                    onClick={() => setActiveTab("curriculum")}
                    className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === "curriculum"
                        ? "border-emerald-600 text-emerald-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <FileText className="inline-block h-4 w-4 mr-2" />
                    Nội dung khóa học
                  </button>
                  <button
                    onClick={() => setActiveTab("learn")}
                    className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === "learn"
                        ? "border-emerald-600 text-emerald-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <Award className="inline-block h-4 w-4 mr-2" />
                    Bạn sẽ học được gì
                  </button>
                </nav>
              </div>

              <div className="p-6">
                {activeTab === "curriculum" && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">{course.curriculum.length} chương • {course.lessons} bài học</h3>
                    <div className="space-y-3">
                      {course.curriculum.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
                              <PlayCircle className="h-4 w-4 text-emerald-600" />
                            </div>
                            <div>
                              <h4 className="font-medium">{item.title}</h4>
                              <p className="text-sm text-gray-500">{item.duration}</p>
                            </div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "learn" && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Kỹ năng bạn sẽ đạt được</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {course.whatYouLearn.map((item, index) => (
                        <div key={index} className="flex items-start p-3 bg-emerald-50 rounded-lg">
                          <Check className="h-5 w-5 text-emerald-600 mr-3 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Instructor Info */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Giảng viên</h2>
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">
                    {course.instructor.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-lg">{course.instructor}</h3>
                  <p className="text-gray-600 mb-3">Chuyên gia {course.category} với 5+ năm kinh nghiệm</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>⭐ {course.rating.toFixed(1)}/5.0 đánh giá</span>
                    <span>👨‍🏫 {course.students.toLocaleString()} học viên</span>
                    <span>🎓 10+ khóa học</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Purchase Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <h2 className="text-xl font-bold mb-4">Mua khóa học này</h2>
              
              {/* Pricing */}
              <div className="mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-emerald-600">
                    {course.price.toLocaleString()}₫
                  </span>
                  {course.originalPrice > course.price && (
                    <>
                      <span className="text-lg text-gray-400 line-through">
                        {course.originalPrice.toLocaleString()}₫
                      </span>
                      <span className="bg-rose-100 text-rose-800 text-sm font-bold px-2 py-1 rounded">
                        -{calculateDiscount()}%
                      </span>
                    </>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-2">Giá ưu đãi chỉ còn trong 2 ngày</p>
              </div>

              {/* Course Features */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 text-gray-400 mr-3" />
                  <span>Truy cập trọn đời</span>
                </div>
                <div className="flex items-center text-sm">
                  <PlayCircle className="h-4 w-4 text-gray-400 mr-3" />
                  <span>{course.lessons} bài học video chất lượng cao</span>
                </div>
                <div className="flex items-center text-sm">
                  <FileText className="h-4 w-4 text-gray-400 mr-3" />
                  <span>Tài liệu và bài tập thực hành</span>
                </div>
                <div className="flex items-center text-sm">
                  <Award className="h-4 w-4 text-gray-400 mr-3" />
                  <span>Chứng chỉ hoàn thành khóa học</span>
                </div>
                <div className="flex items-center text-sm">
                  <Check className="h-4 w-4 text-gray-400 mr-3" />
                  <span>Hỗ trợ 24/7 từ giảng viên</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button 
                  onClick={handleAddToCart}
                  disabled={isInCart}
                  className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 font-medium transition ${
                    isInCart 
                      ? "bg-emerald-100 text-emerald-700 cursor-not-allowed"
                      : addedToCart
                      ? "bg-green-100 text-green-700"
                      : "bg-emerald-600 hover:bg-emerald-700 text-white"
                  }`}
                >
                  {isInCart ? (
                    <>
                      <CheckCircle className="h-5 w-5" />
                      Đã thêm vào giỏ hàng
                    </>
                  ) : addedToCart ? (
                    <>
                      <CheckCircle className="h-5 w-5" />
                      Đã thêm vào giỏ hàng!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-5 w-5" />
                      Thêm vào giỏ hàng
                    </>
                  )}
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full text-center border-2 border-emerald-600 text-emerald-600 py-3 rounded-lg hover:bg-emerald-50 transition font-medium"
                >
                  Mua ngay
                </button>
              </div>

              {/* Guarantee */}
              <div className="mt-6 p-4 bg-emerald-50 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="h-5 w-5 text-emerald-600" />
                  <span className="font-semibold">Đảm bảo hoàn tiền 30 ngày</span>
                </div>
                <p className="text-sm text-emerald-700">
                  Nếu bạn không hài lòng với khóa học, chúng tôi sẽ hoàn lại 100% số tiền.
                </p>
              </div>

              {/* Share Course */}
              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-gray-600 mb-3">Chia sẻ khóa học này:</p>
                <div className="flex gap-2">
                  <button className="flex-1 bg-blue-600 text-white py-2 rounded text-sm hover:bg-blue-700">
                    Facebook
                  </button>
                  <button className="flex-1 bg-blue-400 text-white py-2 rounded text-sm hover:bg-blue-500">
                    Twitter
                  </button>
                  <button className="flex-1 bg-gray-800 text-white py-2 rounded text-sm hover:bg-gray-900">
                    Copy Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;