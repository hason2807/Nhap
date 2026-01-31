import { useState } from "react";
import { Link } from "react-router";
import { 
  Calendar, 
  User, 
  Clock, 
  Tag, 
  Eye, 
  MessageCircle, 
  Search, 
  ChevronRight,
  BookOpen,
  TrendingUp,
  Award,
  Share2,
  Heart
} from "lucide-react";
import { generateCourseImage } from "../utils/imageGenerator"; // Thêm import

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // Blog posts data
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

  // Popular tags
  const popularTags = [
    "React", "Node.js", "Fullstack", "Digital Marketing", "UI/UX", 
    "Startup", "IELTS", "Photography", "Tips", "Tutorial", "Career"
  ];

  // Featured posts (first 3 featured posts)
  const featuredPosts = blogPosts.filter(post => post.featured).slice(0, 3);

  // Filter posts based on active category and search query
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === "all" || 
      post.category.toLowerCase().includes(activeCategory.toLowerCase());
    const matchesSearch = searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
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
                          {/* Image - Đã sửa */}
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
                          
                          {/* Content */}
                          <div className="p-5">
                            <h3 className="font-bold text-lg mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
                              {post.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                              {post.excerpt}
                            </p>
                            
                            {/* Meta Info */}
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
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Tất Cả Bài Viết</h2>
                <div className="text-sm text-gray-600">
                  Hiển thị {filteredPosts.length} bài viết
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

              {/* Posts Grid */}
              <div className="space-y-8">
                {filteredPosts.map((post) => (
                  <article key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="md:flex">
                      {/* Image - Đã sửa */}
                      <div className="md:w-2/5">
                        <Link to={`/blog/${post.id}`}>
                          <div className="h-48 md:h-full relative group">
                            <img 
                              src={generateCourseImage(post.image)}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            <div className="absolute top-3 left-3">
                              <span className="bg-emerald-600 text-white text-xs px-3 py-1 rounded-full">
                                {post.category}
                              </span>
                            </div>
                            {post.featured && (
                              <div className="absolute top-3 right-3">
                                <span className="bg-yellow-500 text-white text-xs px-3 py-1 rounded-full">
                                  ⭐ Nổi bật
                                </span>
                              </div>
                            )}
                          </div>
                        </Link>
                      </div>

                      {/* Content */}
                      <div className="md:w-3/5 p-6">
                        <div className="mb-4">
                          <Link to={`/blog/${post.id}`}>
                            <h3 className="text-xl font-bold mb-2 hover:text-emerald-600 transition-colors">
                              {post.title}
                            </h3>
                          </Link>
                          <p className="text-gray-600 mb-4">
                            {post.excerpt}
                          </p>
                        </div>

                        {/* Meta Info */}
                        <div className="space-y-3">
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              <span>{post.author}</span>
                              <span className="text-xs text-gray-400">({post.authorRole})</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{post.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{post.readTime}</span>
                            </div>
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>

                          {/* Stats */}
                          <div className="flex items-center justify-between pt-3 border-t">
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <Eye className="h-4 w-4" />
                                <span>{post.views.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MessageCircle className="h-4 w-4" />
                                <span>{post.comments}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Heart className="h-4 w-4" />
                                <span>{post.likes}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <Share2 className="h-4 w-4 text-gray-500" />
                              </button>
                              <Link
                                to={`/blog/${post.id}`}
                                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
                              >
                                Đọc tiếp
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
            </div>
          </div>

          {/* Right - Sidebar */}
          <div className="lg:col-span-1">
            {/* About Blog */}
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

            {/* Popular Tags */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Tag className="h-5 w-5 text-emerald-600" />
                Thẻ Phổ Biến
              </h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag, idx) => (
                  <Link
                    key={idx}
                    to={`/blog/tag/${tag.toLowerCase()}`}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-emerald-50 hover:text-emerald-700 text-gray-700 rounded-lg text-sm transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h3 className="font-bold text-lg mb-4">Danh Mục</h3>
              <div className="space-y-3">
                {categories.slice(1).map((category) => (
                  <Link
                    key={category.slug}
                    to={`/blog/category/${category.slug}`}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <span className="font-medium group-hover:text-emerald-600">
                      {category.name}
                    </span>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {category.count}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-6 text-white">
              <h3 className="font-bold text-lg mb-3">Đăng Ký Nhận Tin</h3>
              <p className="text-emerald-100 mb-4 text-sm">
                Nhận bài viết mới và cập nhật xu hướng hàng tuần
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Email của bạn"
                  className="w-full px-4 py-2 rounded-lg border-0 text-gray-900"
                />
                <button className="w-full bg-white text-emerald-600 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
                  Đăng Ký Ngay
                </button>
              </div>
              <p className="text-xs text-emerald-200 mt-3">
                Không spam. Bạn có thể hủy đăng ký bất cứ lúc nào.
              </p>
            </div>

            {/* Recent Comments */}
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
  );
};

export default BlogPage;