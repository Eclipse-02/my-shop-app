import React from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../store/cartSlice";

export default function CartScreen() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.total);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Keranjang Belanja</Text>

      <FlatList
        data={items}
        keyExtractor={(item, index) => item.id + index}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
            <Text>Rp {item.price}</Text>
          </View>
        )}
      />

      <Text style={styles.total}>Total: Rp {total}</Text>

      <Button
        title="Kosongkan Keranjang"
        onPress={() => dispatch(clearCart())}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  item: {
    padding: 12,
    marginBottom: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 16,
  },
});