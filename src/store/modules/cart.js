export default {
	namespaced: true,
	state() {
		return {
			items: [],
			total: 0,
			qty: 0
		};
	},
	mutations: {
		addProductToCart(state, payload) {
			const productData = payload;

			const productInCartIndex = state.items.findIndex(
				(ci) => ci.productId === productData.id
			);

			if (productInCartIndex >= 0) {
				state.items[productInCartIndex].qty++;
			} else {
				const newItem = {
					productId: productData.id,
					title: productData.title,
					image: productData.image,
					price: productData.price,
					qty: 1,
				};
				state.items.push(newItem);
			}
			state.qty++;
			state.total += productData.price;
		},

		removeProductFromCart(state, payload) {
			const prodId = payload.productId;
			const productInCartIndex = state.items.findIndex(
				(cartItem) => cartItem.productId === prodId
			);
			const prodData = state.items[productInCartIndex];
			state.items.splice(productInCartIndex, 1);
			state.qty -= prodData.qty;
			state.total -= prodData.price * prodData.qty;
		},
	},
	actions: {
		addProductToCart(context, payload) {
			const prodId = payload.id;
			const products = context.rootGetters['prods/products'];
			console.log('Products:', products); // Debugging log
			const product = products.find((prod) => prod.id === prodId);
			console.log('Product:', product); // Debugging log
			// context.commit('addProductToCart', product);
			context.commit('cart/addProductToCart', product, { root: true });
		},
		removeProductFromCart(context, payload) {
			context.commit('removeProductFromCart', payload);
		},
	},
	getters: {
		products(state) {
			return state.items;
		},
		totalSum(state) {
			return state.total;
		},
		quantity(state) {
			return state.qty;
		},
	},
}