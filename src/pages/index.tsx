import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import MustdoList from "../components/MustdoList";
import { Item } from "../components/Interfaces";
import { useState, useEffect } from "react";
import AddMustdo from "../components/AddMustdo";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session } = useSession();

  const utils = trpc.useContext();
  let deleteMustDo = trpc.useMutation("mustdo.delete");
  let data = trpc.useQuery(["mustdo.getAll"]);
  let addMustDo = trpc.useMutation("mustdo.add");
  let updateMustDo = trpc.useMutation("mustdo.update");
  let mustDolist = data.data as Item[];

  const [items, setItems] = useState<Array<Item>>(mustDolist);

  useEffect(() => {
    if (data.status === "success" && data.data) {
      console.log(data.data,data.status);
      setItems(mustDolist);
    }
  }, [data]);

  const deleteItem = (id: string) => {
    deleteMustDo.mutate(
      { id },
      {
        onSuccess: () => {
          utils.invalidateQueries(["mustdo.getAll"]);
        },
      }
    );
  };

  const updateItem = (item: Item) => {
    updateMustDo.mutate(item, {
      onSuccess: () => {
        utils.invalidateQueries(["mustdo.getAll"]);
      },
    });
  };

  // add new item
  const addItem = (item: Item) => {
    if (item && session) {
      let currentUser = session.id;
      item.userId = currentUser as string;
      item.description = "";
      item.priority = -1;

      addMustDo.mutate(item, {
        onSuccess: () => {
          utils.invalidateQueries(["mustdo.getAll"]);
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
