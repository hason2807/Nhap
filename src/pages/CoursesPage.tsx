import { useMemo, useState } from "react";
import { courses, categories } from "../data/courses";
import { generateCourseImage } from "../utils/imageGenerator";
import { Link } from "react-router";

const PAGE_SIZE = 9;

const CoursesPage = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("students");
  const [page, setPage] = useState(1);
 
  // ================== FILTER + SORT ==================
  const filteredCourses = useMemo(() => {
    let result = courses.filter((c) => {
      const matchSearch = c.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory =
        category === "All" || c.category === category;

      return matchSearch && matchCategory;
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
  }, [search, category, sort]);

  // ================== PAGINATION ==================
  const totalPages = Math.ceil(filteredCourses.length / PAGE_SIZE);

  const paginatedCourses = filteredCourses.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6">Danh sách khóa học</h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* Search */}
        <input
          type="text"
          placeholder="Tìm theo tên khóa học..."
          className="border rounded-lg px-4 py-2"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        {/* Category */}
        <select
          className="border rounded-lg px-4 py-2"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
        >
          <option value="All">Tất cả danh mục</option>
          {categories.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>

        {/* Sort */}
        <select
          className="border rounded-lg px-4 py-2"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="students">Phổ biến nhất</option>
          <option value="rating">Đánh giá cao</option>
          <option value="price-asc">Giá thấp → cao</option>
          <option value="price-desc">Giá cao → thấp</option>
        </select>
      </div>

      {/* Result count */}
      <p className="text-gray-600 mb-4">
        Hiển thị <b>{filteredCourses.length}</b> khóa học
      </p>

      {/* ================== GRID COURSES ================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition"
          >
            {/* Image */}
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

            {/* Content */}
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

      {/* ================== PAGINATION ================== */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 rounded-lg border ${
                page === i + 1
                  ? "bg-emerald-600 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CoursesPage;