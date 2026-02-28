import { useState, useEffect } from "react";
import { Link } from "react-router";
import { 
  Calendar, 
  User, 
  Clock, 
  Eye, 
  MessageCircle, 
  Search, 
  ChevronRight,
  BookOpen,
  TrendingUp,
  Award,
  Share2,
  Heart,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight
} from "lucide-react";
import { generateCourseImage } from "../utils/imageGenerator";

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6); // Tăng lên 6 vì grid 2 cột

  // Blog posts data (giữ nguyên)
  const blogPosts = [
    {
      id: 1,
      title: "Lộ trình trở thành Fullstack Developer trong 6 tháng",
      excerpt: "Học cách xây dựng lộ trình học tập hiệu quả để trở thành lập trình viên Fullstack chỉ trong nửa năm.",
      author: "Nguyễn Văn An",
      authorRole: "Senior Fullstack Developer",
      date: "15/01/2024",
      readTime: "8 phút đọc",
      category: "Lập Trình",
      tags: ["React", "Node.js", "Fullstack", "Lộ trình"],
      image: "react",
      views: 2456,
      comments: 42,
      likes: 156,
      featured: true,
    },
    {
      id: 2,
      title: "10 Xu hướng Digital Marketing năm 2024 không thể bỏ qua",
      excerpt: "Khám phá những xu hướng marketing mới nhất sẽ thống trị ngành trong năm tới và cách áp dụng chúng.",
      author: "Trần Thị Bình",
      authorRole: "Marketing Director",
      date: "12/01/2024",
      readTime: "6 phút đọc",
      category: "Marketing",
      tags: ["Digital Marketing", "Trends", "2024"],
      image: "marketing",
      views: 1892,
      comments: 28,
      likes: 98,
      featured: true,
    },
    {
      id: 3,
      title: "Thiết kế UI/UX cho người mới bắt đầu: Những nguyên tắc cơ bản",
      excerpt: "Tìm hiểu các nguyên tắc thiết kế cơ bản để tạo ra trải nghiệm người dùng tuyệt vời ngay từ đầu.",
      author: "Lê Hoàng Cường",
      authorRole: "Product Designer",
      date: "10/01/2024",
      readTime: "10 phút đọc",
      category: "Thiết Kế",
      tags: ["UI/UX", "Design", "Beginner"],
      image: "design",
      views: 3120,
      comments: 56,
      likes: 210,
      featured: false,
    },
    {
      id: 4,
      title: "Cách xây dựng startup thành công từ ý tưởng đến thực thi",
      excerpt: "Bài học từ những startup thành công và chiến lược để biến ý tưởng thành doanh nghiệp thực tế.",
      author: "Võ Thanh Hải",
      authorRole: "Startup Founder",
      date: "08/01/2024",
      readTime: "12 phút đọc",
      category: "Kinh Doanh",
      tags: ["Startup", "Entrepreneurship", "Business"],
      image: "business",
      views: 1876,
      comments: 34,
      likes: 145,
      featured: false,
    },
    {
      id: 5,
      title: "Bí quyết đạt IELTS 8.0: Kinh nghiệm từ giám khảo",
      excerpt: "Chia sẻ từ giám khảo IELTS với 10 năm kinh nghiệm về cách đạt điểm cao trong cả 4 kỹ năng.",
      author: "Sarah Johnson",
      authorRole: "IELTS Examiner",
      date: "05/01/2024",
      readTime: "15 phút đọc",
      category: "Ngoại Ngữ",
      tags: ["IELTS", "English", "Study Tips"],
      image: "english",
      views: 4231,
      comments: 89,
      likes: 312,
      featured: true,
    },
    {
      id: 6,
      title: "Hướng dẫn nhiếp ảnh cơ bản cho người mới bắt đầu",
      excerpt: "Tìm hiểu các nguyên tắc cơ bản của nhiếp ảnh và cách chụp những bức ảnh đẹp ngay từ chiếc máy đầu tiên.",
      author: "Nguyễn Văn Hải",
      authorRole: "Professional Photographer",
      date: "03/01/2024",
      readTime: "7 phút đọc",
      category: "Nhiếp Ảnh",
      tags: ["Photography", "Beginner", "Tips"],
      image: "photography",
      views: 1567,
      comments: 23,
      likes: 87,
      featured: false,
    },
  ];

  // Categories
  const categories = [
    { name: "Tất cả", slug: "all", count: blogPosts.length },
    { name: "Lập Trình", slug: "lập-trình", count: blogPosts.filter(post => post.category === "Lập Trình").length },
    { name: "Marketing", slug: "marketing", count: blogPosts.filter(post => post.category === "Marketing").length },
    { name: "Thiết Kế", slug: "thiết-kế", count: blogPosts.filter(post => post.category === "Thiết Kế").length },
    { name: "Kinh Doanh", slug: "kinh-doanh", count: blogPosts.filter(post => post.category === "Kinh Doanh").length },
    { name: "Ngoại Ngữ", slug: "ngoại-ngữ", count: blogPosts.filter(post => post.category === "Ngoại Ngữ").length },
    { name: "Nhiếp Ảnh", slug: "nhiếp-ảnh", count: blogPosts.filter(post => post.category === "Nhiếp Ảnh").length },
  ];

  // Featured posts
  const featuredPosts = blogPosts.filter(post => post.featured).slice(0, 3);

  // Filter posts
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === "all" || 
      post.category.toLowerCase().includes(activeCategory.toLowerCase());
    const matchesSearch = searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery, postsPerPage]);

  return (
     <>
      <title> Blog Page</title>
      <meta name="description" content="Blog Page" />
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gray-170 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 text-gray-900 sm:text-5xl">
              Blog Học Tập & Phát Triển
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Khám phá kiến thức, chia sẻ kinh nghiệm và cập nhật xu hướng mới nhất 
              trong giáo dục và phát triển kỹ năng
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm bài viết, chủ đề hoặc tác giả..."
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left - Main Content */}
          <div className="lg:col-span-2">
            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Award className="h-6 w-6 text-emerald-600" />
                    Bài Viết Nổi Bật
                  </h2>
                  <Link 
                    to="/blog/featured" 
                    className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
                  >
                    Xem tất cả
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  {featuredPosts.map((post) => (
                    <article key={post.id} className="group">
                      <Link to={`/blog/${post.id}`}>
                        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                          <div className="h-48 relative">
                            <img 
                              src={generateCourseImage(post.image)}
                              alt={post.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                            <div className="absolute top-3 left-3">
                              <span className="bg-emerald-600 text-white text-xs px-3 py-1 rounded-full">
                                {post.category}
                              </span>
                            </div>
                          </div>
                          
                          <div className="p-5">
                            <h3 className="font-bold text-lg mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
                              {post.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                              {post.excerpt}
                            </p>
                            
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <div className="flex items-center gap-2">
                                <User className="h-3 w-3" />
                                <span>{post.author}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-3 w-3" />
                                <span>{post.date}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {/* All Posts */}
            <div>
              {/* Header với bộ lọc và phân trang */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h2 className="text-2xl font-bold">Tất Cả Bài Viết</h2>
                
                <div className="flex items-center gap-4">
                  {/* Dropdown chọn số bài hiển thị */}
                  <select
                    value={postsPerPage}
                    onChange={(e) => setPostsPerPage(Number(e.target.value))}
                    className="px-3 py-2 border rounded-lg bg-white text-sm focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value={4}>4 bài / trang</option>
                    <option value={6}>6 bài / trang</option>
                    <option value={8}>8 bài / trang</option>
                    <option value={12}>12 bài / trang</option>
                  </select>
                  
                  {/* Hiển thị số lượng bài */}
                  <div className="text-sm text-gray-600">
                    {filteredPosts.length > 0 ? (
                      <>Hiển thị {indexOfFirstPost + 1}-{Math.min(indexOfLastPost, filteredPosts.length)} / {filteredPosts.length} bài</>
                    ) : (
                      <>Không có bài viết</>
                    )}
                  </div>
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((category) => (
                  <button
                    key={category.slug}
                    onClick={() => setActiveCategory(category.slug)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeCategory === category.slug
                        ? "bg-emerald-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100 border"
                    }`}
                  >
                    {category.name}
                    <span className="ml-2 text-xs opacity-75">
                      ({category.count})
                    </span>
                  </button>
                ))}
              </div>

              {/* Posts Grid - Dạng grid 2 cột */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentPosts.map((post) => (
                  <article key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <Link to={`/blog/${post.id}`}>
                      {/* Image */}
                      <div className="h-40 relative">
                        <img 
                          src={generateCourseImage(post.image)}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2">
                          <span className="bg-emerald-600 text-white text-xs px-2 py-0.5 rounded-full">
                            {post.category}
                          </span>
                        </div>
                        {post.featured && (
                          <div className="absolute top-2 right-2">
                            <span className="bg-yellow-500 text-white text-xs px-2 py-0.5 rounded-full">
                              ⭐ Nổi bật
                            </span>
                          </div>
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="p-3">
                        <h3 className="font-bold text-sm mb-1 line-clamp-2 hover:text-emerald-600">
                          {post.title}
                        </h3>
                        
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                          <User className="h-3 w-3" />
                          <span className="truncate">{post.author}</span>
                          <span>•</span>
                          <Calendar className="h-3 w-3" />
                          <span>{post.date}</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2 text-gray-500">
                            <Eye className="h-3 w-3" />
                            <span>{post.views}</span>
                            <MessageCircle className="h-3 w-3 ml-1" />
                            <span>{post.comments}</span>
                          </div>
                          <span className="text-emerald-600 font-medium">Đọc →</span>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>

              {/* No Results */}
              {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Search className="h-12 w-12 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    Không tìm thấy bài viết
                  </h3>
                  <p className="text-gray-600">
                    Không có bài viết nào phù hợp với tìm kiếm của bạn.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setActiveCategory("all");
                    }}
                    className="mt-4 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                  >
                    Xem tất cả bài viết
                  </button>
                </div>
              )}

              {/* Pagination */}
              {filteredPosts.length > 0 && totalPages > 1 && (
                <div className="mt-8 flex justify-center items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg bg-white border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronsLeft className="h-5 w-5" />
                  </button>
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg bg-white border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-4 py-2 rounded-lg ${
                        currentPage === i + 1
                          ? "bg-emerald-600 text-white"
                          : "bg-white border hover:bg-gray-50"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg bg-white border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg bg-white border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronsRight className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right - Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-emerald-600" />
                Về Blog Của Chúng Tôi
              </h3>
              <p className="text-gray-600 mb-4">
                Nơi chia sẻ kiến thức, kinh nghiệm và xu hướng mới nhất trong 
                giáo dục trực tuyến và phát triển kỹ năng.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <TrendingUp className="h-4 w-4" />
                <span>Cập nhật hàng tuần</span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 mt-8">
              <h3 className="font-bold text-lg mb-4">Bình Luận Gần Đây</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start gap-3 pb-3 border-b last:border-0">
                    <div className="h-8 w-8 bg-emerald-100 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Người dùng {i}</p>
                      <p className="text-xs text-gray-500 line-clamp-2">
                        "Bài viết rất hữu ích, cảm ơn tác giả đã chia sẻ!"
                      </p>
                      <span className="text-xs text-gray-400">2 ngày trước</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      </>
  );
};

export default BlogPage;