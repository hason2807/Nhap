import { useMemo, useState } from "react";
import { courses, categories } from "../data/courses";
import { generateCourseImage } from "../utils/imageGenerator";
import { Link, useNavigate } from "react-router";
import { useCart } from "../context/CartContext";
import { ShoppingCart, CheckCircle, Star, Users, Clock, Filter, Search } from "lucide-react";

const PAGE_SIZE = 9;

const CoursesPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("students");
  const [page, setPage] = useState(1);
  const { addToCart, cartItems } = useCart();
  const [recentlyAdded, setRecentlyAdded] = useState<number | null>(null);

  // ================== FILTER + SORT ==================
  const filteredCourses = useMemo(() => {
    let result = courses.filter((c) => {
      const matchSearch = c.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory =
        category === "All" || c.category === category;

      return matchSearch && matchCategory;
    });

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "students":
      default:
        result.sort((a, b) => b.students - a.students);
    }

    return result;
  }, [search, category, sort]);

  // ================== PAGINATION ==================
  const totalPages = Math.ceil(filteredCourses.length / PAGE_SIZE);

  const paginatedCourses = filteredCourses.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const handleAddToCart = (course: any) => {
    // Kiểm tra đăng nhập
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      const shouldLogin = window.confirm(
        "Bạn cần đăng nhập để thêm khóa học vào giỏ hàng.\n\nBạn có muốn đăng nhập ngay bây giờ?"
      );
      
      if (shouldLogin) {
        navigate(`/login?redirect=/courses&courseId=${course.id}`);
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
    
    setRecentlyAdded(course.id);
    
    // Reset feedback sau 3 giây
    setTimeout(() => {
      setRecentlyAdded(null);
    }, 3000);
  };

  const calculateDiscount = (course: any) => {
    if (course.originalPrice > course.price) {
      return Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);
    }
    return 0;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Danh sách khóa học</h1>
          <p className="text-gray-600">
            Khám phá {filteredCourses.length} khóa học chất lượng từ các chuyên gia hàng đầu
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm theo tên khóa học..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </div>

            {/* Category */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 appearance-none bg-white"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setPage(1);
                }}
              >
                <option value="All">Tất cả danh mục</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 appearance-none bg-white"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="students">Phổ biến nhất</option>
                <option value="rating">Đánh giá cao</option>
                <option value="price-asc">Giá thấp → cao</option>
                <option value="price-desc">Giá cao → thấp</option>
              </select>
            </div>

            {/* Result Count */}
            <div className="flex items-center justify-center">
              <span className="text-gray-600">
                <span className="font-semibold">{filteredCourses.length}</span> khóa học
              </span>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedCourses.map((course) => {
            const isInCart = cartItems.some(item => item.id === course.id);
            const isRecentlyAdded = recentlyAdded === course.id;
            const discount = calculateDiscount(course);
            
            return (
              <div
                key={course.id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Image with Badge */}
                <div className="relative">
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
                  {discount > 0 && (
                    <span className="absolute top-3 right-3 bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      -{discount}%
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 flex-1">
                  {/* Category */}
                  <div className="mb-2">
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {course.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">
                    <Link 
                      to={`/courses/${course.id}`}
                      className="text-gray-900 hover:text-emerald-600 transition-colors"
                    >
                      {course.title}
                    </Link>
                  </h3>

                  {/* Instructor */}
                  <p className="text-sm text-gray-600 mb-3">
                    Giảng viên: {course.instructor}
                  </p>

                  {/* Rating and Students */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="font-medium">{course.rating.toFixed(1)}</span>
                      <span className="text-gray-500 text-sm ml-1">
                        ({course.students.toLocaleString()})
                      </span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-emerald-600">
                        {course.price.toLocaleString()}₫
                      </span>
                      {course.originalPrice > course.price && (
                        <span className="line-through text-gray-400 text-sm">
                          {course.originalPrice.toLocaleString()}₫
                        </span>
                      )}
                    </div>
                    {discount > 0 && (
                      <div className="text-xs text-rose-600 font-medium">
                        Tiết kiệm {(course.originalPrice - course.price).toLocaleString()}₫
                      </div>
                    )}
                  </div>
                </div>

                {/* Buttons */}
                <div className="p-4 pt-0 flex gap-2">
                  <Link
                    to={`/courses/${course.id}`}
                    className="flex-1 text-center border border-emerald-600 text-emerald-600 py-2 rounded-lg hover:bg-emerald-50 transition-colors font-medium"
                  >
                    Xem chi tiết
                  </Link>
                  
                  <button
                    onClick={() => handleAddToCart(course)}
                    disabled={isInCart}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-colors font-medium ${
                      isInCart
                        ? "bg-emerald-100 text-emerald-700 cursor-not-allowed"
                        : isRecentlyAdded
                        ? "bg-green-100 text-green-700"
                        : "bg-emerald-600 hover:bg-emerald-700 text-white"
                    }`}
                  >
                    {isInCart ? (
                      <>
                        <CheckCircle className="h-4 w-4" />
                        Đã thêm
                      </>
                    ) : isRecentlyAdded ? (
                      <>
                        <CheckCircle className="h-4 w-4" />
                        Đã thêm!
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="h-4 w-4" />
                        Thêm vào giỏ
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy khóa học</h3>
            <p className="text-gray-600 mb-6">
              Không có khóa học nào phù hợp với tiêu chí tìm kiếm của bạn.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
                setPage(1);
              }}
              className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Xóa bộ lọc
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10">
            <div className="flex items-center gap-2">
              {/* Previous Button */}
              <button
                onClick={() => setPage(prev => Math.max(1, prev - 1))}
                disabled={page === 1}
                className={`px-4 py-2 rounded-lg border ${
                  page === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white hover:bg-gray-100 text-gray-700"
                }`}
              >
                ←
              </button>

              {/* Page Numbers */}
              {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (page <= 3) {
                  pageNum = i + 1;
                } else if (page >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = page - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`px-4 py-2 rounded-lg border ${
                      page === pageNum
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "bg-white hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {/* Next Button */}
              <button
                onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
                disabled={page === totalPages}
                className={`px-4 py-2 rounded-lg border ${
                  page === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white hover:bg-gray-100 text-gray-700"
                }`}
              >
                →
              </button>
            </div>
          </div>
        )}

        {/* Categories Info */}
        <div className="mt-12 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-6">🎯 Chọn khóa học phù hợp với bạn</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg">
              <h4 className="font-medium text-emerald-700 mb-2">💻 Lập Trình</h4>
              <p className="text-sm text-gray-600">
                Học lập trình từ cơ bản đến nâng cao, xây dựng sự nghiệp trong ngành công nghệ.
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg">
              <h4 className="font-medium text-emerald-700 mb-2">🎨 Thiết Kế</h4>
              <p className="text-sm text-gray-600">
                Phát triển kỹ năng thiết kế đồ họa, UI/UX, tạo ra sản phẩm đẹp mắt và trải nghiệm tốt.
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg">
              <h4 className="font-medium text-emerald-700 mb-2">📢 Marketing</h4>
              <p className="text-sm text-gray-600">
                Chiến lược marketing digital, quảng cáo, SEO và phát triển thương hiệu.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;