import React from "react";

interface Props {
  onViewMenu: () => void;
  onViewCart: () => void;
  onBack: () => void;
  onChef: () => void;
  userType: "customer" | "chef" | null;
  menuCount: number;
}

export default function HomeScreen({ onViewMenu, onViewCart, onBack, onChef, userType, menuCount }: Props) {
  return (
    <div className="bg-blue-100 p-6 rounded-xl w-80 text-center">
      <h2 className="font-bold text-lg mb-4">
        Welcome {userType === "chef" ? "Chef!" : "Customer!"}
      </h2>
      <button onClick={onViewMenu} className="bg-blue-600 text-white w-full mb-2 p-2 rounded">
        View Menu ({menuCount})
      </button>
      <button onClick={onViewCart} className="bg-green-600 text-white w-full mb-2 p-2 rounded">
        View Cart
      </button>
      {userType === "chef" && (
        <button onClick={onChef} className="bg-yellow-500 text-white w-full mb-2 p-2 rounded">
          Add Menu Items
        </button>
      )}
      <button onClick={onBack} className="bg-red-600 text-white w-full p-2 rounded">
        Back
      </button>
    </div>
  );
}
