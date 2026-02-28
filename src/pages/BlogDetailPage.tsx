import { Link } from "react-router";
import {
  Calendar,
  User,
  Clock,
  Eye,
  MessageCircle,
  Heart,
  Share2,
  ArrowLeft,
  Facebook,
  Twitter,
  Linkedin,
  Send,
  Trash2,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { generateCourseImage } from "../utils/imageGenerator";

interface CommentType {
  id: number;
  user: string;
  content: string;
  date: string;
  isCurrentUser?: boolean;
}

const BlogDetailPage = () => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(312);
  const [comment, setComment] = useState("");

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
    `,
    author: "Nguyễn Văn An",
    authorRole: "Senior Fullstack Developer tại Google",
    authorBio:
      "Có 8 năm kinh nghiệm trong phát triển web, đã hướng dẫn hơn 1000 học viên trở thành developer chuyên nghiệp.",
    date: "15/01/2024",
    readTime: "8 phút đọc",
    category: "Lập Trình",
    tags: ["React", "Node.js", "Fullstack", "Lộ trình", "Web Development"],
    image: "react",
    views: 2456,
    featured: true,
  };

  const STORAGE_KEY = `blog_comments_${blogPost.id}`;

  const initialComments: CommentType[] = [
    {
      id: 1,
      user: "Trần Minh Đức",
      content: "Bài viết rất chi tiết và hữu ích!",
      date: "2 ngày trước",
    },
    {
      id: 2,
      user: "Phạm Thị Lan",
      content: "Cảm ơn tác giả đã chia sẻ lộ trình rõ ràng như vậy!",
      date: "3 ngày trước",
    },
    {
      id: 3,
      user: "Lê Văn Hùng",
      content: "Đang áp dụng theo lộ trình này, rất hiệu quả!",
      date: "5 ngày trước",
    },
  ];

  const [comments, setComments] = useState<CommentType[]>([]);
  const isFirstLoad = useRef(true);

  useEffect(() => {
    const savedComments = localStorage.getItem(STORAGE_KEY);

    if (savedComments) {
      try {
        setComments(JSON.parse(savedComments));
      } catch {
        setComments(initialComments);
      }
    } else {
      setComments(initialComments);
    }
  }, []);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
  }, [comments]);

  const handleLike = () => {
    setLiked(!liked);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();

    if (!comment.trim()) return;

    const newComment: CommentType = {
      id: Date.now(),
      user: "Bạn (Khách)",
      content: comment,
      date: "Vừa xong",
      isCurrentUser: true,
    };

    setComments([newComment, ...comments]);
    setComment("");
  };

  const handleDeleteComment = (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bình luận này?")) {
      setComments(comments.filter((c) => c.id !== id));
    }
  };

  const relatedPosts = [
    { id: 2, title: "10 Xu hướng Digital Marketing năm 2024", category: "Marketing", image: "marketing", readTime: "6 phút đọc" },
    { id: 3, title: "Thiết kế UI/UX cho người mới bắt đầu", category: "Thiết Kế", image: "design", readTime: "10 phút đọc" },
    { id: 4, title: "Cách xây dựng startup thành công", category: "Kinh Doanh", image: "business", readTime: "8 phút đọc" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER - WIDER */}
      <div className="bg-gradient-to-r from-emerald-600 to-blue-600 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Link to="/blog" className="inline-flex items-center text-white/90 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại Blog
          </Link>

          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-white/20 text-white rounded-full text-sm backdrop-blur-sm">
                {blogPost.category}
              </span>

              {blogPost.featured && (
                <span className="px-3 py-1 bg-yellow-500 text-white rounded-full text-sm">
                  ⭐ Bài viết nổi bật
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {blogPost.title}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="h-14 w-14 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <User className="h-7 w-7 text-white" />
              </div>

              <div>
                <div className="font-semibold text-white text-lg">{blogPost.author}</div>
                <div className="text-white/80 text-sm">{blogPost.authorRole}</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {blogPost.date}
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {blogPost.readTime}
              </div>

              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                {blogPost.views}
              </div>

              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                {comments.length}
              </div>

              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                {likes}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT - WIDER */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        
        {/* TWO COLUMN LAYOUT */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* LEFT COLUMN - MAIN CONTENT (SCROLLABLE) */}
          <div className="lg:w-2/3">
            {/* ARTICLE */}
            <article className="bg-white rounded-xl shadow-sm p-8 mb-8">

              <div className="mb-8 h-80 md:h-96 rounded-xl overflow-hidden">
                <img
                  src={generateCourseImage(blogPost.image)}
                  alt={blogPost.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div
                className="prose prose-lg max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: blogPost.content }}
              />

              {/* TAGS */}
              <div className="mt-8 pt-8 border-t flex flex-wrap gap-2">
                {blogPost.tags.map((tag) => (
                  <span key={tag} className="px-4 py-2 bg-gray-100 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg text-sm transition-colors cursor-pointer">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* ACTIONS */}
              <div className="mt-8 flex items-center justify-between pt-8 border-t">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                    liked 
                      ? "bg-red-50 text-red-600 border border-red-200" 
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  <Heart className={`h-5 w-5 ${liked ? "fill-red-500" : ""}`} />
                  Thích ({likes})
                </button>

                <div className="flex gap-2">
                  <button className="p-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                    <Facebook className="h-4 w-4" />
                  </button>
                  <button className="p-3 rounded-lg bg-sky-500 text-white hover:bg-sky-600 transition-colors">
                    <Twitter className="h-4 w-4" />
                  </button>
                  <button className="p-3 rounded-lg bg-blue-700 text-white hover:bg-blue-800 transition-colors">
                    <Linkedin className="h-4 w-4" />
                  </button>
                  <button className="p-3 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </article>

            {/* COMMENTS */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h3 className="text-xl font-bold mb-6">
                Bình luận ({comments.length})
              </h3>

              <form onSubmit={handleSubmitComment} className="mb-8">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none mb-4"
                  placeholder="Chia sẻ suy nghĩ của bạn..."
                />

                <button 
                  type="submit"
                  className="px-6 py-3 bg-emerald-600 text-white rounded-lg flex items-center gap-2 hover:bg-emerald-700 transition-colors font-medium"
                >
                  <Send className="h-4 w-4" />
                  Gửi bình luận
                </button>
              </form>

              <div className="space-y-6">
                {comments.map((item) => (
                  <div key={item.id} className="pb-6 border-b border-gray-100 last:border-0 relative group">
                    {item.isCurrentUser && (
                      <button
                        onClick={() => handleDeleteComment(item.id)}
                        className="absolute top-0 right-0 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}

                    <div className="flex gap-4">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center flex-shrink-0">
                        <User className="h-5 w-5 text-white" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-gray-900">{item.user}</h4>
                          <span className="text-xs text-gray-500">{item.date}</span>
                        </div>

                        <p className="text-gray-700 text-sm leading-relaxed">{item.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - FIXED SIDEBAR */}
          <div className="lg:w-1/3">
            <div className="space-y-8">
              {/* AUTHOR INFO - FIXED POSITION */}
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h3 className="text-lg font-bold mb-4">Về tác giả</h3>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900">{blogPost.author}</h4>
                    <p className="text-sm text-gray-600">{blogPost.authorRole}</p>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed">
                  {blogPost.authorBio}
                </p>
              </div>

              {/* RELATED POSTS - VERTICAL */}
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h3 className="text-lg font-bold mb-4">Bài Viết Liên Quan</h3>
                
                <div className="space-y-4">
                  {relatedPosts.map((post) => (
                    <Link
                      key={post.id}
                      to={`/blog/${post.id}`}
                      className="group block bg-gray-50 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex">
                        <div className="w-24 h-24 flex-shrink-0 overflow-hidden">
                          <img
                            src={generateCourseImage(post.image)}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        
                        <div className="flex-1 p-3">
                          <span className="inline-block px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full mb-1">
                            {post.category}
                          </span>
                          
                          <h4 className="font-semibold text-gray-900 text-sm leading-snug group-hover:text-emerald-600 transition-colors line-clamp-2 mb-1">
                            {post.title}
                          </h4>
                          
                          <div className="flex items-center text-xs text-gray-500">
                            <Clock className="h-3 w-3 mr-1" />
                            {post.readTime}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;