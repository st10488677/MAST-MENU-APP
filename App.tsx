import React, { useState } from "react";
// Minimal local component stubs and type so the app can compile without external files.
// These match the props used in App below and can be replaced with full implementations later.

export type MenuItem = {
  id: string;
  name: string;
  price?: number;
};

const LoginScreen: React.FC<{ onLogin: (type: "customer" | "chef") => void }> = ({ onLogin }) => {
  return (
    <div className="w-full max-w-sm bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <div className="flex space-x-2">
        <button
          className="px-3 py-2 bg-blue-500 text-white rounded"
          onClick={() => onLogin("customer")}
        >
          Customer
        </button>
        <button
          className="px-3 py-2 bg-green-500 text-white rounded"
          onClick={() => onLogin("chef")}
        >
          Chef
        </button>
      </div>
    </div>
  );
};

type HomeProps = {
  onViewMenu: () => void;
  onViewCart: () => void;
  onBack: () => void;
  onChef: () => void;
  userType: "customer" | "chef" | null;
  menuCount: number;
};
const HomeScreen: React.FC<HomeProps> = ({ onViewMenu, onViewCart, onBack, onChef, userType, menuCount }) => {
  return (
    <div className="w-full max-w-md bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Home ({userType ?? "guest"})</h2>
      <div className="space-y-2">
        <button className="w-full px-3 py-2 bg-blue-500 text-white rounded" onClick={onViewMenu}>
          View Menu ({menuCount})
        </button>
        <button className="w-full px-3 py-2 bg-yellow-500 text-white rounded" onClick={onViewCart}>
          View Cart
        </button>
        <button className="w-full px-3 py-2 bg-gray-300 rounded" onClick={onBack}>
          Logout
        </button>
        <button className="w-full px-3 py-2 bg-green-600 text-white rounded" onClick={onChef}>
          Chef Tools
        </button>
      </div>
    </div>
  );
};

type MenuProps = {
  menu: MenuItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (id: string) => void;
  onBack: () => void;
};
const MenuScreen: React.FC<MenuProps> = ({ menu, addToCart, removeFromCart, onBack }) => {
  return (
    <div className="w-full max-w-lg bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Menu</h2>
      <div className="space-y-2">
        {menu.length === 0 && <div className="text-gray-500">No items</div>}
        {menu.map((m) => (
          <div key={m.id} className="flex justify-between items-center">
            <div>
              <div className="font-medium">{m.name}</div>
              {m.price != null && <div className="text-sm text-gray-500">${m.price}</div>}
            </div>
            <div className="space-x-2">
              <button className="px-2 py-1 bg-blue-500 text-white rounded" onClick={() => addToCart(m)}>
                Add
              </button>
              <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => removeFromCart(m.id)}>
                Remove
              </button>
            </div>
          </div>
        ))}
        <button className="mt-4 px-3 py-2 bg-gray-300 rounded" onClick={onBack}>
          Back
        </button>
      </div>
    </div>
  );
};

type CartProps = {
  cart: MenuItem[];
  resetCart: () => void;
  removeFromCart: (id: string) => void;
  onBack: () => void;
};
const CartScreen: React.FC<CartProps> = ({ cart, resetCart, removeFromCart, onBack }) => {
  const total = cart.reduce((s, c) => s + (c.price ?? 0), 0);
  return (
    <div className="w-full max-w-md bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Cart</h2>
      <div className="space-y-2">
        {cart.length === 0 && <div className="text-gray-500">Cart is empty</div>}
        {cart.map((c) => (
          <div key={c.id} className="flex justify-between">
            <div>{c.name}</div>
            <div className="flex items-center space-x-2">
              {c.price != null && <div className="text-sm">${c.price}</div>}
              <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => removeFromCart(c.id)}>
                Remove
              </button>
            </div>
          </div>
        ))}
        <div className="font-semibold">Total: ${total}</div>
        <div className="flex space-x-2">
          <button className="px-3 py-2 bg-red-600 text-white rounded" onClick={resetCart}>
            Clear
          </button>
          <button className="px-3 py-2 bg-gray-300 rounded" onClick={onBack}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

type ChefProps = {
  addMenuItem: (item: MenuItem) => void;
  onBack: () => void;
};
const ChefScreen: React.FC<ChefProps> = ({ addMenuItem, onBack }) => {
  const addSample = () => {
    addMenuItem({ id: Date.now().toString(), name: "New Dish", price: 9.99 });
  };
  return (
    <div className="w-full max-w-sm bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Chef</h2>
      <div className="space-y-2">
        <button className="px-3 py-2 bg-blue-500 text-white rounded" onClick={addSample}>
          Add Sample Item
        </button>
        <button className="px-3 py-2 bg-gray-300 rounded" onClick={onBack}>
          Back
        </button>
      </div>
    </div>
  );
};

type Screen = "login" | "home" | "menu" | "cart" | "chef";

export default function App() {
  const [screen, setScreen] = useState<Screen>("login");
  const [userType, setUserType] = useState<"customer" | "chef" | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<MenuItem[]>([]);

  const addMenuItem = (item: MenuItem) => setMenuItems((prev) => [...prev, item]);

  const addToCart = (item: MenuItem) => setCart((prev) => [...prev, item]);
  const removeFromCart = (id: string) => setCart((prev) => prev.filter(i => i.id !== id));
  const resetCart = () => setCart([]);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      {screen === "login" && (
        <LoginScreen
          onLogin={(type) => {
            setUserType(type);
            setScreen("home");
          }}
        />
      )}
      {screen === "home" && (
        <HomeScreen
          onViewMenu={() => setScreen("menu")}
          onViewCart={() => setScreen("cart")}
          onBack={() => setScreen("login")}
          onChef={() => setScreen("chef")}
          userType={userType}
          menuCount={menuItems.length}
        />
      )}
      {screen === "menu" && (
        <MenuScreen
          menu={menuItems}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          onBack={() => setScreen("home")}
        />
      )}
      {screen === "cart" && (
        <CartScreen
          cart={cart}
          resetCart={resetCart}
          removeFromCart={removeFromCart}
          onBack={() => setScreen("home")}
        />
      )}
      {screen === "chef" && (
        <ChefScreen
          addMenuItem={addMenuItem}
          onBack={() => setScreen("home")}
        />
      )}
    </div>
  );
}
