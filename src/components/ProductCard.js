import useCartStore from '../store/useCartStore'
const ProductCard = ({ product }) => {
    // Selector: ambil hanya state yang diperlukan (menghindari re-render)
    const addItem = useCartStore(state => state.addItem)
    const items = useCartStore(state => state.items)
    const isInCart = items.some(item => item.id === product.id)
    return (
        <TouchableOpacity
            onPress={() => addItem(product)}
            style={[styles.btn, isInCart && styles.btnAdded]}
        >
            <Text>{isInCart ? '✓ Ditambahkan' : 'Tambah ke Keranjang'}</Text>
        </TouchableOpacity>
    )
}