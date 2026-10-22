import { useState } from "react";
import CartContext from "./CartContext";

export default function CartProvider({ children }) {
    const [items, setItems] = useState([]);

    function addItem(product) {
        setItems((currentItem) => {
            const existingitem = currentItem.find((item) => item.id === product.id);
            if (existingitem) {
                return currentItem.map((item) => {
                    item.id === product.id
                    ? {...item, quantity: item.quantity + 1}
                    : item
                })
            }
            return [...currentItem, {...product, qunatity: 1}]
        })
    }

    function removeItem(productId) {
        setItems((currentItems) => currentItems.filter((item) => item.id !== productId))
    }

    function clearCart(){
        setItems([])
    }

    function updateQuantity(productId, quantity) {
        if (quantity < 1) {
            removeItem(productId)
            return
        }
        setItems((currentItems) => currentItems.map((item) => (
            item.id === productId ? {...item, quantity} : item
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