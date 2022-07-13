import { text } from "node:stream/consumers";
import Reac, { useEffect } from "react";
import { Item, MustDoListProps } from "./Interfaces";
import MustdoItem from "./MustdoItem";

function MustdoList({ items, deleteItem, updateItem }: MustDoListProps) {

  const listItems = items.map((item) => {
    return (
      <MustdoItem
        key={item.id}
        item={item}
        deleteItem={deleteItem}
        updateItem={updateItem}
      />
    );
  });

  return <div>{listItems}</div>;
}

export default MustdoList;
