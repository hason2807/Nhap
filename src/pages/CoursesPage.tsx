import { useMemo, useState } from "react";
import { courses, categories } from "../data/courses";
import type { Course } from "../data/courses";
import { generateCourseImage } from "../utils/imageGenerator";
import { Link, useNavigate } from "react-router";
import { useCartStore } from "../stores/cartStore"; // ✅ Import từ stores
import { useAuthStore } from "../stores/authStore"; // ✅ Import auth store
import { ShoppingCart, CheckCircle, Star, Clock, Filter, Search } from "lucide-react";

const PAGE_SIZE = 12;

const CoursesPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("students");
  const [page, setPage] = useState(1);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000000]);
  
  // ✅ Dùng Zustand stores
  const { addToCart, cartItems } = useCartStore();
  const { isLoggedIn } = useAuthStore();
  
  const [recentlyAdded, setRecentlyAdded] = useState<number | null>(null);

  // Filter and sort courses
  const filteredCourses = useMemo(() => {
    let result = courses.filter((c) => {
      const matchSearch = c.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory =
        category === "All" || c.category === category;

      const matchPrice = c.price >= priceRange[0] && c.price <= priceRange[1];

      return matchSearch && matchCategory && matchPrice;
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
  }, [search, category, sort, priceRange]);

  // Pagination
  const totalPages = Math.ceil(filteredCourses.length / PAGE_SIZE);
  const paginatedCourses = filteredCourses.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const handleAddToCart = (course: any) => {
    // ✅ Kiểm tra đăng nhập bằng isLoggedIn từ authStore
    if (!isLoggedIn) {
      const shouldLogin = window.confirm(
        "Bạn cần đăng nhập để thêm khóa học vào giỏ hàng.\n\nBạn có muốn đăng nhập ngay bây giờ?"
      );
      
      if (shouldLogin) {
        navigate(`/login?redirect=/courses&courseId=${course.id}`);
      }
      return;
    }

    // ✅ Thêm vào giỏ hàng qua Zustand store
    addToCart({
      id: course.id,
      title: course.title,
      instructor: course.instructor,
      price: course.price,
      originalPrice: course.originalPrice,
      image: course.image,
      category: course.category,
      lessons: course.lessons,
      duration: course.duration,
      quantity: 1
    });
    
    setRecentlyAdded(course.id);
    setTimeout(() => setRecentlyAdded(null), 3000);
  };

  const calculateDiscount = (course: any) => {
    if (course.originalPrice > course.price) {
      return Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);
    }
    return 0;
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setPriceRange([0, 5000000]);
    setPage(1);
  };

  const FilterSidebar = () => (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
      <div>
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Bộ lọc tìm kiếm
        </h3>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm khóa học..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
      </div>

      {/* Categories */}
      <div>
        <h4 className="font-medium text-gray-700 mb-3">Danh mục</h4>
        <div className="space-y-2">
          <button
            onClick={() => {
              setCategory("All");
              setPage(1);
            }}
            className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
              category === "All"
                ? "bg-emerald-50 text-emerald-600 font-medium"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Tất cả danh mục
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setCategory(c.name);
                setPage(1);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                category === c.name
                  ? "bg-emerald-50 text-emerald-600 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-medium text-gray-700 mb-3">Khoảng giá</h4>
        <div className="space-y-3">
          <input
            type="range"
            min="0"
            max="5000000"
            step="100000"
            value={priceRange[1]}
            onChange={(e) => {
              setPriceRange([priceRange[0], parseInt(e.target.value)]);
              setPage(1);
            }}
            className="w-full accent-emerald-600"
          />
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">0₫</span>
            <span className="text-emerald-600 font-medium">
              {priceRange[1].toLocaleString()}₫
            </span>
          </div>
        </div>
      </div>

      {/* Sort */}
      <div>
        <h4 className="font-medium text-gray-700 mb-3">Sắp xếp theo</h4>
        <select
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="students">Phổ biến nhất</option>
          <option value="rating">Đánh giá cao</option>
          <option value="price-asc">Giá thấp → cao</option>
          <option value="price-desc">Giá cao → thấp</option>
        </select>
      </div>

      {/* Clear Filters */}
      <button
        onClick={clearFilters}
        className="w-full px-4 py-2 text-sm text-emerald-600 border border-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors"
      >
        Xóa tất cả bộ lọc
      </button>
    </div>
  );

  return (
    <>
      <title>Courses Page</title>
      <meta name="description" content="Courses Page" />
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <FilterSidebar />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                Danh sách khóa học
              </h1>
              <p className="text-gray-600">
                Tìm thấy <span className="font-semibold text-emerald-600">{filteredCourses.length}</span> khóa học phù hợp
              </p>
            </div>

            {/* Course Grid */}
            {filteredCourses.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {paginatedCourses.map((course: Course) => {
                    const isInCart = cartItems.some(item => item.id === course.id);
                    const isRecentlyAdded = recentlyAdded === course.id;
                    const discount = calculateDiscount(course);
                    
                    return (
                      <div
                        key={course.id}
                        className="bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full"
                      >
                        {/* Image with Badge */}
                        <div className="relative aspect-video">
                          <img
                            src={generateCourseImage(course.image)}
                            alt={course.title}
                            className="w-full h-full object-cover"
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
                        <div className="p-3 flex-1 flex flex-col">
                          {/* Category */}
                          <div className="mb-1">
                            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                              {course.category}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="font-bold text-sm lg:text-base mb-1 line-clamp-2 min-h-[2.5rem]">
                            <Link 
                              to={`/courses/${course.id}`}
                              className="text-gray-900 hover:text-emerald-600 transition-colors"
                            >
                              {course.title}
                            </Link>
                          </h3>

                          {/* Instructor */}
                          <p className="text-xs text-gray-600 mb-2 line-clamp-1">
                            GV: {course.instructor}
                          </p>

                          {/* Rating and Students */}
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <Star className="h-3 w-3 text-yellow-400 fill-current mr-0.5" />
                              <span className="text-xs font-medium">{course.rating.toFixed(1)}</span>
                              <span className="text-gray-500 text-xs ml-1">
                                ({course.students.toLocaleString()})
                              </span>
                            </div>
                            <div className="flex items-center text-gray-500 text-xs">
                              <Clock className="h-3 w-3 mr-0.5" />
                              <span>{course.duration}</span>
                            </div>
                          </div>

                          {/* Price */}
                          <div className="mt-auto pt-2 border-t">
                            <div className="flex items-baseline gap-1 mb-1">
                              <span className="text-base font-bold text-emerald-600">
                                {course.price.toLocaleString()}₫
                              </span>
                              {course.originalPrice > course.price && (
                                <span className="line-through text-gray-400 text-xs">
                                  {course.originalPrice.toLocaleString()}₫
                                </span>
                              )}
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-1">
                              <Link
                                to={`/courses/${course.id}`}
                                className="flex-1 text-center border border-emerald-600 text-emerald-600 py-1.5 rounded-lg hover:bg-emerald-50 transition-colors text-xs font-medium"
                              >
                                Chi tiết
                              </Link>
                              
                              <button
                                onClick={() => handleAddToCart(course)}
                                disabled={isInCart}
                                className={`flex-1 flex items-center justify-center gap-0.5 py-1.5 rounded-lg transition-colors text-xs font-medium ${
                                  isInCart
                                    ? "bg-emerald-100 text-emerald-700 cursor-not-allowed"
                                    : isRecentlyAdded
                                    ? "bg-green-100 text-green-700"
                                    : "bg-emerald-600 hover:bg-emerald-700 text-white"
                                }`}
                              >
                                {isInCart ? (
                                  <>
                                    <CheckCircle className="h-3 w-3" />
                                    <span>Đã thêm</span>
                                  </>
                                ) : isRecentlyAdded ? (
                                  <>
                                    <CheckCircle className="h-3 w-3" />
                                    <span>Đã thêm!</span>
                                  </>
                                ) : (
                                  <>
                                    <ShoppingCart className="h-3 w-3" />
                                    <span>Thêm</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-10">
                    <div className="flex items-center gap-2">
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
              </>
            ) : (
              /* Empty State */
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Không tìm thấy khóa học
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Không có khóa học nào phù hợp với tiêu chí tìm kiếm của bạn. 
                  Vui lòng thử điều chỉnh bộ lọc.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Xóa bộ lọc
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default CoursesPage;