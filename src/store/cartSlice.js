import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        total: 0,
    },
    reducers: {
        addItem: (state, action) => {
            const { product, quantity } = action.payload;
            const existing = state.items.find((i) => i.id === product.id);

            if (existing) {
                existing.quantity += quantity;
            } else {
                state.items.push({ ...product, quantity });
            }

            state.total += product.price * quantity;
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.items.find((i) => i.id === id);
            if (!item) return;

            const diff = quantity - item.quantity;
            item.quantity = quantity;
            state.total += diff * item.price;
        },
        removeItem: (state, action) => {
            const item = state.items.find((i) => i.id === action.payload);
            if (!item) return;
            state.total -= item.price * item.quantity;
            state.items = state.items.filter((i) => i.id !== action.payload);
        },
        clearCart: (state) => {
            state.items = [];
            state.total = 0;
        },
    },
});

export const { addItem, updateQuantity, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;