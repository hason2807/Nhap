import { Link, useLocation, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { Search, Menu, X, ShoppingCart, User, ChevronDown, } from "lucide-react";

function Header() {
  const [user, setUser] = useState<any>(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const cartCount = 3;

  // Check if user is logged in on component mount and route changes
  useEffect(() => {
    const checkLoggedInUser = () => {
      const loggedInUser = localStorage.getItem('loggedInUser');
      if (loggedInUser) {
        setUser(JSON.parse(loggedInUser));
      } else {
        setUser(null);
      }
    };

    checkLoggedInUser();
    
    // Listen for storage changes (for logout from other tabs/windows)
    const handleStorageChange = () => {
      checkLoggedInUser();
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [location]); // Re-run when location changes

  // Track scroll for header shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowUserDropdown(false);
    };
    if (showUserDropdown) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [showUserDropdown]);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setUser(null);
    setShowUserDropdown(false);
    setOpenMenu(false);
    navigate("/login");
    alert("Đã đăng xuất thành công!");
  };

  const navItems = [
    { path: "/", label: "Trang chủ" },
    { path: "/courses", label: "Khóa học" },
    { path: "/my-courses", label: "Khóa học của tôi" },
    { path: "/blog", label: "Blog" },
    { path: "/contact", label: "Liên hệ" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Get user's first name or display name
  const getUserDisplayName = () => {
    if (!user || !user.fullName) return "Người dùng";
    
    // Lấy tên đầu tiên từ fullName
    const names = user.fullName.split(' ');
    return names[names.length - 1]; // Lấy họ (hoặc tên cuối cùng)
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
              {/* Hamburger (mobile) */}
              <button
                className="md:hidden"
                onClick={() => setOpenMenu(true)}
                aria-label="Menu"
              >
                <Menu size={26} className="text-gray-700 hover:text-emerald-600" />
              </button>

              {/* Logo */}
              <Link
                to="/"
                className="flex items-center gap-2"
              >
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

            {/* Search desktop */}
            <div className="hidden lg:flex items-center flex-1 max-w-md mx-4">
              <form onSubmit={handleSearch} className="relative w-full">
                <div className="flex items-center border border-gray-300 rounded-full px-4 py-2.5 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-200 transition-all">
                  <Search size={18} className="text-gray-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
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
                </div>
              </form>
            </div>

            {/* Right */}
            <div className="flex items-center gap-2 md:gap-3">
              {/* Search mobile */}
              <button className="lg:hidden p-2 text-gray-600 hover:text-emerald-600">
                <Search size={20} />
              </button>
              {/* Cart */}
              <Link 
                to="/cart" 
                className="relative p-2 text-gray-600 hover:text-emerald-600 transition-colors"
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 h-5 w-5 bg-emerald-600 text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {cartCount}
                  </span>
                )}
              </Link>
              {/* User/Auth */}
              {!user ? (
                <div className="hidden md:flex items-center gap-2">
                  <Link 
                    to="/login" 
                    className="px-3 py-2 text-emerald-700 hover:text-emerald-800 font-medium transition-colors text-sm"
                  >
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
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowUserDropdown(!showUserDropdown);
                    }}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                      <span className="text-white text-xs font-semibold">
                        {getUserDisplayName().charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <ChevronDown 
                      size={14} 
                      className={`transition-transform ${showUserDropdown ? "rotate-180" : ""}`}
                    />
                  </button>
                  
                  {/* User dropdown */}
                  {showUserDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border py-2 z-50">
                      <div className="px-4 py-3 border-b">
                        <p className="font-semibold text-sm">{user.fullName}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      <Link 
                        to="/profile" 
                        className="block px-4 py-2 hover:bg-gray-50 text-sm"
                        onClick={() => setShowUserDropdown(false)}
                      >
                        Hồ sơ của tôi
                      </Link>
                      <Link 
                        to="/my-courses" 
                        className="block px-4 py-2 hover:bg-gray-50 text-sm"
                        onClick={() => setShowUserDropdown(false)}
                      >
                        Khóa học của tôi
                      </Link>
                      <Link 
                        to="/settings" 
                        className="block px-4 py-2 hover:bg-gray-50 text-sm"
                        onClick={() => setShowUserDropdown(false)}
                      >
                        Cài đặt
                      </Link>
                      <div className="border-t mt-2 pt-2">
                        <button 
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 text-sm"
                        >
                          Đăng xuất
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Auth mobile */}
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
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <Link 
            to="/" 
            onClick={() => setOpenMenu(false)}
            className="flex items-center gap-3"
          >
            <div className="h-10 w-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">EC</span>
            </div>
            <div>
              <div className="text-xl font-bold text-emerald-700">EduCourse</div>
              <div className="text-xs text-gray-500">Học tập thông minh</div>
            </div>
          </Link>
          <button 
            onClick={() => setOpenMenu(false)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X size={24} className="text-gray-700" />
          </button>
        </div>

        {/* User info in mobile menu */}
        {user && (
          <div className="p-6 border-b bg-emerald-50">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                <span className="text-white font-semibold">
                  {getUserDisplayName().charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">{user.fullName}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>
          </div>
        )}

        {/* Search mobile */}
        <div className="p-6 border-b">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm khóa học..."
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            />
            <Search 
              size={20} 
              className="absolute right-4 top-3.5 text-gray-400" 
            />
          </form>
        </div>

        {/* Menu items */}
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

          {/* Contact info */}
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