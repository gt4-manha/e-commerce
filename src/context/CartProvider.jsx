import { useState } from "react";
import CartContext from "./CartContext";
import PropTypes from "prop-types";

export default function CartProvider({ children }) {
    const [items, setItems] = useState([]);

    function addItem(product) {
        setItems((currentItem) => {
            const existingItem = currentItem.find((item) => item.id === product.id);
            if (existingItem) {
                return currentItem.map((item) => {
                    if (item.id === product.id) {
                        return { ...item, quantity: item.quantity + 1 }
                    }
                    return item
                })
            }
            return [...currentItem, { ...product, quantity: 1 }]
        })
    }

    function removeItem(productId) {
        setItems((currentItems) => currentItems.filter((item) => item.id !== productId))
    }

    function clearCart() {
        setItems([])
    }

    function updateQuantity(productId, quantity) {
        if (quantity < 1) {
            removeItem(productId)
            return
        }
        setItems((currentItems) => currentItems.map((item) => (
            item.id === productId ? { ...item, quantity } : item
        )))
    }

    const value = {
        items,
        addItem,
        removeItem,
        clearCart,
        updateQuantity,
        itemCount: items.reduce((total, item) => total + item.quantity, 0),
        total: items.reduce((total, item) => total + item.price * item.quantity, 0)
    }

    return <CartContext.Provider value={value}>
        {children}
    </CartContext.Provider>
}

CartProvider.propTypes = {
    children: PropTypes.node.isRequired
}
