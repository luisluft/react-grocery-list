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

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} showAlert={showAlert} />}
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
          <List items={list} />
          <button className="clear-btn">clear items</button>
        </div>
      )}
    </section>
  );
}

export default App;
