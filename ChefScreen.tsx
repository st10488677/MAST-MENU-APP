import React, { useState } from "react";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  course: string;
  price: number;
}

type Screen = "home" | "chef" | "menu";

/**
 * Local ChefScreen component so props are correctly typed.
 * Props:
 *  - addMenuItem: (item: MenuItem) => void
 *  - onBack: () => void
 */
const ChefScreen: React.FC<{
  addMenuItem: (item: MenuItem) => void;
  onBack: () => void;
}> = ({ addMenuItem, onBack }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState("");
  const [price, setPrice] = useState<number>(0);

  const submit = () => {
    if (!name) return;
    const item: MenuItem = {
      id: Date.now().toString(),
      name,
      description,
      course,
      price,
    };
    addMenuItem(item);
    setName("");
    setDescription("");
    setCourse("");
    setPrice(0);
  };

  return (
    <div className="w-80 bg-yellow-50 p-6 rounded-xl">
      <h2 className="text-xl font-bold mb-4">Chef Screen</h2>

      <label className="block mb-2">
        <div className="text-sm">Name</div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </label>

      <label className="block mb-2">
        <div className="text-sm">Description</div>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </label>

      <label className="block mb-2">
        <div className="text-sm">Course</div>
        <input
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </label>

      <label className="block mb-2">
        <div className="text-sm">Price</div>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full p-2 border rounded"
        />
      </label>

      <div className="flex gap-2 mt-4">
        <button
          className="p-2 bg-green-600 text-white rounded"
          onClick={submit}
        >
          Add Item
        </button>
        <button
          className="p-2 bg-gray-600 text-white rounded"
          onClick={onBack}
        >
          Back
        </button>
      </div>
    </div>
  );
};
export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const addMenuItem = (item: MenuItem) => {
    setMenuItems((prev) => [...prev, item]);
    setScreen("menu");
  };

  return (
    <div className="p-6">
      {screen === "home" && (
        <div className="w-80 bg-yellow-50 p-6 rounded-xl">
          <h1 className="text-xl font-bold mb-4">Admin Home</h1>
          <button
            className="w-full mb-2 p-2 bg-green-600 text-white rounded"
            onClick={() => setScreen("chef")}
          >
            Open Chef Screen
          </button>
          <button
            className="w-full p-2 bg-gray-600 text-white rounded"
            onClick={() => setScreen("menu")}
          >
            View Menu
          </button>
        </div>
      )}

      {screen === "chef" && (
        <ChefScreen
          addMenuItem={addMenuItem}
          onBack={() => setScreen("home")}
        />
      )}

      {screen === "menu" && (
        <div className="w-96 bg-white p-6 rounded-xl border">
          <h2 className="text-xl font-bold mb-4">Menu</h2>
          <button
            className="mb-4 p-2 bg-gray-600 text-white rounded"
            onClick={() => setScreen("home")}
          >
            Back to Home
          </button>
          <ul>
            {menuItems.length === 0 && <li>No items yet</li>}
            {menuItems.map((m) => (
              <li key={m.id} className="mb-2">
                <div className="font-semibold">{m.name} — ${m.price}</div>
                <div className="text-sm text-gray-600">{m.description}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}