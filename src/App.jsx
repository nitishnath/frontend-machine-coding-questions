import { useState } from "react";
import TrafficLight from "./components/Traffic-Light";
import Explorer from "./components/Explorer";
import { data as initialData } from "./constants/data";

function App() {
  const [fileData, setFileData] = useState(initialData);

  // React requires state updates to be immutable. This function creates a completely new object structure rather than mutating the existing one.

  //This is implementing a Depth-First Search (DFS) with Pre-order traversal.
  const handleUpdateData = (parentId, newItem) => {
    const updateItems = (items) => {
      return items.map((item) => {
        if (item.id === parentId) {
          return {
            ...item,
            items: [...(item.items || []), newItem],
          };
        }
        //check if the current item has sub-items(is a folder)
        // if it's a folder but not the target, recursively calls updateItems on its children, this ensures we search deeper into the tree structure
        if (item.items) {
          return {
            ...item,
            items: updateItems(item.items),
          };
        }
        return item;
      });
    };

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
        File Explorer
      </div>
      <Explorer
        data={fileData}
        onUpdateData={handleUpdateData}
        onDeleteData={handleDeleteData}
      />
    </>
  );
}

export default App;
