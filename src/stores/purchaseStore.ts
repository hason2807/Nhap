import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
  totalLessons: number;
  duration: string;
  certificate: boolean;
  image: string;
  price: number;
}

interface PurchaseStore {
  purchases: Record<string, Purchase[]>; // Key: userId
  addPurchase: (userId: string, purchase: Purchase) => void;
  addMultiplePurchases: (userId: string, purchases: Purchase[]) => void;
  getPurchasesByUser: (userId: string) => Purchase[];
  checkPurchased: (userId: string, courseId: number) => boolean;
  removePurchase: (userId: string, courseId: number) => void;
  updatePurchaseProgress: (userId: string, courseId: number, progress: number, completedLessons: number) => void;
}

export const usePurchaseStore = create<PurchaseStore>()(
  persist(
    (set, get) => ({
      purchases: {},
      
      addPurchase: (userId, purchase) => {
        set((state) => {
          const userPurchases = state.purchases[userId] || [];
          const exists = userPurchases.some(p => p.courseId === purchase.courseId);
          
          if (exists) return state;
          const newUserPurchases = [...userPurchases, purchase];
          const newState = {
            purchases: {
              ...state.purchases,
              [userId]: newUserPurchases
            }
          };

          // Sync legacy localStorage key
          try {
            const purchasesKey = `purchases_${userId}`;
            localStorage.setItem(purchasesKey, JSON.stringify(newUserPurchases));
          } catch (e) {
            console.error('Failed to sync purchases to localStorage', e);
          }

          return newState;
        });
      },
      
      addMultiplePurchases: (userId, newPurchases) => {
        set((state) => {
          const userPurchases = state.purchases[userId] || [];
          const existingIds = new Set(userPurchases.map(p => p.courseId));
          const uniqueNew = newPurchases.filter(p => !existingIds.has(p.courseId));

          const newUserPurchases = [...userPurchases, ...uniqueNew];
          const newState = {
            purchases: {
              ...state.purchases,
              [userId]: newUserPurchases
            }
          };

          // Sync legacy localStorage
          try {
            const purchasesKey = `purchases_${userId}`;
            localStorage.setItem(purchasesKey, JSON.stringify(newUserPurchases));
          } catch (e) {
            console.error('Failed to sync purchases to localStorage', e);
          }

          return newState;
        });
      },

      removePurchase: (userId, courseId) => {
        set((state) => {
          const userPurchases = state.purchases[userId] || [];
          const newUserPurchases = userPurchases.filter(p => p.courseId !== courseId);
          const newState = {
            purchases: {
              ...state.purchases,
              [userId]: newUserPurchases
            }
          };

          try {
            const purchasesKey = `purchases_${userId}`;
            localStorage.setItem(purchasesKey, JSON.stringify(newUserPurchases));
          } catch (e) {
            console.error('Failed to sync purchases to localStorage', e);
          }

          return newState;
        });
      },

      updatePurchaseProgress: (userId, courseId, progress, completedLessons) => {
        set((state) => {
          const userPurchases = state.purchases[userId] || [];
          const updated = userPurchases.map(p => {
            if (p.courseId === courseId) {
              return {
                ...p,
                progress,
                completedLessons,
                lastAccessed: new Date().toISOString()
              };
            }
            return p;
          });

          const newState = {
            purchases: {
              ...state.purchases,
              [userId]: updated
            }
          };

          try {
            const purchasesKey = `purchases_${userId}`;
            localStorage.setItem(purchasesKey, JSON.stringify(updated));
          } catch (e) {
            console.error('Failed to sync purchases to localStorage', e);
          }

          return newState;
        });
      },
      
      getPurchasesByUser: (userId) => {
        return get().purchases[userId] || [];
      },
      
      checkPurchased: (userId, courseId) => {
        const userPurchases = get().purchases[userId] || [];
        return userPurchases.some(p => p.courseId === courseId);
      },
    }),
    {
      name: 'purchases-storage',
    }
  )
);