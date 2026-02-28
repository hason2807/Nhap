import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: number;
  title: string;
  price: number;
  originalPrice: number;
  quantity: number;
  instructor: string;
  category: string;
  lessons: number;
  duration: string;
  image: string;
}

interface CartStore {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],
      
      addToCart: (item) => {
        const items = get().cartItems;
        const existing = items.find(i => i.id === item.id);
        
        if (existing) {
          set({
            cartItems: items.map(i =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            )
          });
        } else {
          set({ cartItems: [...items, { ...item, quantity: 1 }] });
        }
      },
      
      removeFromCart: (id) => {
        set({ cartItems: get().cartItems.filter(i => i.id !== id) });
      },
      
      updateQuantity: (id, quantity) => {
        set({
          cartItems: get().cartItems.map(i =>
            i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i
          )
        });
      },
      
      clearCart: () => set({ cartItems: [] }),
      
      get cartTotal() {
        return get().cartItems.reduce(
          (sum, item) => sum + item.price * item.quantity, 
          0
        );
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);