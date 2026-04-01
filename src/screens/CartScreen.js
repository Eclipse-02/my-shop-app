import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { updateQuantity, removeItem, clearCart } from "../store/cartSlice";
import { products } from "../data/product";
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function CartScreen() {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.cart.items);
    const total = useSelector((state) => state.cart.total);
    const [pending, setPending] = useState({});

    useEffect(() => {
        setPending({});
    }, [items]);

    const getMaxStock = (id) => products.find((p) => p.id === id)?.stock || 0;

    return (
        <SafeAreaProvider style={styles.container}>
            <Text style={styles.screenTitle}>My Cart</Text>
            <FlatList
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    const qty = pending[item.id] ?? item.quantity;
                    const changed = qty !== item.quantity;
                    const max = getMaxStock(item.id);

                    return (
                        <View style={styles.card}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text>Qty: {qty}</Text>
                            <Text>Subtotal: Rp {(item.price * qty).toLocaleString("id-ID")}</Text>

                            <View style={styles.row}>
                                <TouchableOpacity onPress={() => setPending((p) => ({ ...p, [item.id]: Math.max(1, qty - 1) }))}>
                                    <Text style={styles.btn}>−</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setPending((p) => ({ ...p, [item.id]: Math.min(max, qty + 1) }))}>
                                    <Text style={styles.btn}>+</Text>
                                </TouchableOpacity>
                                {changed && (
                                    <TouchableOpacity onPress={() => dispatch(updateQuantity({ id: item.id, quantity: qty }))}>
                                        <Text style={styles.update}>Update</Text>
                                    </TouchableOpacity>
                                )}
                                <TouchableOpacity onPress={() => dispatch(removeItem(item.id))}>
                                    <Text style={styles.remove}>Remove</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    );
                }}
            />

            <View style={styles.totalCard}>
                <Text style={styles.total}>Grand Total: Rp {total.toLocaleString("id-ID")}</Text>
                <TouchableOpacity style={styles.clearBtn} onPress={() => dispatch(clearCart())}>
                    <Text style={styles.clearText}>Kosongkan Keranjang</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f7f7f7", padding: 16, paddingTop: 30 },
    screenTitle: { fontSize: 28, fontWeight: "700", marginBottom: 12 },
    card: { backgroundColor: "white", padding: 18, borderRadius: 18, marginBottom: 14, elevation: 4 },
    name: { fontSize: 17, fontWeight: "700", marginBottom: 4 },
    row: { flexDirection: "row", alignItems: "center", gap: 16, marginTop: 10 },
    btn: { fontSize: 24, fontWeight: "bold" },
    update: { color: "blue", fontWeight: "600" },
    remove: { color: "red", fontWeight: "600" },
    totalCard: { backgroundColor: "white", padding: 18, borderRadius: 18, elevation: 4 },
    total: { fontSize: 20, fontWeight: "700", marginBottom: 12 },
    clearBtn: { backgroundColor: "black", padding: 14, borderRadius: 14, alignItems: "center" },
    clearText: { color: "white", fontWeight: "600" },
});