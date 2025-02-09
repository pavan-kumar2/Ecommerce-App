export const cartInitialState = {
    cart: []
}

export const cartReducer = (currentState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const existingProduct = currentState.cart.find(product => product.id === action.newProduct.id) ?? false;

            if (existingProduct) {
                return {
                    cart: currentState.cart.map(product =>
                        product.id === action.newProduct.id
                            ? { ...product, quantity: product.quantity < 10 ? product.quantity + 1 : product.quantity }
                            : product
                    )
                }
            } else {
                return { cart: [{ ...action.newProduct, quantity: 1 }, ...currentState.cart] };
            }

        case 'MANAGE_QUANTITY':
            return {
                cart: currentState.cart.map(product => {
                    if (product.id === action.payload.productId) {
                        if (action.payload.actionState === 'increment' && product.quantity < 10) {
                            return { ...product, quantity: product.quantity + 1 }

                        } else if (action.payload.actionState === 'decrement' && product.quantity > 1) {
                            return { ...product, quantity: product.quantity - 1 }
                        }
                    }
                    return product
                })
            }
        case 'REMOVE_FROM_CART':
            return { cart: currentState.cart.filter(product => product.id !== action.productId) }
        default:
            return currentState;
    }
}