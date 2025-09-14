import React, { useState } from "react";

const App = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );

  const saveToLocal = (arr) => {
    localStorage.setItem("users", JSON.stringify(arr));
  };

  const del = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    saveToLocal(updatedUsers);
  };

  const addUser = () => {
    if (!name.trim() || !contact.trim()) return;

    const newUser = {
      id: Date.now(),
      name,
      contact,
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    saveToLocal(updatedUsers);

    setName("");
    setContact("");
  };

  const editUser = (id) => {
    const userToEdit = users.find((u) => u.id === id);
    if (!userToEdit) return;

    setName(userToEdit.name);
    setContact(userToEdit.contact);
    del(id); // eski userni o‘chirib tashlaymiz
  };

  return (
    <div>
      <div className="container">
        <h1 className="font-mono py-[10px] text-[20px] font-[900] text-gray-600">
          CRUD
        </h1>
        <div className="flex justify-between items-baseline">
          <div className="flex flex-col items-baseline gap-[10px]">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-[600px] px-[20px] bg-[#bbbbf3] rounded-[8px] text-[black] py-[5px]"
              type="text"
              placeholder="Name"
            />
            <input
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-[600px] px-[20px] bg-[#bbbbf3] rounded-[8px] text-[black] py-[5px]"
              type="text"
              placeholder="Contact"
            />
            <button
              onClick={addUser}
              className="bg-blue-500 text-white px-[20px] rounded-[8px] py-[5px]"
              type="submit"
            >
              Add +
            </button>
          </div>

          <ul className="flex flex-col gap-[10px]">
            {users.map((user) => (
              <li
                key={user.id}
                className="w-[600px] justify-between px-[10px] pl-[20px] flex items-center bg-[#bbbbf3] rounded-[8px] text-[black] py-[5px]"
              >
                <div className="flex items-center gap-[10px]">
                  <b>{user.name}</b>
                  <p className="text-gray-800">{user.contact}</p>
                </div>
                <div className="flex items-center gap-[10px]">
                  <button
                    onClick={() => editUser(user.id)}
                    className="ml-auto bg-blue-500 text-white px-[20px] rounded-[8px] py-[5px]"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => del(user.id)}
                    className="ml-auto bg-blue-500 text-white px-[20px] rounded-[8px] py-[5px]"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
