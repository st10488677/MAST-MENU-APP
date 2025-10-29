import React, { useState } from "react";

interface MenuItem {
  id: string;
  name: string;
  price: number;
}

interface Props {
  cart: MenuItem[];
  removeFromCart: (id: string) => void;
  resetCart: () => void;
  onBack: () => void;
}

export default function CartScreen({ cart, removeFromCart, resetCart, onBack }: Props) {
  const [showReset, setShowReset] = useState(false);
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="bg-blue-200 p-4 rounded-xl w-80">
      <h2 className="text-xl font-bold text-center mb-4">Your Cart</h2>
      {cart.length === 0 && <p>Your cart is empty.</p>}
      {cart.map((item) => (
        <div key={item.id} className="bg-white p-2 mb-2 rounded">
          <p>{item.name} - R{item.price}</p>
          <button
            className="bg-red-500 text-white w-full mt-1 p-1 rounded"
            onClick={() => removeFromCart(item.id)}
          >
            Remove
          </button>
        </div>
      ))}
      <p className="font-bold mt-4">Total: R{total}</p>
      <div className="flex gap-2 mt-4">
        <button onClick={() => setShowReset(true)} className="bg-yellow-500 text-white flex-1 p-2 rounded">
          Reset Cart
        </button>
        <button className="bg-green-600 text-white flex-1 p-2 rounded">Checkout</button>
      </div>
      <button onClick={onBack} className="bg-gray-600 text-white w-full mt-2 p-2 rounded">
        Back
      </button>

      {showReset && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-red-400 p-4 rounded-xl w-64 text-center">
            <p className="font-bold mb-3">RESET YOUR CART?</p>
            <div className="flex gap-2">
              <button onClick={() => { resetCart(); setShowReset(false); }} className="bg-green-600 flex-1 p-2 rounded">
                YES
              </button>
              <button onClick={() => setShowReset(false)} className="bg-red-600 flex-1 p-2 rounded">
                NO
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
