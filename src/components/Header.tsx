import { Link, useLocation, useNavigate } from "react-router";
import { useState, useEffect, useRef } from "react";
import { Search, Menu, X, ShoppingCart, User, ChevronDown, LogOut, Clock } from "lucide-react";
import { useCartStore } from "../stores/cartStore";
import { useAuthStore } from "../stores/authStore";
import { courses } from "../data/courses";
import { generateCourseImage } from "../utils/imageGenerator";

function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<any[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  
  const location = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  // ✅ LẤY DỮ LIỆU TỪ ZUSTAND STORES
  const cartItems = useCartStore((state) => state.cartItems);
  const { user, logout } = useAuthStore();
  
  // ✅ TÍNH CART COUNT TỪ CART ITEMS
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Lấy recent searches từ localStorage
  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      try {
        setRecentSearches(JSON.parse(savedSearches));
      } catch (error) {
        console.error("Error parsing recent searches:", error);
      }
    }
  }, []);

  // Lấy search query từ URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    if (searchParam && location.pathname === '/courses') {
      const decodedSearch = decodeURIComponent(searchParam);
      setSearchQuery(decodedSearch);
      
      if (decodedSearch.trim()) {
        addToRecentSearches(decodedSearch.trim());
      }
    }
  }, [location]);

  // Track scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (showUserDropdown && !(e.target as Element).closest('.user-dropdown')) {
        setShowUserDropdown(false);
      }
      if (showSearchSuggestions && searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearchSuggestions(false);
      }
    };
    
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showUserDropdown, showSearchSuggestions]);

  // Generate search suggestions
  useEffect(() => {
    if (searchQuery.trim() && !showSearchSuggestions) {
      setShowSearchSuggestions(true);
    }

    if (searchQuery.trim()) {
      const filtered = courses
        .filter(course => 
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5);
      
      setSearchSuggestions(filtered);
    } else {
      setSearchSuggestions([]);
    }
  }, [searchQuery]);

  const addToRecentSearches = (query: string) => {
    if (!query.trim()) return;
    
    const newSearches = [
      query,
      ...recentSearches.filter(s => s.toLowerCase() !== query.toLowerCase())
    ].slice(0, 5);
    
    setRecentSearches(newSearches);
    localStorage.setItem('recentSearches', JSON.stringify(newSearches));
  };

  // ✅ SỬA HANDLE LOGOUT DÙNG LOGOUT TỪ AUTHSTORE
  const handleLogout = () => {
    logout(); // Dùng hàm logout từ authStore
    setShowUserDropdown(false);
    setOpenMenu(false);
    navigate("/login");
    alert("Đã đăng xuất thành công!");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      addToRecentSearches(searchQuery.trim());
      navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
      setShowSearchSuggestions(false);
    } else {
      navigate('/courses');
    }
  };

  const handleQuickSearch = (query: string) => {
    setSearchQuery(query);
    addToRecentSearches(query);
    navigate(`/courses?search=${encodeURIComponent(query)}`);
    setShowSearchSuggestions(false);
  };

  const handleCourseClick = (courseId: number) => {
    navigate(`/courses/${courseId}`);
    setShowSearchSuggestions(false);
  };

  const handleClearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  const navItems = [
    { path: "/", label: "Trang chủ" },
    { path: "/courses", label: "Khóa học" },
    { path: "/my-courses", label: "Khóa học của tôi" },
    { path: "/blog", label: "Blog" },
    { path: "/contact", label: "Liên hệ" },
  ];

  const getUserInitial = () => {
    if (!user || !user.fullName) return "U";
    return user.fullName.charAt(0).toUpperCase();
  };

  return (
    <>
      {/* HEADER */}
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100" 
            : "bg-white border-b"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Left: Hamburger + Logo */}
            <div className="flex items-center gap-4">
              <button
                className="md:hidden"
                onClick={() => setOpenMenu(true)}
                aria-label="Menu"
              >
                <Menu size={26} className="text-gray-700 hover:text-emerald-600" />
              </button>

              <Link to="/" className="flex items-center gap-2">
                <div className="h-10 w-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">EC</span>
                </div>
                <div className="hidden sm:block">
                  <div className="text-xl font-bold text-emerald-700 tracking-tight">
                    Edu<span className="text-emerald-900">Course</span>
                  </div>
                  <div className="text-xs text-gray-500 -mt-1">Học tập thông minh</div>
                </div>
              </Link>
            </div>

            {/* Menu desktop */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-lg transition-all text-sm ${
                    location.pathname === item.path
                      ? "bg-emerald-50 text-emerald-700 font-semibold"
                      : "text-gray-700 hover:text-emerald-700 hover:bg-emerald-50"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Search desktop with suggestions */}
            <div className="hidden lg:flex items-center flex-1 max-w-md mx-4">
              <div ref={searchRef} className="relative w-full">
                <form onSubmit={handleSearch}>
                  <div className="flex items-center border border-gray-300 rounded-full px-4 py-2.5 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-200 transition-all">
                    <Search size={18} className="text-gray-500" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setShowSearchSuggestions(true)}
                      placeholder="Tìm khóa học, giảng viên..."
                      className="ml-3 outline-none text-sm w-full bg-transparent"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        className="ml-2 text-gray-400 hover:text-gray-600"
                      >
                        <X size={16} />
                      </button>
                    )}
                    <button
                      type="submit"
                      className="ml-2 p-1.5 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors"
                      title="Tìm kiếm khóa học"
                    >
                      <Search size={14} />
                    </button>
                  </div>
                </form>

                {/* Search Suggestions Dropdown */}
                {showSearchSuggestions && (searchQuery || recentSearches.length > 0) && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border overflow-hidden z-50">
                    {searchQuery ? (
                      <>
                        {searchSuggestions.length > 0 ? (
                          <>
                            <div className="px-4 py-2 border-b bg-gray-50">
                              <p className="text-xs font-medium text-gray-600">KẾT QUẢ TÌM KIẾM</p>
                            </div>
                            <div className="max-h-80 overflow-y-auto">
                              {searchSuggestions.map(course => (
                                <div
                                  key={course.id}
                                  className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                                  onClick={() => handleCourseClick(course.id)}
                                >
                                  <div className="h-10 w-10 rounded-lg overflow-hidden flex-shrink-0 mr-3">
                                    <img 
                                      src={generateCourseImage(course.image)} 
                                      alt={course.title}
                                      className="h-full w-full object-cover"
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium text-sm text-gray-900 line-clamp-1">
                                      {course.title}
                                    </p>
                                    <div className="flex items-center mt-1">
                                      <span className="text-xs text-gray-500">{course.instructor}</span>
                                      <span className="mx-2 text-gray-300">•</span>
                                      <span className="text-xs text-gray-500">{course.category}</span>
                                    </div>
                                  </div>
                                  <div className="text-right ml-2">
                                    <div className="text-sm font-semibold text-emerald-600">
                                      {course.price.toLocaleString()}₫
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      {course.students?.toLocaleString() || 0} học viên
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="border-t">
                              <button
                                onClick={() => handleQuickSearch(searchQuery)}
                                className="w-full p-3 text-emerald-600 hover:bg-emerald-50 font-medium text-sm text-center"
                              >
                                <Search size={14} className="inline mr-2" />
                                Xem tất cả kết quả cho "{searchQuery}"
                              </button>
                            </div>
                          </>
                        ) : (
                          <div className="p-6 text-center">
                            <Search size={32} className="text-gray-400 mx-auto mb-3" />
                            <p className="text-gray-600 font-medium">Không tìm thấy kết quả</p>
                            <p className="text-sm text-gray-500 mt-1">
                              Không có khóa học nào phù hợp với "{searchQuery}"
                            </p>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="px-4 py-2 border-b bg-gray-50">
                          <div className="flex justify-between items-center">
                            <p className="text-xs font-medium text-gray-600">TÌM KIẾM GẦN ĐÂY</p>
                            {recentSearches.length > 0 && (
                              <button
                                onClick={handleClearRecentSearches}
                                className="text-xs text-gray-500 hover:text-gray-700"
                              >
                                Xóa tất cả
                              </button>
                            )}
                          </div>
                        </div>
                        {recentSearches.length > 0 ? (
                          <div className="py-2">
                            {recentSearches.map((search, index) => (
                              <button
                                key={index}
                                onClick={() => handleQuickSearch(search)}
                                className="flex items-center w-full p-3 hover:bg-gray-50 text-left"
                              >
                                <Clock size={16} className="text-gray-400 mr-3" />
                                <span className="text-sm text-gray-700">{search}</span>
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div className="p-6 text-center">
                            <Clock size={24} className="text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">Chưa có tìm kiếm gần đây</p>
                          </div>
                        )}
                        <div className="px-4 py-2 border-t border-b bg-gray-50">
                          <p className="text-xs font-medium text-gray-600">TÌM KIẾM PHỔ BIẾN</p>
                        </div>
                        <div className="p-3">
                          <div className="flex flex-wrap gap-2">
                            {['React', 'JavaScript', 'Python', 'Marketing', 'Thiết kế'].map((term, index) => (
                              <button
                                key={index}
                                onClick={() => handleQuickSearch(term)}
                                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors"
                              >
                                {term}
                              </button>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-2 md:gap-3">
              <button 
                className="lg:hidden p-2 text-gray-600 hover:text-emerald-600"
                onClick={() => navigate('/courses')}
                title="Tìm kiếm khóa học"
              >
                <Search size={20} />
              </button>

              <Link to="/cart" className="relative p-2 text-gray-600 hover:text-emerald-600 transition-colors">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 h-5 w-5 bg-emerald-600 text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </Link>

              {!user ? (
                <div className="hidden md:flex items-center gap-2">
                  <Link to="/login" className="px-3 py-2 text-emerald-700 hover:text-emerald-800 font-medium transition-colors text-sm">
                    Đăng nhập
                  </Link>
                  <Link
                    to="/register"
                    className="px-3 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-full hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-md hover:shadow-lg font-medium text-sm"
                  >
                    Đăng ký
                  </Link>
                </div>
              ) : (
                <div className="relative user-dropdown">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowUserDropdown(!showUserDropdown);
                    }}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                      <span className="text-white text-xs font-semibold">
                        {getUserInitial()}
                      </span>
                    </div>
                    <ChevronDown 
                      size={14} 
                      className={`transition-transform ${showUserDropdown ? "rotate-180" : ""}`}
                    />
                  </button>
                  
                  {showUserDropdown && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border py-2 z-50">
                      <div className="px-4 py-3 border-b">
                        <p className="font-semibold text-sm text-gray-900">{user.fullName}</p>
                        <p className="text-xs text-gray-500 mt-1">{user.email}</p>
                        <div className="mt-2 flex items-center">
                          <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full">
                            {user.role === "student" ? "Học viên" : user.role || "Học viên"}
                          </span>
                        </div>
                      </div>
                      <Link 
                        to="/profile" 
                        className="flex items-center px-4 py-3 hover:bg-gray-50 text-sm text-gray-700"
                        onClick={() => setShowUserDropdown(false)}
                      >
                        <User size={16} className="mr-3" />
                        Hồ sơ của tôi
                      </Link>
                      <Link 
                        to="/my-courses" 
                        className="flex items-center px-4 py-3 hover:bg-gray-50 text-sm text-gray-700"
                        onClick={() => setShowUserDropdown(false)}
                      >
                        <span className="mr-3">📚</span>
                        Khóa học của tôi
                      </Link>
                      <Link 
                        to="/cart" 
                        className="flex items-center px-4 py-3 hover:bg-gray-50 text-sm text-gray-700"
                        onClick={() => setShowUserDropdown(false)}
                      >
                        <ShoppingCart size={16} className="mr-3" />
                        Giỏ hàng ({cartCount})
                      </Link>
                      <div className="border-t mt-2 pt-2">
                        <button 
                          onClick={handleLogout}
                          className="flex items-center w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 text-sm"
                        >
                          <LogOut size={16} className="mr-3" />
                          Đăng xuất
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {!user && (
                <Link
                  to="/login"
                  className="md:hidden px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm"
                >
                  <User size={16} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* OVERLAY */}
      {openMenu && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setOpenMenu(false)}
        />
      )}

      {/* SIDEBAR MENU */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white z-50 shadow-2xl
        transform transition-transform duration-300 ease-in-out
        ${openMenu ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-6 border-b">
          <Link to="/" onClick={() => setOpenMenu(false)} className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">EC</span>
            </div>
            <div>
              <div className="text-xl font-bold text-emerald-700">EduCourse</div>
              <div className="text-xs text-gray-500">Học tập thông minh</div>
            </div>
          </Link>
          <button onClick={() => setOpenMenu(false)} className="p-2 hover:bg-gray-100 rounded-lg">
            <X size={24} className="text-gray-700" />
          </button>
        </div>

        <div className="p-6 border-b">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm khóa học..."
                className="w-full px-4 py-3 pl-10 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
              <Search size={20} className="absolute left-3 top-3.5 text-gray-400" />
            </div>
          </form>
        </div>

        <div className="p-4">
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpenMenu(false)}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? "bg-emerald-50 text-emerald-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t">
            <h3 className="px-4 text-sm font-semibold text-gray-500 mb-3">TÀI KHOẢN</h3>
            {!user ? (
              <div className="space-y-2">
                <Link
                  to="/login"
                  onClick={() => setOpenMenu(false)}
                  className="block px-4 py-3 rounded-lg border border-emerald-600 text-emerald-600 text-center hover:bg-emerald-50 font-medium"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  onClick={() => setOpenMenu(false)}
                  className="block px-4 py-3 rounded-lg bg-emerald-600 text-white text-center hover:bg-emerald-700 font-medium"
                >
                  Đăng ký tài khoản
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                <Link
                  to="/profile"
                  onClick={() => setOpenMenu(false)}
                  className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-50"
                >
                  <User className="h-4 w-4 mr-3" />
                  Hồ sơ của tôi
                </Link>
                <Link
                  to="/my-courses"
                  onClick={() => setOpenMenu(false)}
                  className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-50"
                >
                  <span className="mr-3">📚</span>
                  Khóa học của tôi
                </Link>
                <Link
                  to="/cart"
                  onClick={() => setOpenMenu(false)}
                  className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-50"
                >
                  <ShoppingCart className="h-4 w-4 mr-3" />
                  Giỏ hàng ({cartCount})
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setOpenMenu(false);
                  }}
                  className="w-full text-left px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 flex items-center"
                >
                  <span className="mr-3">🚪</span>
                  Đăng xuất
                </button>
              </div>
            )}
          </div>

          <div className="mt-8 px-4">
            <p className="text-sm text-gray-500 mb-2">📞 Hotline: 1900 1234</p>
            <p className="text-sm text-gray-500">✉️ support@educourse.vn</p>
          </div>
        </div>
      </div>
    </>
  );
}
export default Header;