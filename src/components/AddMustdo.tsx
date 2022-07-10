import React, { useState } from "react";
import { Item, AddMustDoProps } from "./Interfaces";

function AddMustdo({ addItem }: AddMustDoProps) {
  const item = {
    id: "",
    title: "",
    priority: -1,
    description: "",
    status: false,
  }
  const [newItem, setNewItem] = useState<Item>(item);

  return (
    <div>
      <input
        className="border border-inherit p-2 mr-5"
        type="text"
        value={newItem.title}
        onChange={(e) => {
          setNewItem({ ...newItem, title: e.target.value });
        }}
      />
      <button
        onClick={() => {
          addItem(newItem);
          setNewItem(item)
        }}
      >
        Add Item
      </button>
    </div>
  );
}

export default AddMustdo;
