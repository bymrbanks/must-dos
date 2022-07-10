import Reac, {useEffect} from "react";
import { MustDoListProps } from "./Interfaces";

function MustdoItems({ items,deleteItem,completeItem}: MustDoListProps) {


  const listItems = items.map((item) => {
    return (
      <li className={"flex flex-row justify-between items-center pt-2 pb-2 pl-3 pr-2 mb-5 rounded border" + (item.status ? " opacity-30" : "")} key={item.id}>
        <span className="text-sm p-2 px-3 text-white bg-gray-400 rounded">{item.priority}</span>
        <span className={"text-sm mr-4 font-bold" + (item.status ? " line-through" : "")}>{item.title}</span>
        {/* style check box */}
        <input className="hidden" type="checkbox" defaultChecked={item.status} />  {/* hidden input */}
        <span onClick={()=>{ completeItem(item.id)}} className={"text-sm p-2 px-3" + (item.status ? ' bg-green-400 text-white' : " bg-yellow-500 text-black")+" rounded"}>{item.status ? "Done" : "Not Done"}</span>
        {/* delete button */}
        <button onClick={()=>{ deleteItem(item.id)}} className="ml-5 text-sm p-2 px-3 text-white bg-red-400 rounded">Delete</button>
      </li>
    );
  });
  
  return <div>{listItems}</div>;
}

export default MustdoItems;
