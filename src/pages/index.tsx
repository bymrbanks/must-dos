import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import MustdoList from "../components/MustdoList";
import { Item } from "../components/Interfaces";
import { useState, useEffect } from "react";
import AddMustdo from "../components/AddMustdo";
import { QueryClient } from "react-query";
// @ts-ignore
import { v4 as uuidv4 } from "uuid";

const Home: NextPage = () => {
  const utils = trpc.useContext();
  let data = trpc.useQuery(["example.getAll"]);
  let deleteMustDo = trpc.useMutation("example.delete");
  let addMustDo = trpc.useMutation("example.add");
  let updateMustDo = trpc.useMutation("example.update");
  // let complete = trpc.useMutation("example.complete")
  // let add = trpc.useMutation("example.add")

  let queryItems = data.data ? data.data : [];

  const [items, setItems] = useState<Array<Item>>(queryItems);

  useEffect(() => {
    if (data.status && data.data) {
      setItems(data.data);
    }
  }, [data]);

  const deleteItem = (id: string) => {
    deleteMustDo.mutate(
      { id },
      {
        onSuccess: () => {
          utils.invalidateQueries(["example.getAll"]);
        },
      }
    );
  };

  const updateItem = (item: Item) => {
    updateMustDo.mutate(item,{
        onSuccess: () => {
          utils.invalidateQueries(["example.getAll"]);
        },
      }
    );
  };

  // add new item
  const addItem = (item: Item) => {
    if (item) {
      let currentUser = "cl5fwr5670052j7yccf34qwxw";
      item.userId = currentUser;
      item.description = "";
      item.priority = -1;

      console.log(item);

      addMustDo.mutate(item, {
        onSuccess: () => {
          utils.invalidateQueries(["example.getAll"]);
        },
      });
    }
  };


  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-screen min-h-screen flex flex-col justify-center items-center p-4 overflow-y-scroll">
        {/* create three columns with list of todo items */}
        <div className="flex flex-col justify-center items-center w-6/12">
          <h1 className="text-2xl font-bold mb-5">Todo</h1>
          <ul className="w-full ">
            {/* list of todo items */}
            <MustdoList
              items={items}
              deleteItem={deleteItem}
              updateItem={updateItem}
            />
            <AddMustdo addItem={addItem} />
          </ul>
        </div>
        {/* end of three columns */}
      </div>
    </>
  );
};

export default Home;
