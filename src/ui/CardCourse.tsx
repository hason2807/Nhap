import { BookOpen, User } from "lucide-react";

type CourseCardProps = {
  image: string;
  title?: string;
  category?: string;
  instructor?: string;
  price?: number;
  originalPrice?: number;
  rating?: number;
  students?: number;
  lessons?: number;
  badge?: string;
  level?: string;
};

export default function CardCourse({ 
  image,
  title = "Starting SEO as your Home Based Business",
  category = "Marketing",
  instructor = "Jessica Brown",
  price = 30,
  originalPrice = 60,
  rating = 4.8,
  students = 227,
  lessons = 11,
  badge = "15 Weeks",
  level = "Beginner"
}: CourseCardProps) {
  return (
    <div className="group relative w-68 overflow-hidden rounded-xl bg-white shadow-md shadow-black/10 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-lg hover:shadow-black/20">
      {/* Image */}
      <div className="relative h-50 w-full">
        <img 
          src={image} 
          alt={title} 
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer" 
        />
        {badge && (
          <span className="absolute right-4 top-4 rounded-lg bg-orange-400 px-3 py-1 text-sm font-semibold text-white">
            {badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 p-6">
        {/* Level Badge */}
        <h1 className="w-fit rounded-md bg-emerald-100 px-2 text-sm font-medium text-emerald-600">
          {level}
        </h1>

        {/* Title */}
        <h3 className="title cursor-pointer text-xl font-semibold hover:text-green-500">
          {title}
        </h3>

        {/* Instructor */}
        <h3 className="text-sm text-gray-500">
          Instructors: <span className="font-semibold">{instructor}</span>
        </h3>

        {/* Price */}
        <div className="text-xl font-bold text-rose-500">
          ${price.toLocaleString()}
          {originalPrice && originalPrice > price && (
            <span className="ml-2 text-sm font-normal text-gray-400 line-through">
              ${originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Lessons & Students */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <BookOpen size={18} />
            {lessons} Lessons
          </div>
          <div className="flex items-center gap-2">
            <User size={18} />
            {students} Students
          </div>
        </div>

        {/* Rating (optional) */}
        {rating && (
          <div className="flex items-center gap-1 text-sm text-gray-600">
            ⭐ {rating.toFixed(1)} Rating
          </div>
        )}

        {/* Category (optional) */}
        {category && (
          <div className="text-sm text-gray-500">
            Category: {category}
          </div>
        )}

        {/* Button */}
        <button className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-rose-500 py-3 font-semibold text-white hover:bg-green-500">
          Enroll Now →
        </button>
      </div>
    </div>
  );
} 