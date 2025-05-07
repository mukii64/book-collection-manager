import { html, css } from "lit";
import { apiFetch } from "../utils/apiFetch";
import { navigateTo } from "../main";

const styles = css`
  :host {
      display: block;
      font-family: "Arial", sans-serif;
      background-color: #f4f7fc;
      padding: 2rem;
      min-height: 100vh;
  }
  h1 {
      text-align: center;
      color: #4a90e2;
      font-size: 2.5rem;
      margin-bottom: 20px;
      font-weight: 700;
  }
  .admin-list-container {
      max-width: 1000px;
      margin: 0 auto;
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
      padding: 2rem;
  }
  table {
      width: 100%;
      border-collapse: collapse;
  }
  th, td {
      padding: 12px;
      border-bottom: 1px solid #eee;
      text-align: left;
  }
  th {
      background-color: #f9fafb;
      font-weight: 600;
      color: #333;
  }
  tr:hover {
      background-color: #f1f5f9;
  }
  .action-buttons button {
      padding: 8px 12px;
      margin-right: 8px;
      border: none;
      border-radius: 4px;
      font-size: 0.9rem;
      cursor: pointer;
      transition: background 0.3s ease;
  }
  .edit-btn {
      background-color: #4a90e2;
      color: #fff;
  }
  .edit-btn:hover {
      background-color: #357ab7;
  }
  .delete-btn {
      background-color: #ef4444;
      color: #fff;
  }
  .delete-btn:hover {
      background-color: #dc2626;
  }
  form {
      margin-top: 2rem;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
  }
  form h2 {
      grid-column: 1 / -1;
      text-align: center;
      font-size: 1.8rem;
      color: #333;
      margin-bottom: 1rem;
  }
  form label {
      display: block;
      font-size: 1rem;
      color: #555;
      margin-bottom: 0.5rem;
      font-weight: 500;
  }
  form input, form select {
      width: 100%;
      padding: 10px;
      font-size: 1rem;
      border: 2px solid #ddd;
      border-radius: 8px;
      transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }
  form input:focus, form select:focus {
      border-color: #4a90e2;
      box-shadow: 0 0 8px rgba(74, 144, 226, 0.5);
  }
  form button {
      grid-column: 1 / -1;
      padding: 12px;
      background: linear-gradient(135deg, #4a90e2, #6fb3f2);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.3s ease, transform 0.2s ease;
      box-shadow: 0 4px 10px rgba(74, 144, 226, 0.3);
  }
  form button:hover {
      background: linear-gradient(135deg, #357ab7, #4a90e2);
      transform: translateY(-2px);
  }
  form button:active {
      transform: translateY(0);
  }
`;

export async function showAdminUserPage() {
  let users: any[] = [];
  async function fetchUsers() {
      try {
          const res = await apiFetch("http://localhost:8000/api/admin/users");
          users = await res.json();
          render();
      } catch (error) {
          console.error("Error fetching users", error);
          alert("Error fetching users");
      }
  }
  fetchUsers();

  const handleDelete = async (id: number) => {
      if (!confirm("Are you sure you want to delete this user?")) return;
      try {
          await apiFetch(`http://localhost:8000/api/admin/users/${id}`, {
              method: "DELETE",
          });
          fetchUsers();
      } catch (error) {
          console.error("Error deleting user", error);
          alert("Error deleting user");
      }
  };

  const handleSubmit = async (e: Event) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      const data: any = {};
      formData.forEach((value, key) => {
          data[key] = value;
      });
      try {
          await apiFetch("http://localhost:8000/api/admin/users", {
              method: "POST",
              body: JSON.stringify(data),
          });
          form.reset();
          fetchUsers();
      } catch (error) {
          console.error("Error creating user", error);
          alert("Error creating user");
      }
  };

  const render = () => html`
      <style>
          ${styles}
      </style>
      <h1>Admin User Management</h1>
      <div class="admin-list-container">
          <table>
              <thead>
                  <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Actions</th>
                  </tr>
              </thead>
              <tbody>
                  ${users.map(
                      (user: any) => html`
                          <tr>
                              <td>${user.id}</td>
                              <td>${user.name}</td>
                              <td>${user.email}</td>
                              <td>${user.role}</td>
                              <td class="action-buttons">
                                  <button class="edit-btn" @click=${() =>
                                      navigateTo(`admin-users/edit/${user.id}`)}>
                                      Edit
                                  </button>
                                  <button class="delete-btn" @click=${() =>
                                      handleDelete(user.id)}>
                                      Delete
                                  </button>
                              </td>
                          </tr>
                      `
                  )}
              </tbody>
          </table>
          ${users.length === 0 ? html`<p>No users found.</p>` : ""}
          <form @submit=${handleSubmit}>
              <h2>Create New User</h2>
              <label>
                  Name:
                  <input name="name" required />
              </label>
              <label>
                  Email:
                  <input name="email" type="email" required />
              </label>
              <label>
                  Password:
                  <input name="password" type="password" required />
              </label>
              <label>
                  Role:
                  <select name="role" required>
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                  </select>
              </label>
              <button type="submit">Create User</button>
          </form>
      </div>
  `;
  
  return render();
}
