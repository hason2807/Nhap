import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Play, Clock, Award, BookOpen, BarChart, Calendar, Download, Search, FolderOpen, Lock, ChevronRight, Star, CheckCircle, AlertCircle } from "lucide-react";
import { getPurchasedCourses, updateCourseProgress, removePurchasedCourse, type Purchase } from "../utils/purchasesUtils";

interface Course {
  id: number;
  title: string;
  instructor: string;
  category: string;
  progress: number;
  lastAccessed: string;
  totalLessons: number;
  completedLessons: number;
  duration: string;
  purchaseDate: string;
  expiryDate: string;
  certificate: boolean;
  image: string;
  status: string;
}

const MyCoursesPage = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [myCourses, setMyCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // Kiểm tra đăng nhập và load khóa học
  useEffect(() => {
    const checkLoginAndLoadCourses = () => {
      setIsLoading(true);
      
      // Kiểm tra đăng nhập
      const currentUserStr = localStorage.getItem('currentUser');
      if (!currentUserStr) {
        setIsLoading(false);
        setCurrentUserId(null);
        return;
      }

      try {
        const currentUser = JSON.parse(currentUserStr);
        const userId = currentUser.id || currentUser.email;
        setCurrentUserId(userId);
        
        // Load khóa học đã mua từ purchasesUtils
        const purchasedCourses = getPurchasedCourses(userId);
        
        if (purchasedCourses.length > 0) {
          // Tìm thông tin chi tiết khóa học từ danh sách khóa học có sẵn
          const allCourses = JSON.parse(localStorage.getItem('courses') || '[]');
          
          // Chuyển đổi purchases thành format Course
          const courses: Course[] = purchasedCourses.map((purchase: Purchase) => {
            const courseDetails = allCourses.find((c: any) => c.id === purchase.courseId);
            
            return {
              id: purchase.courseId,
              title: purchase.title || courseDetails?.title || `Khóa học #${purchase.courseId}`,
              instructor: purchase.instructor || courseDetails?.instructor || "Giảng viên",
              category: purchase.category || courseDetails?.category || "Khác",
              progress: purchase.progress || 0,
              lastAccessed: purchase.lastAccessed 
                ? new Date(purchase.lastAccessed).toLocaleDateString('vi-VN') 
                : new Date().toLocaleDateString('vi-VN'),
              totalLessons: purchase.totalLessons || courseDetails?.lessons || 10,
              completedLessons: purchase.completedLessons || 0,
              duration: purchase.duration || courseDetails?.duration || "2 giờ",
              purchaseDate: purchase.purchaseDate 
                ? new Date(purchase.purchaseDate).toLocaleDateString('vi-VN') 
                : new Date().toLocaleDateString('vi-VN'),
              expiryDate: purchase.expiryDate 
                ? new Date(purchase.expiryDate).toLocaleDateString('vi-VN') 
                : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString('vi-VN'),
              certificate: purchase.certificate || false,
              image: purchase.image || courseDetails?.image || "general",
              status: purchase.progress === 100 ? "completed" : 
                      purchase.progress > 0 ? "in-progress" : "not-started"
            };
          });

          // Lọc trùng lặp - chỉ giữ 1 bản ghi cho mỗi khóa học
          const uniqueCourses = Array.from(
            new Map(courses.map(course => [course.id, course])).values()
          );
          
          setMyCourses(uniqueCourses);
        } else {
          setMyCourses([]);
        }
      } catch (error) {
        console.error("Error loading courses:", error);
        setMyCourses([]);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginAndLoadCourses();
    window.addEventListener('storage', checkLoginAndLoadCourses);
    return () => window.removeEventListener('storage', checkLoginAndLoadCourses);
  }, []);

  // Lọc khóa học theo trạng thái
  const filteredCourses = myCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === "all") return matchesSearch;
    if (activeFilter === "in-progress") return matchesSearch && course.progress > 0 && course.progress < 100;
    if (activeFilter === "completed") return matchesSearch && course.progress === 100;
    if (activeFilter === "not-started") return matchesSearch && course.progress === 0;
    
    return matchesSearch;
  });

  // Tính tổng số khóa học
  const totalCourses = myCourses.length;
  const inProgressCourses = myCourses.filter(c => c.progress > 0 && c.progress < 100).length;
  const completedCourses = myCourses.filter(c => c.progress === 100).length;
  const notStartedCourses = myCourses.filter(c => c.progress === 0).length;

  // Hàm tiếp tục học
  const continueLearning = (courseId: number) => {
    if (!currentUserId) return;
    
    // Cập nhật lastAccessed và tăng progress
    const updatedCourses = myCourses.map(course => {
      if (course.id === courseId) {
        let newProgress = course.progress;
        let newCompletedLessons = course.completedLessons;
        
        if (course.progress < 100) {
          newProgress = Math.min(course.progress + 10, 100);
          newCompletedLessons = Math.min(
            course.completedLessons + 1, 
            course.totalLessons
          );
        }
        
        // Cập nhật trong localStorage
        updateCourseProgress(
          courseId, 
          currentUserId, 
          newProgress, 
          newCompletedLessons
        );
        
        return {
          ...course,
          progress: newProgress,
          completedLessons: newCompletedLessons,
          lastAccessed: new Date().toLocaleDateString('vi-VN'),
          status: newProgress === 100 ? "completed" : 
                 newProgress > 0 ? "in-progress" : "not-started"
        };
      }
      return course;
    });
    
    setMyCourses(updatedCourses);
    
    // Chuyển đến trang học
    alert(`Bắt đầu học khóa học #${courseId}\nTiến độ: ${updatedCourses.find(c => c.id === courseId)?.progress}%\n(Tính năng học online đang phát triển)`);
  };

  // Hàm xem chứng chỉ
  const viewCertificate = (courseId: number) => {
    const course = myCourses.find(c => c.id === courseId);
    if (course?.progress === 100) {
      alert(`🎉 CHỨNG CHỈ HOÀN THÀNH KHÓA HỌC\n\nKhóa học: ${course.title}\nHọc viên: ${currentUserId}\nNgày hoàn thành: ${course.lastAccessed}\n\nChứng chỉ đã được cấp thành công!`);
    } else {
      alert(`Bạn cần hoàn thành 100% khóa học để nhận chứng chỉ.\nHiện tại: ${course?.progress}%`);
    }
  };

  // Hàm tải tài liệu
  const downloadMaterials = (courseId: number) => {
    const course = myCourses.find(c => c.id === courseId);
    alert(`📥 Đang tải tài liệu khóa học:\n\n${course?.title}\n\nTài liệu sẽ được tải xuống trong giây lát...`);
  };

  // Hàm xóa khóa học
  const removeCourse = (courseId: number) => {
    if (!currentUserId) return;
    
    if (window.confirm("Bạn có chắc muốn xóa khóa học này khỏi danh sách của bạn?")) {
      // Xóa khỏi localStorage
      const success = removePurchasedCourse(courseId, currentUserId);
      
      if (success) {
        // Xóa khỏi state
        setMyCourses(prev => prev.filter(course => course.id !== courseId));
        alert("Đã xóa khóa học khỏi danh sách của bạn.");
      } else {
        alert("Không thể xóa khóa học. Vui lòng thử lại.");
      }
    }
  };

  // Kiểm tra nếu chưa đăng nhập
  if (!currentUserId) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mx-auto h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center mb-6">
              <Lock className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Vui lòng đăng nhập</h2>
            <p className="text-gray-600 mb-8">
              Bạn cần đăng nhập để xem khóa học của mình
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login?redirect=/my-courses"
                className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-8 py-3 text-lg font-semibold text-white hover:bg-emerald-700 transition-colors"
              >
                Đăng nhập ngay
              </Link>
              <Link
                to="/courses"
                className="inline-flex items-center justify-center rounded-lg border border-emerald-600 px-8 py-3 text-lg font-semibold text-emerald-600 hover:bg-emerald-50 transition-colors"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Khám phá khóa học
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="h-10 w-10 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Đang tải khóa học của bạn...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (myCourses.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mx-auto h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center mb-6">
              <FolderOpen className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Chưa có khóa học nào</h2>
            <p className="text-gray-600 mb-8">
              Bạn chưa mua khóa học nào. Hãy khám phá các khóa học và bắt đầu học tập ngay!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/courses"
                className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-8 py-3 text-lg font-semibold text-white hover:bg-emerald-700 transition-colors"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Khám phá khóa học
              </Link>
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-lg border border-gray-600 px-8 py-3 text-lg font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                ← Quay lại trang chủ
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Khóa học của tôi</h1>
              <p className="text-gray-600">
                Quản lý và tiếp tục học các khóa học bạn đã mua
              </p>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-emerald-500" />
              <span className="text-sm text-gray-600">
                {myCourses.length} khóa học duy nhất
              </span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Tổng số khóa học</p>
                <p className="text-2xl font-bold">{totalCourses}</p>
              </div>
              <BookOpen className="h-8 w-8 text-emerald-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Đang học</p>
                <p className="text-2xl font-bold">{inProgressCourses}</p>
              </div>
              <BarChart className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Đã hoàn thành</p>
                <p className="text-2xl font-bold">{completedCourses}</p>
              </div>
              <Award className="h-8 w-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Chưa bắt đầu</p>
                <p className="text-2xl font-bold">{notStartedCourses}</p>
              </div>
              <Clock className="h-8 w-8 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Warning về trùng lặp */}
        {myCourses.length > 0 && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-blue-800">Không trùng lặp khóa học</p>
                <p className="text-sm text-blue-700">
                  Hệ thống tự động ngăn chặn mua cùng một khóa học nhiều lần. 
                  Mỗi khóa học chỉ xuất hiện một lần trong danh sách của bạn.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === "all"
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Tất cả ({totalCourses})
              </button>
              <button
                onClick={() => setActiveFilter("in-progress")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === "in-progress"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Đang học ({inProgressCourses})
              </button>
              <button
                onClick={() => setActiveFilter("completed")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === "completed"
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Đã hoàn thành ({completedCourses})
              </button>
              <button
                onClick={() => setActiveFilter("not-started")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === "not-started"
                    ? "bg-gray-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Chưa bắt đầu ({notStartedCourses})
              </button>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm khóa học..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg w-full md:w-64 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              {/* Course Header */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                        {course.category}
                      </span>
                      {course.certificate && (
                        <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs rounded flex items-center">
                          <Award className="h-3 w-3 mr-1" />
                          Có chứng chỉ
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-lg mb-1">{course.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">Giảng viên: {course.instructor}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500 mb-1">Mua ngày</div>
                    <div className="font-medium">{course.purchaseDate}</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Tiến độ học tập</span>
                    <span className="font-medium">{course.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        course.progress === 100 ? 'bg-green-500' : 
                        course.progress > 0 ? 'bg-blue-500' : 'bg-gray-300'
                      }`}
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {course.completedLessons}/{course.totalLessons} bài học • {course.duration}
                  </div>
                </div>

                {/* Course Info */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2" />
                    <span>{course.totalLessons} bài học</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Truy cập: {course.lastAccessed}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => continueLearning(course.id)}
                    className="flex-1 bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Play className="h-4 w-4" />
                    {course.progress === 0 ? 'Bắt đầu học' : 'Tiếp tục học'}
                  </button>
                  
                  {course.progress === 100 && (
                    <button
                      onClick={() => viewCertificate(course.id)}
                      className="px-4 py-2 border border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <Award className="h-4 w-4" />
                      Chứng chỉ
                    </button>
                  )}
                  
                  <button
                    onClick={() => downloadMaterials(course.id)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Tài liệu
                  </button>
                  
                  {/* Remove button (optional) */}
                  <button
                    onClick={() => removeCourse(course.id)}
                    className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                    title="Xóa khỏi danh sách"
                  >
                    ×
                  </button>
                </div>
              </div>

              {/* Next Lesson (for in-progress courses) */}
              {course.progress > 0 && course.progress < 100 && (
                <div className="px-6 py-4 bg-gray-50 rounded-b-xl border-t">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
                        <ChevronRight className="h-4 w-4 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Bài học tiếp theo</p>
                        <p className="text-xs text-gray-600">
                          Bài {course.completedLessons + 1}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => continueLearning(course.id)}
                      className="text-sm text-emerald-600 hover:text-emerald-800 font-medium"
                    >
                      Bắt đầu →
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty state for filtered results */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy khóa học</h3>
            <p className="text-gray-600">
              Không có khóa học nào phù hợp với bộ lọc và tìm kiếm của bạn.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveFilter("all");
              }}
              className="mt-4 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Xóa bộ lọc
            </button>
          </div>
        )}

        {/* Learning Stats */}
        <div className="mt-12 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-6">📊 Thống kê học tập của bạn</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="h-5 w-5 text-blue-500" />
                <h4 className="font-medium">Thời gian học trung bình</h4>
              </div>
              <p className="text-2xl font-bold">45 phút/ngày</p>
              <p className="text-sm text-gray-600 mt-1">Duy trì 7 ngày liên tiếp</p>
            </div>
            <div className="p-4 bg-white rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <h4 className="font-medium">Bài học đã hoàn thành</h4>
              </div>
              <p className="text-2xl font-bold">
                {myCourses.reduce((total, course) => total + course.completedLessons, 0)}
              </p>
              <p className="text-sm text-gray-600 mt-1">trên tổng số {myCourses.reduce((total, course) => total + course.totalLessons, 0)} bài</p>
            </div>
            <div className="p-4 bg-white rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <h4 className="font-medium">Điểm trung bình</h4>
              </div>
              <p className="text-2xl font-bold">8.5/10</p>
              <p className="text-sm text-gray-600 mt-1">Dựa trên bài tập và bài kiểm tra</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCoursesPage;