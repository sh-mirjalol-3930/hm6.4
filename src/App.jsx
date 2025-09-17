import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://68ca8081430c4476c349bc0a.mockapi.io/hwTodoList/users";

const App = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    axios.get(API_URL).then((res) => setUsers(res.data));
  }, []);

  const saveUser = async () => {
    if (!name.trim() || !contact.trim()) return;

    if (editingId) {
      const res = await axios.put(`${API_URL}/${editingId}`, {
        name,
        contact,
      });
      setUsers(users.map((u) => (u.id == editingId ? res.data : u)));
      setEditingId(null);
    } else {
      const res = await axios.post(API_URL, { name, contact });
      setUsers([...users, res.data]);
    }

    setName("");
    setContact("");
  };

  const del = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setUsers(users.filter((user) => user.id !== id));
  };
  const editUser = (id) => {
    const userToEdit = users.find((u) => u.id === id);
    if (!userToEdit) return;
    setName(userToEdit.name);
    setContact(userToEdit.contact);
    setEditingId(id);
  };

  return (
    <div>
      <div className="container">
        <h1 className="font-mono py-[10px] text-[20px] font-[900] text-gray-600">CRUD</h1>
        <div className="flex justify-between items-baseline">
          <div className="flex flex-col items-baseline gap-[10px]">
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-[600px] px-[20px] bg-[#bbbbf3] rounded-[8px] text-[black] py-[10px]" type="text" placeholder="Name"/>
            <input value={contact} onChange={(e) => setContact(e.target.value)} className="w-[600px] px-[20px] bg-[#bbbbf3] rounded-[8px] text-[black] py-[10px]" type="text" placeholder="Contact"/>
            <button onClick={saveUser} className="bg-blue-500 text-white px-[20px] rounded-[8px] py-[5px]" type="submit">{editingId ? "Update" : "Add +"}</button>
          </div>

          <ul className="flex flex-col gap-[10px]">
            {users.map((user) => (
              <li key={user.id} className="w-[600px] justify-between px-[10px] pl-[20px] flex items-center bg-[#bbbbf3] rounded-[8px] text-[black] py-[5px]">
                <div className="flex items-center gap-[10px]">
                  <b>{user.name}</b>
                  <p className="text-gray-800">{user.contact}</p>
                </div>
                <div className="flex items-center gap-[10px]">
                  <button onClick={() => editUser(user.id)} className="ml-auto bg-green-500 text-white px-[20px] rounded-[8px] py-[5px]">Edit</button>
                  <button onClick={() => del(user.id)} className="ml-auto bg-red-500 text-white px-[20px] rounded-[8px] py-[5px]">Delete</button>
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
