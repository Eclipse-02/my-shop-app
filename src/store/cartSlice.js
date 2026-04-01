import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        total: 0,
    },
    reducers: {
        addItem: (state, action) => {
            state.items.push(action.payload);
            state.total += action.payload.price;
        },
        removeItem: (state, action) => {
            const item = state.items.find((i) => i.id === action.payload);
            if (item) {
                state.total -= item.price;
                state.items = state.items.filter((i) => i.id !== action.payload);
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.total = 0;
        },
    },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;