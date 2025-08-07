import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShowUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    contact: '',
    user_type: ''
  });
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/v1/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data.users);
    } catch (error) {
      console.error('Failed to fetch users:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/v1/users/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Delete failed:', error.response?.data || error.message);
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user.id);
    setEditForm({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      contact: user.contact,
      user_type: user.type
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`/api/v1/users/edit/${editingUser}`, editForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error('Update failed:', error.response?.data || error.message);
    }
  };

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const filteredUsers = users.filter(user =>
    user.first_name.toLowerCase().includes(search.toLowerCase()) ||
    user.last_name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">All Users</h2>

      <input
        type="text"
        placeholder="Search by name or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border px-3 py-1 mb-4 w-full max-w-sm"
      />

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <>
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Contact</th>
                <th className="border px-4 py-2">Type</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map(user => (
                <tr key={user.id}>
                  <td className="border px-4 py-2">{user.id}</td>
                  <td className="border px-4 py-2">
                    {editingUser === user.id ? (
                      <>
                        <input
                          name="first_name"
                          value={editForm.first_name}
                          onChange={handleEditChange}
                          className="border p-1 w-24"
                        />
                        <input
                          name="last_name"
                          value={editForm.last_name}
                          onChange={handleEditChange}
                          className="border p-1 w-24 ml-1"
                        />
                      </>
                    ) : (
                      `${user.first_name} ${user.last_name}`
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    {editingUser === user.id ? (
                      <input
                        name="email"
                        value={editForm.email}
                        onChange={handleEditChange}
                        className="border p-1 w-40"
                      />
                    ) : (
                      user.email
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    {editingUser === user.id ? (
                      <input
                        name="contact"
                        value={editForm.contact}
                        onChange={handleEditChange}
                        className="border p-1 w-32"
                      />
                    ) : (
                      user.contact
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    {editingUser === user.id ? (
                      <select
                        name="user_type"
                        value={editForm.user_type}
                        onChange={handleEditChange}
                        className="border p-1"
                      >
                        <option value="staff">Staff</option>
                        <option value="admin">Admin</option>
                      </select>
                    ) : (
                      user.type
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    {editingUser === user.id ? (
                      <>
                        <button onClick={handleEditSubmit} className="text-green-600 hover:underline mr-2">
                          Save
                        </button>
                        <button onClick={() => setEditingUser(null)} className="text-gray-600 hover:underline">
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEditClick(user)} className="text-blue-600 hover:underline mr-2">
                          Edit
                        </button>
                        <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:underline">
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination controls */}
          <div className="mt-4 flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ShowUsers;
