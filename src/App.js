import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";
import { FaLeaf } from "react-icons/fa";

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name) {
      // display alert
      showAlert(true, "danger", "Please enter a value");
    } else if (name && isEditing) {
      // deal with edit
      let updatedList = list.map((item) => {
        if (item.id === editID) return { ...item, title: name };
        else return item;
      });

      setList(updatedList);
      setName("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success", "item updated");
    } else {
      // deal with item creation
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
      showAlert(true, "success", "item added to the list");
    }
  };

  const showAlert = (show = false, type = "", message = "") => {
    setAlert({ show, type, message });
  };

  const clearList = () => {
    showAlert(true, "danger", "emptied the list");
    setList([]);
  };

  const removeItem = (id) => {
    showAlert(true, "danger", "item removed");

    let newList = list.filter((item) => item.id !== id);
    setList(newList);
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} showAlert={showAlert} list={list} />}
        <h3>grocery list</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g. eggs"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "add"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
