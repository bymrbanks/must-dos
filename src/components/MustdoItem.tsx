import React from "react";
import { Item, MustDoItemProps } from "./Interfaces";

function MustDoItem({ item, deleteItem, updateItem }: MustDoItemProps) {
  
  const toggleComplete = (item: Item) => {
    item.completed = !item.completed;
    updateItem(item);
  };
  const changePriority = (item: Item) => {
    item.priority = item.priority + 1;
    updateItem(item);
  };

  const changeTitle = (text: string) => {
    item.title = text;
    updateItem(item);
  };

  return (
    <li
      className={
        "flex flex-row justify-between items-center pt-2 pb-2 pl-3 pr-2 mb-5 rounded border" +
        (item.completed ? " opacity-30" : "")
      }
    >
      <span
        onClick={() => {
          changePriority(item);
        }}
        className="text-sm p-2 px-3 text-white bg-gray-400 rounded"
      >
        {item.priority}
      </span>
      <input
        type="text "
        onChange={(e) => {
          changeTitle(e.target.value);
        }}
        className={
          "text-sm mr-4 font-bold p-2 px-3" +
          (item.completed ? " line-through" : "")
        }
        value={item.title}
      />
      <input
        className="hidden"
        type="checkbox"
        defaultChecked={item.completed}
      />{" "}
      <span
        onClick={() => {
          toggleComplete(item);
        }}
        className={
          "text-sm p-2 px-3" +
          (item.completed
            ? " bg-green-400 text-white"
            : " bg-yellow-500 text-black") +
          " rounded"
        }
      >
        {item.completed ? "Not Done" : " Done"}
      </span>
      <button
        onClick={() => {
          deleteItem(item.id);
        }}
      className="ml-5 text-sm p-2 px-3 text-white bg-red-400 rounded">X</button>
    </li>
  );
}

export default MustDoItem;
