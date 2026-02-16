import React, { useState } from "react";
//import TrafficLight from "./components/Traffic-Light";
import Explorer from "./components/Explorer";
import { data as initialData } from "./constants/data";
import Pagination from "./components/Pagination.jsx";
import ReactMemoUseCase from "./components/ReactMemoUseCase.jsx";
import DebounceSearch from "./components/DebounceSearch.jsx";
import InfiniteScroll from "./components/infinite-scroll/infinite-scroll.jsx";
import InfiniteScrollPractice from "./components/infinite-scroll/infinite-scroll-practice.jsx";
import AutoComplete from "./components/auto-complete/auto-complete.jsx";
import ToDoList from "./components/to-do-list/to-do-list.jsx";

function App() {
  const [fileData, setFileData] = useState(initialData);

  // React requires state updates to be immutable. This function creates a completely new object structure rather than mutating the existing one.

  //This is implementing a Depth-First Search (DFS) with Pre-order traversal.
  const handleUpdateData = (parentId, newItem) => {
   
    //This updateItems function is a recursive function that updates the items array by adding a new item to the specified parent ID.
    const updateItems = (items) => {

      //I need to return a updated list 
      return items.map((item) => {

        //Case1: If the current item has the same ID as the parent ID, add the new item to its items array.
        if (item.id === parentId) {
          return {
            ...item,
            items: [...(item.items || []), newItem],
          };
        }

        //Case2: check if the current item has sub-items(is a folder)
        // if it's a folder but not the target, recursively calls updateItems on its children, this ensures we search deeper into the tree structure
        if (item.items) {
          return {
            ...item,
            items: updateItems(item.items),
          };
        }

        //Case3: If the current item doesn't have the same ID as the parent ID and doesn't have sub-items, return the item as is.
        return item;
      });
    };

    //Update the fileData state with the updated items
    setFileData((prevData) => ({
      ...prevData,
      items: updateItems(prevData.items),
    }));
  };

  const handleDeleteData = (itemId) => {
    const deleteData = (items) => {
      return items
        .filter((item) => item.id !== itemId)
        .map((item) => {
          if (item.items) {
            return {
              ...item,
              items: deleteData(item.items),
            };
          }
          return item; // if items are not present in item
        });
    };
    //Update the fileData state with the updated items
    setFileData((prevData) => ({
      ...prevData,
      items: deleteData(prevData.items),
    }));
  };

  // const handleUpdateData = (parentId, newItem) => {
  //   const updateItems = (items) => {
  //     return items.map((item) => {
  //       if (item.id === parentId) {
  //         return {
  //           ...item,
  //           items: [...(item.items || []), newItem],
  //         };
  //       }

  //       if (item.items) {
  //         return {
  //           ...item,
  //           items: updateItems(item.items),
  //         };
  //       }
  //       return item;
  //     });
  //   };

  //   setFileData((prevState) => ({
  //     ...prevState,
  //     items: updateItems(prevState.items),
  //   }));
  // };

  return (
    <>
      {/* <TrafficLight /> */}
      <div style={{ fontFamily: "sans-serif", textAlign: "center" }}>
        {/* File Explorer */}
        {/* Debounce Search */}
      </div>
      {/* <Explorer
        data={fileData}
        onUpdateData={handleUpdateData}
        onDeleteData={handleDeleteData}
      /> */}
      {/* <DebounceSearch /> */}
      {/* <Pagination /> */}
      {/* <InfiniteScroll /> */}
      {/* <InfiniteScrollPractice /> */}
      {/* <AutoComplete /> */}
      <ToDoList />

      {/* ReactMemo UseCase */}
      {/* <ReactMemoUseCase /> */}
    </>
  );
}

export default App;
