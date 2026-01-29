// ================== TYPES ==================
export interface CurriculumItem {
  title: string;
  duration: string;
  type: string;
}

export interface Course {
  id: number;
  title: string;
  category: string;
  instructor: string;
  instructorRole: string;
  price: number;
  originalPrice: number;
  lessons: number;
  duration: string;
  rating: number;
  students: number;
  image: string;
  badge: string;
  level: string;
  language: string;
  certificate: boolean;
  lastUpdated?: string;
  description: string;
  whatYouLearn: string[];
  curriculum: CurriculumItem[];
  requirements: string[];
}

export interface Category {
  id: number;
  name: string;
  icon: string;
  count: number;
}

// ================== CATEGORIES ==================
export const categories: Category[] = [
  { id: 1, name: "Lập Trình", icon: "fas fa-code", count: 1 },
  { id: 2, name: "Marketing", icon: "fas fa-bullhorn", count: 1 },
  { id: 3, name: "Thiết Kế", icon: "fas fa-palette", count: 1 },
  { id: 4, name: "Kinh Doanh", icon: "fas fa-chart-line", count: 1 },
  { id: 5, name: "Ngoại Ngữ", icon: "fas fa-language", count: 1 },
  { id: 6, name: "Nhiếp Ảnh", icon: "fas fa-camera", count: 1 },
];

// ================== COURSES ==================
export const courses: Course[] = [
  {
    id: 1,
    title: "Lập Trình Web Fullstack với React & Node.js",
    category: "Lập Trình",
    instructor: "Nguyễn Văn An",
    instructorRole: "Senior Fullstack Developer tại Google",
    price: 1599000,
    originalPrice: 2999000,
    lessons: 48,
    duration: "32 giờ",
    rating: 4.9,
    students: 2543,
    image: "react",
    badge: "Bestseller",
    level: "Nâng cao",
    language: "Tiếng Việt",
    certificate: true,
    lastUpdated: "2024-01-15",
    description:
      "Khóa học toàn diện giúp bạn trở thành lập trình viên Fullstack chuyên nghiệp với React và Node.js. Từ cơ bản đến nâng cao, bạn sẽ xây dựng được các ứng dụng web hoàn chỉnh, học cách deploy và quản lý database.",
    whatYouLearn: [
      "Xây dựng ứng dụng web với React Hooks và Context API",
      "Phát triển RESTful API với Node.js và Express",
      "Kết nối và quản lý database MongoDB",
      "Authentication và Authorization với JWT",
      "Deploy ứng dụng lên Heroku và Vercel",
      "Testing với Jest và React Testing Library",
    ],
    curriculum: [
      {
        title: "Giới thiệu về Web Development",
        duration: "45 phút",
        type: "video",
      },
      {
        title: "HTML5 & CSS3 Nâng cao",
        duration: "2 giờ",
        type: "video + bài tập",
      },
      {
        title: "JavaScript ES6+ Fundamentals",
        duration: "3 giờ",
        type: "video + quiz",
      },
      {
        title: "React Basics - Components & Props",
        duration: "2.5 giờ",
        type: "video + thực hành",
      },
      {
        title: "React Hooks & State Management",
        duration: "3 giờ",
        type: "video + project",
      },
      {
        title: "Redux Toolkit và Redux Saga",
        duration: "3.5 giờ",
        type: "video + thực hành",
      },
      {
        title: "Node.js & Express.js Backend",
        duration: "4 giờ",
        type: "video + lab",
      },
      {
        title: "MongoDB & Mongoose",
        duration: "3 giờ",
        type: "video + bài tập",
      },
      {
        title: "REST API Development",
        duration: "4 giờ",
        type: "video + project",
      },
      {
        title: "Authentication & Authorization",
        duration: "3 giờ",
        type: "video + lab",
      },
      {
        title: "Deployment & DevOps Basics",
        duration: "2.5 giờ",
        type: "video",
      },
      {
        title: "Dự án cuối khóa: E-commerce Platform",
        duration: "5 giờ",
        type: "project + review",
      },
    ],
    requirements: [
      "Có kiến thức cơ bản về HTML, CSS",
      "Biết JavaScript cơ bản",
      "Máy tính có kết nối internet",
      "Tinh thần học tập nghiêm túc",
      "Cài đặt Node.js và VS Code",
      "Hiểu biết cơ bản về Git",
    ],
  },
  // Khóa học Marketing đầu tiên từ dữ liệu gốc
  {
    id: 11,
    title: "Digital Marketing A-Z: Từ Cơ Bản Đến Chuyên Gia",
    category: "Marketing",
    instructor: "Trần Thị Bình",
    instructorRole: "Marketing Director tại Tiktok Vietnam",
    price: 1299000,
    originalPrice: 2499000,
    lessons: 52,
    duration: "28 giờ",
    rating: 4.8,
    students: 3120,
    image: "marketing",
    badge: "Hot",
    level: "Từ cơ bản",
    language: "Tiếng Việt",
    certificate: true,
    description:
      "Nắm vững tất cả kỹ năng Digital Marketing: SEO, Google Ads, Facebook Ads, Email Marketing, Content Marketing và Analytics.",
    whatYouLearn: [
      "Chiến lược Digital Marketing tổng thể",
      "SEO On-page và Off-page chuyên sâu",
      "Google Ads và Facebook Ads hiệu quả",
      "Content Marketing và Storytelling",
      "Email Marketing Automation",
      "Phân tích dữ liệu với Google Analytics",
    ],
    curriculum: [
      {
        title: "Tổng quan Digital Marketing",
        duration: "1 giờ",
        type: "video",
      },
      {
        title: "SEO On-page & Off-page",
        duration: "4 giờ",
        type: "video + bài tập",
      },
      {
        title: "Google Ads Fundamentals",
        duration: "3.5 giờ",
        type: "video + lab",
      },
      {
        title: "Facebook & Instagram Ads",
        duration: "4 giờ",
        type: "video + thực hành",
      },
      {
        title: "Content Marketing Strategy",
        duration: "3 giờ",
        type: "video + project",
      },
      {
        title: "Email Marketing Automation",
        duration: "2.5 giờ",
        type: "video + lab",
      },
      {
        title: "Social Media Marketing",
        duration: "3 giờ",
        type: "video + bài tập",
      },
      {
        title: "Google Analytics Mastery",
        duration: "3 giờ",
        type: "video + thực hành",
      },
      {
        title: "Marketing Automation Tools",
        duration: "2.5 giờ",
        type: "video",
      },
      {
        title: "Conversion Rate Optimization",
        duration: "3 giờ",
        type: "video + project",
      },
      {
        title: "Marketing Budget và ROI",
        duration: "2 giờ",
        type: "video + bài tập",
      },
      {
        title: "Case Study: Chiến dịch thành công",
        duration: "4 giờ",
        type: "case study + review",
      },
    ],
    requirements: [
      "Máy tính có kết nối internet",
      "Tài khoản Google (cho Analytics và Ads)",
      "Tài khoản Facebook Business",
      "Tư duy sáng tạo",
      "Kỹ năng phân tích cơ bản",
    ],
  },
  // Khóa học Thiết Kế đầu tiên từ dữ liệu gốc
  {
    id: 18,
    title: "UI/UX Design Masterclass với Figma",
    category: "Thiết Kế",
    instructor: "Lê Hoàng Cường",
    instructorRole: "Senior Product Designer tại MoMo",
    price: 1199000,
    originalPrice: 1999000,
    lessons: 36,
    duration: "24 giờ",
    rating: 4.9,
    students: 1856,
    image: "design",
    badge: "New",
    level: "Từ cơ bản",
    language: "Tiếng Việt",
    certificate: true,
    description:
      "Trở thành UI/UX Designer chuyên nghiệp với Figma. Học cách thiết kế giao diện đẹp, trải nghiệm người dùng tốt và tạo design system.",
    whatYouLearn: [
      "Design Thinking Process",
      "Figma từ cơ bản đến nâng cao",
      "Wireframing và Prototyping",
      "Design System và Components",
      "User Research và Testing",
      "Portfolio Building",
    ],
    curriculum: [
      { title: "UI/UX Design Fundamentals", duration: "2 giờ", type: "video" },
      {
        title: "Figma Interface và Tools",
        duration: "3 giờ",
        type: "video + bài tập",
      },
      {
        title: "Design Principles & Color Theory",
        duration: "3 giờ",
        type: "video + project",
      },
      {
        title: "Typography in Design",
        duration: "2.5 giờ",
        type: "video + lab",
      },
      {
        title: "Wireframing và Low-fidelity Prototypes",
        duration: "4 giờ",
        type: "video + thực hành",
      },
      {
        title: "High-fidelity Mockups",
        duration: "4 giờ",
        type: "video + bài tập",
      },
      {
        title: "Interactive Prototyping",
        duration: "3 giờ",
        type: "video + project",
      },
      {
        title: "Design System và Component Libraries",
        duration: "4 giờ",
        type: "video + lab",
      },
      {
        title: "User Testing và Feedback",
        duration: "3 giờ",
        type: "video + thực hành",
      },
      { title: "Mobile App Design", duration: "3 giờ", type: "video" },
      {
        title: "Web Design Principles",
        duration: "2.5 giờ",
        type: "video + bài tập",
      },
      {
        title: "Portfolio Project: Complete App Design",
        duration: "5 giờ",
        type: "project + review",
      },
    ],
    requirements: [
      "Máy tính Windows/Mac",
      "Figma account (free)",
      "Tư duy sáng tạo",
      "Hiểu biết cơ bản về design",
      "Mouse hoặc drawing tablet (optional)",
    ],
  },
  // Khóa học Kinh Doanh đầu tiên từ dữ liệu gốc
  {
    id: 25,
    title: "Khởi Nghiệp & Xây Dựng Startup Thành Công",
    category: "Kinh Doanh",
    instructor: "Võ Thanh Hải",
    instructorRole: "Founder tại 3 Startup exits",
    price: 999000,
    originalPrice: 1899000,
    lessons: 28,
    duration: "18 giờ",
    rating: 4.8,
    students: 1543,
    image: "business",
    badge: "Featured",
    level: "Từ cơ bản",
    language: "Tiếng Việt",
    certificate: true,
    description:
      "Từ ý tưởng đến thực thi. Học cách xây dựng startup thành công với các chiến lược đã được kiểm chứng.",
    whatYouLearn: [
      "Startup Mindset",
      "Business Model Canvas",
      "Lean Startup Methodology",
      "Fundraising Strategies",
      "Growth Hacking",
      "Team Building và Leadership",
    ],
    curriculum: [
      {
        title: "Startup Mindset và Entrepreneurial Spirit",
        duration: "2 giờ",
        type: "video",
      },
      {
        title: "Idea Generation và Validation",
        duration: "3 giờ",
        type: "video + bài tập",
      },
      {
        title: "Business Model Canvas",
        duration: "4 giờ",
        type: "video + project",
      },
      {
        title: "Lean Startup Methodology",
        duration: "3 giờ",
        type: "video + lab",
      },
      {
        title: "Minimum Viable Product (MVP)",
        duration: "3 giờ",
        type: "video + thực hành",
      },
      {
        title: "Market Research và Customer Discovery",
        duration: "3 giờ",
        type: "video + bài tập",
      },
      {
        title: "Financial Planning và Projections",
        duration: "4 giờ",
        type: "video + project",
      },
      {
        title: "Fundraising: Angel, VC, Crowdfunding",
        duration: "3 giờ",
        type: "video + lab",
      },
      {
        title: "Pitching to Investors",
        duration: "3 giờ",
        type: "video + thực hành",
      },
      { title: "Team Building và Hiring", duration: "2 giờ", type: "video" },
      {
        title: "Growth Hacking Techniques",
        duration: "3 giờ",
        type: "video + bài tập",
      },
      {
        title: "Case Study: Successful Vietnamese Startup",
        duration: "5 giờ",
        type: "case study + review",
      },
    ],
    requirements: [
      "Ý tưởng kinh doanh (hoặc sẵn sàng phát triển)",
      "Tư duy đổi mới sáng tạo",
      "Kỹ năng phân tích cơ bản",
      "Khả năng làm việc nhóm",
      "Vốn startup (tuỳ vào mô hình)",
    ],
  },
  // Khóa học Ngoại Ngữ đầu tiên từ dữ liệu gốc
  {
    id: 31,
    title: "IELTS 7.0+ Complete Preparation",
    category: "Ngoại Ngữ",
    instructor: "Sarah Johnson",
    instructorRole: "IELTS Examiner với 10+ năm kinh nghiệm",
    price: 1499000,
    originalPrice: 2799000,
    lessons: 56,
    duration: "35 giờ",
    rating: 4.9,
    students: 4521,
    image: "english",
    badge: "Top Rated",
    level: "Trung cấp",
    language: "Tiếng Anh",
    certificate: true,
    description:
      "Khóa học IELTS toàn diện với 4 kỹ năng: Listening, Reading, Writing, Speaking. Cam kết đạt band 7.0+.",
    whatYouLearn: [
      "IELTS Listening Strategies",
      "Reading Comprehension Techniques",
      "Academic Writing Task 1 & 2",
      "Speaking Fluency và Coherence",
      "Time Management trong thi",
      "Mock Tests và Feedback",
    ],
    curriculum: [
      {
        title: "IELTS Overview & Scoring System",
        duration: "2 giờ",
        type: "video",
      },
      {
        title: "Listening Skills Development",
        duration: "8 giờ",
        type: "video + practice",
      },
      {
        title: "Reading Techniques và Skimming/Scanning",
        duration: "8 giờ",
        type: "video + bài tập",
      },
      {
        title: "Writing Task 1: Graphs, Charts, Diagrams",
        duration: "5 giờ",
        type: "video + writing",
      },
      {
        title: "Writing Task 2: Essay Structures",
        duration: "6 giờ",
        type: "video + writing",
      },
      {
        title: "Speaking Part 1: Introduction và Interview",
        duration: "3 giờ",
        type: "video + speaking",
      },
      {
        title: "Speaking Part 2: Long Turn",
        duration: "4 giờ",
        type: "video + speaking",
      },
      {
        title: "Speaking Part 3: Discussion",
        duration: "3 giờ",
        type: "video + speaking",
      },
      {
        title: "Vocabulary Building for IELTS",
        duration: "4 giờ",
        type: "video + flashcards",
      },
      {
        title: "Grammar Review cho IELTS",
        duration: "3 giờ",
        type: "video + bài tập",
      },
      { title: "Test-taking Strategies", duration: "2 giờ", type: "video" },
      {
        title: "Full Mock Tests với Feedback",
        duration: "8 giờ",
        type: "tests + review",
      },
    ],
    requirements: [
      "Trình độ tiếng Anh tương đương B1 trở lên",
      "Thời gian học ít nhất 2 giờ/ngày",
      "Ghi âm device cho speaking practice",
      "Từ điển Anh-Anh",
      "Practice test materials",
    ],
  },
  // Khóa học Nhiếp Ảnh đầu tiên từ dữ liệu gốc
  {
    id: 36,
    title: "Nhiếp Ảnh Căn Bản Cho Người Mới",
    category: "Nhiếp Ảnh",
    instructor: "Nguyễn Văn Hải",
    instructorRole: "Professional Photographer",
    price: 899000,
    originalPrice: 1699000,
    lessons: 28,
    duration: "20 giờ",
    rating: 4.8,
    students: 1876,
    image: "photography",
    badge: "Beginner",
    level: "Từ cơ bản",
    language: "Tiếng Việt",
    certificate: true,
    description:
      "Học nhiếp ảnh từ cơ bản: hiểu về máy ảnh, ánh sáng, composition và kỹ thuật chụp.",
    whatYouLearn: [
      "Camera Settings và Modes",
      "Exposure Triangle",
      "Composition Rules",
      "Natural Light Photography",
      "Basic Photo Editing",
      "Portrait Photography Basics",
    ],
    curriculum: [
      { title: "Giới thiệu về nhiếp ảnh", duration: "1 giờ", type: "video" },
      {
        title: "Hiểu về máy ảnh DSLR/Mirrorless",
        duration: "3 giờ",
        type: "video + thực hành",
      },
      {
        title: "Exposure Triangle: ISO, Aperture, Shutter",
        duration: "4 giờ",
        type: "video + bài tập",
      },
      {
        title: "Composition và Framing Rules",
        duration: "3 giờ",
        type: "video + project",
      },
      {
        title: "Ánh sáng trong nhiếp ảnh",
        duration: "3 giờ",
        type: "video + lab",
      },
      {
        title: "Portrait Photography Fundamentals",
        duration: "3 giờ",
        type: "video + thực hành",
      },
      {
        title: "Landscape và Nature Photography",
        duration: "2 giờ",
        type: "video + bài tập",
      },
      {
        title: "Street Photography Basics",
        duration: "2 giờ",
        type: "video + project",
      },
      {
        title: "Basic Photo Editing với Lightroom",
        duration: "3 giờ",
        type: "video + lab",
      },
      {
        title: "File Formats và Image Management",
        duration: "1.5 giờ",
        type: "video",
      },
      {
        title: "Equipment Recommendations",
        duration: "1.5 giờ",
        type: "video + bài tập",
      },
      {
        title: "Final Project: Photo Portfolio",
        duration: "5 giờ",
        type: "project + review",
      },
    ],
    requirements: [
      "Máy ảnh DSLR, Mirrorless hoặc smartphone cao cấp",
      "Máy tính cài Lightroom hoặc editing software",
      "Thẻ nhớ và pin dự phòng",
      "Tripod (recommended)",
      "Khung cảnh để chụp",
    ],
  },
];