import React from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { addItem } from "../store/cartSlice";
import { products } from "../data/product";

export default function ProductListScreen() {
    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text>Rp {item.price}</Text>
                        <Button
                            title="Add to Cart"
                            onPress={() => dispatch(addItem(item))}
                        />
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    card: {
        padding: 16,
        marginBottom: 12,
        backgroundColor: "#fff",
        borderRadius: 10,
        elevation: 3,
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
    },
});