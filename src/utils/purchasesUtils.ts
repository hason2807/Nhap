// utils/purchasesUtils.ts

export interface Purchase {
  courseId: number;
  title: string;
  instructor: string;
  category: string;
  purchaseDate: string;
  expiryDate: string;
  progress: number;
  lastAccessed: string;
  completedLessons: number;
  totalLessons?: number;
  duration?: string;
  certificate: boolean;
  image?: string;
  price?: number;
}

// Kiểm tra nếu khóa học đã được mua
export const checkIfCoursePurchased = (courseId: number, userId: string): boolean => {
  if (!userId) return false;
  
  const purchasesKey = `purchases_${userId}`;
  const savedPurchases = localStorage.getItem(purchasesKey);
  
  if (!savedPurchases) return false;
  
  try {
    const purchases: Purchase[] = JSON.parse(savedPurchases);
    return purchases.some((purchase) => purchase.courseId === courseId);
  } catch (error) {
    console.error("Error checking purchased course:", error);
    return false;
  }
};

// Lấy danh sách khóa học đã mua
export const getPurchasedCourses = (userId: string): Purchase[] => {
  if (!userId) return [];
  
  const purchasesKey = `purchases_${userId}`;
  const savedPurchases = localStorage.getItem(purchasesKey);
  
  if (!savedPurchases) return [];
  
  try {
    return JSON.parse(savedPurchases);
  } catch (error) {
    console.error("Error getting purchased courses:", error);
    return [];
  }
};

// Thêm khóa học mới
export const addPurchasedCourse = (courseData: any, userId: string): boolean => {
  if (!userId) return false;
  
  const purchasesKey = `purchases_${userId}`;
  const savedPurchases = localStorage.getItem(purchasesKey);
  let purchases: Purchase[] = savedPurchases ? JSON.parse(savedPurchases) : [];
  
  // Kiểm tra nếu khóa học đã tồn tại
  const alreadyPurchased = purchases.some((p) => p.courseId === courseData.id);
  
  if (alreadyPurchased) {
    return false;
  }
  
  // Thêm khóa học mới
  const newPurchase: Purchase = {
    courseId: courseData.id,
    title: courseData.title,
    instructor: courseData.instructor,
    category: courseData.category,
    purchaseDate: new Date().toISOString(),
    expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    progress: 0,
    lastAccessed: new Date().toISOString(),
    completedLessons: 0,
    totalLessons: courseData.lessons || 10,
    duration: courseData.duration || "2 giờ",
    certificate: true,
    image: courseData.image || "general",
    price: courseData.price || 0
  };
  
  purchases.push(newPurchase);
  localStorage.setItem(purchasesKey, JSON.stringify(purchases));
  
  return true;
};

// Xóa khóa học khỏi purchases
export const removePurchasedCourse = (courseId: number, userId: string): boolean => {
  if (!userId) return false;
  
  const purchasesKey = `purchases_${userId}`;
  const savedPurchases = localStorage.getItem(purchasesKey);
  
  if (!savedPurchases) return false;
  
  try {
    const purchases: Purchase[] = JSON.parse(savedPurchases);
    const filteredPurchases = purchases.filter(p => p.courseId !== courseId);
    localStorage.setItem(purchasesKey, JSON.stringify(filteredPurchases));
    return true;
  } catch (error) {
    console.error("Error removing purchased course:", error);
    return false;
  }
};

// Cập nhật tiến độ khóa học
export const updateCourseProgress = (
  courseId: number, 
  userId: string, 
  progress: number, 
  completedLessons: number
): boolean => {
  if (!userId) return false;
  
  const purchasesKey = `purchases_${userId}`;
  const savedPurchases = localStorage.getItem(purchasesKey);
  
  if (!savedPurchases) return false;
  
  try {
    const purchases: Purchase[] = JSON.parse(savedPurchases);
    const updatedPurchases = purchases.map(purchase => {
      if (purchase.courseId === courseId) {
        return {
          ...purchase,
          progress,
          completedLessons,
          lastAccessed: new Date().toISOString()
        };
      }
      return purchase;
    });
    
    localStorage.setItem(purchasesKey, JSON.stringify(updatedPurchases));
    return true;
  } catch (error) {
    console.error("Error updating course progress:", error);
    return false;
  }
};