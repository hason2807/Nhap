import { ArrowRight, Star, Users, Clock, Award, CheckCircle,TrendingUp,Globe,BookOpen,Target
} from "lucide-react";
import { Link } from "react-router";
import { courses } from "../data/courses"; // Import dữ liệu courses
import { generateCourseImage } from "../utils/imageGenerator"; // Import hàm generateCourseImage
import bannerImage from "../assets/banner-Photoroom.png";

const HomePage = () => {
  // Lấy 4 khóa học nổi bật từ dữ liệu courses (có thể thêm logic để lọc khóa học hot)
  const featuredCourses = courses
    .sort((a, b) => b.students - a.students) // Sắp xếp theo số học viên (phổ biến nhất)
    .slice(0, 4) // Lấy 4 khóa học đầu tiên
    .map(course => ({
      id: course.id,
      image: course.image,
      title: course.title,
      category: course.category,
      instructor: course.instructor,
      price: course.price,
      originalPrice: course.originalPrice,
      rating: course.rating,
      students: course.students,
      lessons: course.lessons,
      badge: course.badge,
      level: course.level,
      duration: course.duration,
    }));

  // Stats data tính từ dữ liệu thực
  const totalStudents = courses.reduce((sum, course) => sum + course.students, 0);
  const totalLessons = courses.reduce((sum, course) => sum + course.lessons, 0);
  const averageRating = courses.reduce((sum, course) => sum + course.rating, 0) / courses.length;

  const stats = [
    { number: `${Math.round(totalStudents / 1000)}K+`, label: "Học Viên Đang Học", icon: <Users className="h-8 w-8" /> },
    { number: `${courses.length}+`, label: "Giảng Viên Chuyên Gia", icon: <Award className="h-8 w-8" /> },
    { number: `${totalLessons}+`, label: "Bài Học Có Sẵn", icon: <BookOpen className="h-8 w-8" /> },
    { number: `${averageRating.toFixed(1)}/5.0`, label: "Đánh Giá Trung Bình", icon: <Target className="h-8 w-8" /> },
  ];

  // Features data
  const features = [
    {
      title: "Học từ Chuyên Gia Ngành",
      description: "Học từ các chuyên gia có nhiều năm kinh nghiệm thực tế",
      icon: <CheckCircle className="h-6 w-6" />,
    },
    {
      title: "Lịch Học Linh Hoạt",
      description: "Học theo tốc độ của bạn với quyền truy cập trọn đời vào tài liệu khóa học",
      icon: <Clock className="h-6 w-6" />,
    },
    {
      title: "Hỗ Trợ Sự Nghiệp",
      description: "Nhận hướng dẫn nghề nghiệp và đánh giá portfolio",
      icon: <TrendingUp className="h-6 w-6" />,
    },
    {
      title: "Cộng Đồng Toàn Cầu",
      description: "Tham gia cùng hàng ngàn người học từ khắp nơi trên thế giới",
      icon: <Globe className="h-6 w-6" />,
    },
  ];

  return (
      <>
      <title>Home Page</title>
      <meta name="description" content="Home Page" />
    <div className="min-h-screen bg-white">
    {/* Hero Section */}
<section className="relative overflow-hidden py-20">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="grid lg:grid-cols-2 gap-12 items-center">

      {/* Left content - giữ nguyên */}
      <div>
        <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl md:text-6xl">
          Học Kỹ Năng{" "}
          <span className="text-green-700">
            Thúc Đẩy
          </span>{" "}
          Sự Nghiệp Của Bạn
        </h1>

        <p className="mb-8 text-xl text-gray-700">
          Tham gia cùng hơn{" "}
          <span className="font-semibold text-gray-900">
            {Math.round(totalStudents / 1000)}K
          </span>{" "}
          người học trên toàn thế giới. Làm chủ kỹ năng thực tiễn với khóa học
          dẫn dắt bởi chuyên gia và dự án thực tế.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/courses"
            className="inline-flex items-center justify-center rounded-lg bg-green-700 px-8 py-3 text-lg font-semibold text-white transition-all hover:bg-green-800 hover:shadow-lg"
          >
            Khám Phá Khóa Học
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>

          <button className="inline-flex items-center justify-center rounded-lg border-2 border-green-700 px-8 py-3 text-lg font-semibold text-green-700 transition-all hover:bg-green-50">
            Xem Demo
          </button>
        </div>
      </div>

      {/* Right content - Banner */}
      <div className="relative">
      <img
  src={bannerImage}
  alt=""
  className="w-full h-auto max-w-lg object-contain"
/>
        
        {/* Optional: Thêm badge nhỏ nếu muốn */}
        <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4">
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm font-medium">
              {averageRating.toFixed(1)} ({totalStudents.toLocaleString()}+ học viên)
            </span>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

      {/* Stats Section */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-blue-600 shadow-lg">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              Khóa Học Nổi Bật
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Các khóa học được lựa chọn từ những giảng viên hàng đầu để nâng cao kỹ năng của bạn
            </p>
          </div>

          {/* Sử dụng cùng layout với CoursesPage */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition"
              >
                {/* Image - giống với CoursesPage */}
                <div className="relative">
                  <img
                    src={generateCourseImage(course.image)}
                    alt={course.title}
                    className="h-48 w-full object-cover rounded-t-xl"
                  />
                  {course.badge && (
                    <span className="absolute top-3 left-3 bg-emerald-600 text-white text-xs px-3 py-1 rounded-full">
                      {course.badge}
                    </span>
                  )}
                </div>

                {/* Content - giống với CoursesPage */}
                <div className="p-4">
                  <h3 className="font-semibold text-lg line-clamp-2">
                    {course.title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {course.instructor}
                  </p>

                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm">⭐ {course.rating.toFixed(1)}</span>
                    <span className="text-sm text-gray-500">
                      👥 {course.students.toLocaleString()}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-emerald-600 font-bold">
                      {course.price.toLocaleString()}₫
                    </span>
                    <span className="line-through text-gray-400 text-sm">
                      {course.originalPrice.toLocaleString()}₫
                    </span>
                  </div>

                  <Link
                    to={`/courses/${course.id}`}
                    className="block mt-4 text-center bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/courses"
              className="inline-flex items-center rounded-lg bg-gray-900 px-8 py-3 text-lg font-semibold text-white transition-all hover:bg-black"
            >
              Xem Tất Cả {courses.length} Khóa Học
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
      {/* Features Section */}
<section className="py-20">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

    <div className="grid items-center gap-12 lg:grid-cols-2">

      {/* LEFT CONTENT */}
      <div className="text-center lg:text-left">
        <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
          Tại Sao Chọn Nền Tảng Của Chúng Tôi
        </h2>
        <p className="max-w-xl text-lg text-gray-600 mx-auto lg:mx-0">
          Chúng tôi cam kết mang đến trải nghiệm học tập tốt nhất
        </p>
      </div>

      {/* RIGHT FEATURES GRID */}
      <div className="grid gap-8 sm:grid-cols-2">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
              {feature.icon}
            </div>
            <h3 className="mb-3 text-xl font-semibold">
              {feature.title}
            </h3>
            <p className="text-gray-600">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

    </div>

  </div>
</section>
      {/* CTA Section */}
<section className="py-20">
  <div className="mx-auto max-w-4xl px-4 text-center">
    <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
      Sẵn Sàng Bắt Đầu Hành Trình Học Tập?
    </h2>

    <p className="mb-8 text-xl text-gray-700">
      Tham gia cùng hàng ngàn người học thành công ngay hôm nay.
      Không cần kinh nghiệm trước.
    </p>

    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link
        to="/courses"
        className="inline-flex items-center justify-center rounded-lg bg-green-700 px-8 py-3 text-lg font-semibold text-white transition-all hover:bg-green-800 hover:shadow-lg"
      >
        Bắt Đầu Ngay
        <ArrowRight className="ml-2 h-5 w-5" />
      </Link>

      <Link
        to="/register"
        className="inline-flex items-center justify-center rounded-lg border-2 border-green-700 px-8 py-3 text-lg font-semibold text-green-700 transition-all hover:bg-green-50"
      >
        Đăng Ký Miễn Phí
      </Link>
    </div>
  </div>
</section>

    </div>
    </>
  );
};

export default HomePage;