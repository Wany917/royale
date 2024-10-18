import { create } from "zustand"
import { persist } from "zustand/middleware"
import CartItem from "@/types/cart-item"
import { Tables } from "@/types/supabase"

interface State {
	cart: CartItem[]
	totalItems: number
	totalPrice: number
	currentStep: number
}

interface Actions {
	addToCart: (Item: Tables<"products">) => void
	removeFromCart: (Item: Tables<"products">) => void
	setCurrentStep: (Step: number) => void
}

const INITIAL_STATE: State = {
	cart: [],
	totalItems: 0,
	totalPrice: 0,
	currentStep: 0,
}

export const useCartStore = create(
	persist<State & Actions>(
		(set, get) => ({
			cart: INITIAL_STATE.cart,
			totalItems: INITIAL_STATE.totalItems,
			totalPrice: INITIAL_STATE.totalPrice,
			currentStep: INITIAL_STATE.currentStep,
			addToCart: (product: Tables<"products">) => {
				const cart = get().cart
				const cartItem = cart.find(item => item.id === product.id)

				if (cartItem) {
					const updatedCart = cart.map(item =>
						item.id === product.id ? { ...item, quantity: (item.quantity as number) + 1 } : item
					)
					set(state => ({
						cart: updatedCart,
						totalItems: state.totalItems + 1,
						totalPrice: state.totalPrice + product.price,
					}))
				} else {
					const updatedCart = [...cart, { ...product, quantity: 1 }]

					set(state => ({
						cart: updatedCart,
						totalItems: state.totalItems + 1,
						totalPrice: state.totalPrice + product.price,
					}))
				}
			},
			removeFromCart: (product: Tables<"products">) => {
				set(state => ({
					cart: state.cart.filter(item => item.id !== product.id),
					totalItems: state.totalItems - 1,
					totalPrice: state.totalPrice - product.price,
				}))
			},
			setCurrentStep: (step) => set({ currentStep: step }),
		}),
		{
			name: "cart-storage",
		}
	)
)