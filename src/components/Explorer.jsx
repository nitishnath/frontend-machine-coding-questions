import React, { useState } from "react";
// import style from "./explorer.module.css";
import { AiOutlineRight } from "react-icons/ai";
import { AiOutlineDown } from "react-icons/ai";
import { AiFillFolderAdd } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";

const Explorer = ({ data, onUpdateData, onDeleteData }) => {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState("");
  const [fileFolderName, setFileFolderName] = useState("");
  const [isFolder, setIsFolder] = useState(false);

  const handleClick = (id) => {
    if (showInput) {
      setShowInput("");
      setFileFolderName("");
      setIsFolder(false);
    } else {
      setShowInput(id);
    }
  };

  const handleAddData = () => {
    if (!fileFolderName.trim()) return;

    const newItem = {
      id: Date.now().toString(),
      name: fileFolderName,
      isFolder: isFolder,
      items: isFolder ? [] : undefined,
    };

    // Call the parent's update function to properly update the state
    if (onUpdateData) {
      onUpdateData(data.id, newItem);
    }

    // Reset form
    setFileFolderName("");
    setIsFolder(false);
    setShowInput("");
  };

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            setExpand((prevState) => !prevState);
          }}
        >
          <span>
            {data.isFolder ? (
              expand ? (
                <AiOutlineDown />
              ) : (
                <AiOutlineRight />
              )
            ) : null}
          </span>
          <span style={{ fontSize: "20px", marginRight: "5px" }}>
            {data.name}
          </span>
        </div>
        {data.isFolder && (
          <>
            <AiFillFolderAdd
              onClick={() => handleClick(data.id)}
              style={{ cursor: "pointer" }}
            />
            {data.id === showInput && (
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginLeft: "5px",
                  alignItems: "center",
                }}
              >
                <input
                  placeholder="Enter name"
                  type="text"
                  value={fileFolderName}
                  onChange={(e) => {
                    setFileFolderName(e.target.value);
                  }}
                  autoFocus
                />
                <label
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <input
                    type="checkbox"
                    checked={isFolder}
                    onChange={(e) => setIsFolder(e.target.checked)}
                  />
                  <span>Folder</span>
                </label>
                <button type="submit" onClick={handleAddData}>
                  + Add
                </button>
                <button onClick={() => handleClick(data.id)}>Cancel</button>
              </div>
            )}
          </>
        )}
        <AiFillDelete
          style={{ cursor: "pointer" }}
          onClick={() => onDeleteData(data.id)}
        />
      </div>
      <div style={expand ? { display: "block" } : { display: "none" }}>
        {data.isFolder && (
          <div style={{ fontSize: "20px", margin: "10px 20px" }}>
            {data?.items.map((item, id) => (
              <Explorer
                key={item.id || id}
                data={item}
                onUpdateData={onUpdateData}
                onDeleteData={onDeleteData}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Explorer;
