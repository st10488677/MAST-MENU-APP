
import React, { useState } from "react";

type MenuItem = {
  id: string;
  name: string;
  description?: string;
  course?: string;
  price: number;
  image?: string;
};

interface Props {
  menu: MenuItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (id: string) => void;
  onBack: () => void;
}

const DEFAULT_IMAGES: Record<string, string> = {
  Starter: "https://via.placeholder.com/360x200?text=Starter",
  Main: "https://via.placeholder.com/360x200?text=Main+Course",
  Dessert: "https://via.placeholder.com/360x200?text=Dessert",
  Default: "https://via.placeholder.com/360x200?text=Menu+Item",
};

const normalizeCourse = (c?: string) => {
  if (!c) return "";
  const s = c.toLowerCase();
  if (s.includes("starter")) return "Starter";
  if (s.includes("main")) return "Main";
  if (s.includes("dessert")) return "Dessert";
  return c.charAt(0).toUpperCase() + c.slice(1);
};

export default function MenuScreen({ menu, addToCart, removeFromCart, onBack }: Props) {
  const [filter, setFilter] = useState<"All" | "Starter" | "Main" | "Dessert">("All");
  const filters: { key: typeof filter; label: string }[] = [
    { key: "All", label: "All" },
    { key: "Starter", label: "Starters" },
    { key: "Main", label: "Main Course" },
    { key: "Dessert", label: "Desserts" },
  ];

  const itemsFor = (courseKey?: string) =>
    menu.filter((m) => normalizeCourse(m.course) === (courseKey ?? ""));

  const filtered =
    filter === "All" ? menu : menu.filter((m) => normalizeCourse(m.course) === filter);

  return (
    <div className="bg-yellow-100 p-4 rounded-xl w-96 max-h-[80vh] overflow-auto mx-auto">
      {/* optional logo */}
      <div className="flex justify-center mb-3">
        <img
          src="https://via.placeholder.com/220x80?text=Menu+Logo"
          alt="Menu logo"
          className="w-44 object-contain"
        />
      </div>

      <h2 className="text-2xl font-bold text-center mb-3">Our Meals</h2>

      <div className="flex gap-2 justify-center mb-4 flex-wrap">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-3 py-1 rounded-full text-sm ${
              filter === f.key ? "bg-blue-600 text-white" : "bg-white text-gray-700 border"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* When "All" show grouped sections like the image, otherwise show filtered list */}
      {filter === "All" ? (
        <>
          {/* Starters */}
          <div className="mb-4">
            <div className="text-sm font-semibold uppercase mb-2">Starters</div>
            {itemsFor("Starter").length === 0 && <div className="text-sm text-gray-500">No starters</div>}
            {itemsFor("Starter").map((item) => (
              <div key={item.id} className="bg-white p-3 mb-3 rounded shadow flex gap-3">
                <img
                  src={item.image ?? DEFAULT_IMAGES["Starter"]}
                  alt={item.name}
                  className="w-28 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <div className="font-bold">{item.name}</div>
                  <div className="text-xs text-gray-600">{item.description}</div>
                  <div className="mt-2 flex gap-2 items-center">
                    <span className="font-semibold">PRICE: R{item.price}</span>
                    <button
                      onClick={() => addToCart(item)}
                      className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Course */}
          <div className="mb-4">
            <div className="text-sm font-semibold uppercase mb-2">Main Course</div>
            {itemsFor("Main").length === 0 && <div className="text-sm text-gray-500">No mains</div>}
            {itemsFor("Main").map((item) => (
              <div key={item.id} className="bg-white p-3 mb-3 rounded shadow flex gap-3">
                <img
                  src={item.image ?? DEFAULT_IMAGES["Main"]}
                  alt={item.name}
                  className="w-28 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <div className="font-bold">{item.name}</div>
                  <div className="text-xs text-gray-600">{item.description}</div>
                  <div className="mt-2 flex gap-2 items-center">
                    <span className="font-semibold">PRICE: R{item.price}</span>
                    <button
                      onClick={() => addToCart(item)}
                      className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desserts */}
          <div className="mb-4">
            <div className="text-sm font-semibold uppercase mb-2">Desserts</div>
            {itemsFor("Dessert").length === 0 && <div className="text-sm text-gray-500">No desserts</div>}
            {itemsFor("Dessert").map((item) => (
              <div key={item.id} className="bg-white p-3 mb-3 rounded shadow flex gap-3">
                <img
                  src={item.image ?? DEFAULT_IMAGES["Dessert"]}
                  alt={item.name}
                  className="w-28 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <div className="font-bold">{item.name}</div>
                  <div className="text-xs text-gray-600">{item.description}</div>
                  <div className="mt-2 flex gap-2 items-center">
                    <span className="font-semibold">PRICE: R{item.price}</span>
                    <button
                      onClick={() => addToCart(item)}
                      className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          {filtered.length === 0 && <p className="text-center text-sm">No items for "{filter}"</p>}
          {filtered.map((item) => (
            <div key={item.id} className="bg-white p-3 mb-3 rounded shadow flex gap-3">
              <img
                src={item.image ?? DEFAULT_IMAGES[normalizeCourse(item.course) ?? "Default"]}
                alt={item.name}
                className="w-28 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-xs text-gray-600">{item.description}</p>
                <div className="mt-2 flex gap-2 items-center">
                  <span className="font-semibold">PRICE: R{item.price}</span>
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                    onClick={() => addToCart(item)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </>
      )}

      <button onClick={onBack} className="bg-gray-500 text-white w-full p-2 rounded mt-3">
        Back
      </button>
    </div>
  );
}