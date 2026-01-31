import { Link } from "react-router";
import { 
  Calendar, 
  User, 
  Clock, 
  Eye, 
  MessageCircle, 
  Heart, 
  Share2, 
  BookOpen,
  ArrowLeft,
  Facebook,
  Twitter,
  Linkedin,
  Send,
  ChevronRight
} from "lucide-react";
import { useState } from "react";
import { generateCourseImage } from "../utils/imageGenerator"; // Thêm import

const BlogDetailPage = () => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(312);
  const [comment, setComment] = useState("");

  // Mock blog post data
  const blogPost = {
    id: 1,
    title: "Lộ trình trở thành Fullstack Developer trong 6 tháng",
    content: `
      <p>Trong thế giới công nghệ phát triển nhanh chóng ngày nay, việc trở thành một Fullstack Developer có thể mở ra nhiều cơ hội nghề nghiệp tuyệt vời. Bài viết này sẽ hướng dẫn bạn lộ trình chi tiết để đạt được mục tiêu này chỉ trong 6 tháng.</p>
      
      <h2>Tháng 1-2: Nền tảng Web Development</h2>
      <p>Bắt đầu với HTML, CSS và JavaScript cơ bản. Tập trung vào việc xây dựng giao diện người dùng responsive và hiểu rõ về DOM manipulation.</p>
      
      <h2>Tháng 3-4: Frontend với React</h2>
      <p>Học React từ cơ bản đến nâng cao. Thực hành với Hooks, Context API, và các thư viện phổ biến như React Router, Redux.</p>
      
      <h2>Tháng 5: Backend với Node.js</h2>
      <p>Xây dựng RESTful APIs với Express.js. Học về authentication, database connection, và deployment.</p>
      
      <h2>Tháng 6: Dự án tổng hợp</h2>
      <p>Tạo một ứng dụng web hoàn chỉnh từ frontend đến backend. Đây là cơ hội để áp dụng tất cả kiến thức đã học.</p>
      
      <h3>Lời khuyên quan trọng:</h3>
      <ul>
        <li>Thực hành mỗi ngày ít nhất 2 giờ</li>
        <li>Tham gia các dự án mã nguồn mở</li>
        <li>Xây dựng portfolio cá nhân</li>
        <li>Tham gia cộng đồng developer</li>
      </ul>
    `,
    author: "Nguyễn Văn An",
    authorRole: "Senior Fullstack Developer tại Google",
    authorBio: "Có 8 năm kinh nghiệm trong phát triển web, đã hướng dẫn hơn 1000 học viên trở thành developer chuyên nghiệp.",
    date: "15/01/2024",
    readTime: "8 phút đọc",
    category: "Lập Trình",
    tags: ["React", "Node.js", "Fullstack", "Lộ trình", "Web Development"],
    image: "react",
    views: 2456,
    comments: 42,
    likes: 312,
    featured: true,
  };

  // Related posts
  const relatedPosts = [
    { id: 2, title: "10 Xu hướng Digital Marketing năm 2024", category: "Marketing", image: "marketing" },
    { id: 3, title: "Thiết kế UI/UX cho người mới bắt đầu", category: "Thiết Kế", image: "design" },
    { id: 4, title: "Cách xây dựng startup thành công", category: "Kinh Doanh", image: "business" },
  ];

  // Comments
  const comments = [
    { id: 1, user: "Trần Minh Đức", content: "Bài viết rất chi tiết và hữu ích!", date: "2 ngày trước" },
    { id: 2, user: "Phạm Thị Lan", content: "Cảm ơn tác giả đã chia sẻ lộ trình rõ ràng như vậy!", date: "3 ngày trước" },
    { id: 3, user: "Lê Văn Hùng", content: "Đang áp dụng theo lộ trình này, rất hiệu quả!", date: "5 ngày trước" },
  ];

  const handleLike = () => {
    setLiked(!liked);
    setLikes(prev => liked ? prev - 1 : prev + 1);
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      alert("Bình luận đã được gửi!");
      setComment("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-blue-600 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-white/90 hover:text-white mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại Blog
          </Link>
          
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-white/20 text-white rounded-full text-sm">
              {blogPost.category}
            </span>
            {blogPost.featured && (
              <span className="px-3 py-1 bg-yellow-500 text-white rounded-full text-sm">
                ⭐ Bài viết nổi bật
              </span>
            )}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {blogPost.title}
          </h1>
          
          {/* Author Info */}
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 bg-white/20 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="font-semibold text-white">{blogPost.author}</div>
              <div className="text-white/80 text-sm">{blogPost.authorRole}</div>
            </div>
          </div>
          
          {/* Stats */}
          <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{blogPost.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{blogPost.readTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span>{blogPost.views.toLocaleString()} lượt xem</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              <span>{blogPost.comments} bình luận</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className={`h-4 w-4 ${liked ? "fill-red-500 text-red-500" : ""}`} />
              <span>{likes.toLocaleString()} lượt thích</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Article Content */}
          <div className="lg:col-span-2">
            <article className="bg-white rounded-xl shadow-sm p-8 mb-8">
              {/* Featured Image - Đã sửa */}
              <div className="mb-8 h-64 rounded-xl overflow-hidden relative">
                <img 
                  src={generateCourseImage(blogPost.image)}
                  alt={blogPost.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              
              {/* Content */}
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: blogPost.content }}
              />
              
              {/* Tags */}
              <div className="mt-8 pt-8 border-t">
                <div className="flex flex-wrap gap-2">
                  {blogPost.tags.map((tag, idx) => (
                    <Link
                      key={idx}
                      to={`/blog/tag/${tag.toLowerCase()}`}
                      className="px-4 py-2 bg-gray-100 hover:bg-emerald-50 hover:text-emerald-700 text-gray-700 rounded-lg text-sm transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Actions */}
              <div className="mt-8 flex items-center justify-between pt-8 border-t">
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      liked 
                        ? "bg-red-50 text-red-600" 
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${liked ? "fill-red-500" : ""}`} />
                    <span>Thích ({likes})</span>
                  </button>
                  
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Facebook className="h-5 w-5 text-blue-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Twitter className="h-5 w-5 text-blue-400" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Linkedin className="h-5 w-5 text-blue-700" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Share2 className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                </div>
                
                <Link
                  to="/blog"
                  className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Xem thêm bài viết
                </Link>
              </div>
            </article>
            
            {/* Author Bio */}
            <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
              <h3 className="text-xl font-bold mb-4">Về Tác Giả</h3>
              <div className="flex items-start gap-6">
                <div className="h-20 w-20 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="h-10 w-10 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">{blogPost.author}</h4>
                  <p className="text-gray-600 mb-2">{blogPost.authorRole}</p>
                  <p className="text-gray-600">{blogPost.authorBio}</p>
                </div>
              </div>
            </div>
            
            {/* Comments Section */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h3 className="text-xl font-bold mb-6">
                Bình Luận ({blogPost.comments})
              </h3>
              
              {/* Comment Form */}
              <form onSubmit={handleSubmitComment} className="mb-8">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Chia sẻ suy nghĩ của bạn..."
                  rows={4}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 mb-4"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
                  >
                    <Send className="h-4 w-4" />
                    Gửi bình luận
                  </button>
                </div>
              </form>
              
              {/* Comments List */}
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="pb-6 border-b last:border-0">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-2">
                          <h4 className="font-semibold">{comment.user}</h4>
                          <span className="text-sm text-gray-500">{comment.date}</span>
                        </div>
                        <p className="text-gray-700">{comment.content}</p>
                        <button className="mt-2 text-sm text-emerald-600 hover:text-emerald-700">
                          Phản hồi
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Related Posts */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h3 className="font-bold text-lg mb-4">Bài Viết Liên Quan</h3>
              <div className="space-y-4">
                {relatedPosts.map((post) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.id}`}
                    className="block p-4 rounded-lg border hover:border-emerald-300 hover:bg-emerald-50 transition-colors group"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-12 w-12 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={generateCourseImage(post.image)}
                          alt={post.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs">
                            {post.category}
                          </span>
                          <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-emerald-600" />
                        </div>
                        <h4 className="font-medium text-sm group-hover:text-emerald-600 line-clamp-2">
                          {post.title}
                        </h4>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Newsletter */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white mb-8">
              <h3 className="font-bold text-lg mb-3">Đừng Bỏ Lỡ!</h3>
              <p className="text-blue-100 mb-4 text-sm">
                Đăng ký để nhận bài viết mới nhất qua email
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Email của bạn"
                  className="w-full px-4 py-2 rounded-lg border-0 text-gray-900"
                />
                <button className="w-full bg-white text-blue-600 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
                  Đăng Ký Ngay
                </button>
              </div>
            </div>
            
            {/* Popular Tags */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-lg mb-4">Thẻ Phổ Biến</h3>
              <div className="flex flex-wrap gap-2">
                {blogPost.tags.map((tag, idx) => (
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;