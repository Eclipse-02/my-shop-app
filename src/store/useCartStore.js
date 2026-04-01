import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
const useCartStore = create(
    devtools( // Redux DevTools integration
        persist( // Persist state ke AsyncStorage
            (set, get) => ({
                items: [],
                total: 0,
                itemCount: 0,
                addItem: (product) => set((state) => {
                    const existing = state.items.find(i => i.id === product.id)
                    if (existing) {
                        return {
                            items: state.items.map(i =>
                                i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
                            ),
                            total: state.total + product.price,
                            itemCount: state.itemCount + 1,
                        }
                    }
                    return {
                        items: [...state.items, { ...product, quantity: 1 }],
                        total: state.total + product.price,
                        itemCount: state.itemCount + 1,
                    }
                }),
                removeItem: (id) => set((state) => {
                    const item = state.items.find(i => i.id === id)
                    return {
                        items: state.items.filter(i => i.id !== id),
                        total: state.total - (item?.price * item?.quantity || 0),
                        itemCount: state.itemCount - (item?.quantity || 0),
                    }
                }),
                clearCart: () => set({ items: [], total: 0, itemCount: 0 }),
                // Getter (computed va
                getItemCount: () => get().items.length,
            }),
            {
                name: 'cart-storage',
                storage: {
                    getItem: async (name) => {
                        const str = await AsyncStorage.getItem(name)
                        return str ? JSON.parse(str) : null
                    },
                    setItem: async (name, value) => {
                        await AsyncStorage.setItem(name, JSON.stringify(value))
                    },
                    removeItem: async (name) => {
                        await AsyncStorage.removeItem(name)
                    },
                },
            }
        )
    )
)
export default useCartStore