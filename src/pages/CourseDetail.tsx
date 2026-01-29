import { useParams } from "react-router";
import { courses } from "../data/courses";
import { generateCourseImage } from "../utils/imageGenerator";
const CourseDetail = () => {
  const { id } = useParams();
  const course = courses.find((c) => c.id === Number(id));

  if (!course) return <p className="p-10">Không tìm thấy khóa học</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold">{course.title}</h1>
          <p className="text-gray-600 mt-3">{course.description}</p>

          <h2 className="text-xl font-semibold mt-8 mb-4">
            Bạn sẽ học được gì
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            {course.whatYouLearn.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">
            Nội dung khóa học
          </h2>
          <ul className="space-y-2">
            {course.curriculum.map((c, i) => (
              <li
                key={i}
                className="border p-3 rounded flex justify-between"
              >
                <span>{c.title}</span>
                <span className="text-sm text-gray-500">
                  {c.duration}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Sidebar */}
        <div className="border rounded-xl p-6 h-fit">
          {/* Updated image with generateCourseImage */}
          <div className="relative rounded-lg overflow-hidden mb-4">
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
          </div>

          <p className="text-2xl font-bold text-emerald-600">
            {course.price.toLocaleString()}₫
          </p>
          <p className="line-through text-gray-400">
            {course.originalPrice.toLocaleString()}₫
          </p>

          <button className="w-full bg-emerald-600 text-white py-3 rounded-lg mt-4">
            Mua ngay
          </button>

          <ul className="mt-6 space-y-2 text-sm">
            <li>📘 {course.lessons} bài học</li>
            <li>⏱ {course.duration}</li>
            <li>🌐 {course.language}</li>
            <li>🎓 Có chứng chỉ</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;