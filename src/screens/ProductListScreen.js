import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../store/cartSlice";
import { products } from "../data/product";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function ProductListScreen() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const [quantities, setQuantities] = useState({});

    const getRemainingStock = (product) => {
        const inCart = cartItems.find((i) => i.id === product.id);
        return product.stock - (inCart?.quantity || 0);
    };

    const renderItem = ({ item }) => {
        const qty = quantities[item.id] || 1;
        const remaining = getRemainingStock(item);

        return (
            <View style={styles.card}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.meta}>{item.category}</Text>
                <Text style={styles.meta}>Stock: {remaining}</Text>
                <Text style={styles.price}>Rp {item.price.toLocaleString("id-ID")}</Text>
                <View style={styles.counterRow}>
                    <TouchableOpacity
                        onPress={() => setQuantities((prev) => ({ ...prev, [item.id]: Math.max(1, qty - 1) }))}
                    >
                        <Text style={styles.counterBtn}>−</Text>
                    </TouchableOpacity>

                    <Text style={styles.qty}>{qty}</Text>

                    <TouchableOpacity
                        onPress={() => setQuantities((prev) => ({ ...prev, [item.id]: Math.min(remaining, qty + 1) }))}
                    >
                        <Text style={styles.counterBtn}>+</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.addBtn} disabled={remaining <= 0} onPress={() => dispatch(addItem({ product: item, quantity: qty }))}>
                    <Text style={styles.addText}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <SafeAreaProvider style={styles.safeArea}>
            <Text style={styles.screenTitle}>Products</Text>
            <FlatList data={products} renderItem={renderItem} keyExtractor={(i) => i.id} contentContainerStyle={styles.container} />
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: "#f7f7f7", marginTop: 30 },
    screenTitle: { fontSize: 28, fontWeight: "700", paddingHorizontal: 16, paddingTop: 8, marginBottom: 8 },
    container: { padding: 16, paddingBottom: 24 },
    card: { backgroundColor: "white", padding: 18, borderRadius: 18, marginBottom: 14, elevation: 4 },
    name: { fontSize: 18, fontWeight: "700" },
    meta: { color: "gray", marginTop: 4 },
    price: { fontSize: 16, fontWeight: "600", marginVertical: 8 },
    counterRow: { flexDirection: "row", alignItems: "center", gap: 20, marginBottom: 12 },
    counterBtn: { fontSize: 28, fontWeight: "bold" },
    addBtn: { backgroundColor: "black", padding: 14, borderRadius: 14, alignItems: "center" },
    addText: { color: "white", fontWeight: "600" },
});