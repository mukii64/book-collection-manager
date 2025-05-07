import { html, css } from "lit";
import { apiFetch } from "../utils/apiFetch";
import { navigateTo } from "../main";

const styles = css`
  form {
    margin: 20px;
  }
  label {
    display: block;
    margin-bottom: 10px;
  }
`;

export async function showAdminUserEditPage(userId: string) {
  let user: any = null;

  async function fetchUser() {
    try {
      const res = await apiFetch(`http://localhost:8000/api/admin/users/${userId}`);
      user = await res.json();
      render();
    } catch (error) {
      console.error("Error fetching user", error);
      alert("Error fetching user");
    }
  }
  fetchUser();

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data: any = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    try {
      await apiFetch(`http://localhost:8000/api/admin/users/${userId}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      navigateTo("admin-users");
    } catch (error) {
      console.error("Error updating user", error);
      alert("Error updating user");
    }
  };

  const render = () => html`
    <style>
      ${styles}
    </style>
    <h1>Edit User</h1>
    <form @submit=${handleSubmit}>
      <label>
        Name:
        <input name="name" type="text" .value=${user?.name || ""} required />
      </label>
      <label>
        Email:
        <input name="email" type="email" .value=${user?.email || ""} required />
      </label>
      <label>
        Password (leave empty to keep unchanged):
        <input name="password" type="password" />
      </label>
      <label>
        Role:
        <select name="role" required>
          <option value="user" ?selected=${user?.role === "user"}>User</option>
          <option value="admin" ?selected=${user?.role === "admin"}>Admin</option>
        </select>
      </label>
      <button type="submit">Update User</button>
    </form>
  `;
  
  return render();
}
import { html, css } from "lit";
import { navigateTo } from "../main";

const styles = css`
    :host {
        display: block;
        font-family: "Arial", sans-serif;
        height: 100%;
    }
    html,
    body {
        margin: 0;
        padding: 0;
        overflow: hidden;
        height: 100%;
    }
    .edit-container {
        display: grid; 
        grid-template-columns: 1fr; 
        height: 100vh;
        background-color: #f4f7fc;
        justify-content: center;
        align-items: center;
    }
    form {
        display: flex;
        flex-direction: column;
        max-width: 500px;
        width: 100%;
        padding: 30px;
        background: #fff;
        border-radius: 16px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        margin: auto;
    }
    h1 {
        text-align: center;
        color: #4a90e2;
        font-size: 2rem;
        margin-bottom: 20px;
        font-weight: 700;
    }
    label {
        font-size: 1rem;
        margin-bottom: 8px;
        color: #555;
        font-weight: 500;
    }
    input,
    select {
        padding: 12px;
        font-size: 1rem;
        border: 2px solid #ddd;
        border-radius: 8px;
        outline: none;
        margin-bottom: 20px;
        transition: border-color 0.3s ease, box-shadow 0.3s ease;
    }
    input:focus,
    select:focus {
        border-color: #4a90e2;
        box-shadow: 0 0 8px rgba(74, 144, 226, 0.5);
    }
    button {
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
    button:hover {
        background: linear-gradient(135deg, #357ab7, #4a90e2);
        transform: translateY(-2px);
    }
    button:active {
        transform: translateY(0);
    }
`;

export async function showAdminUserEditPage(userId: string) {
    // Fetch the admin user data using the Sanctum token for authentication.
    let user: any = null;
    try {
        const res = await fetch(`http://localhost:8000/api/admin/users/${userId}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
        });
        if (!res.ok) {
            throw new Error("Failed to fetch user data");
        }
        user = await res.json();
    } catch (error) {
        console.error(error);
        alert("Error fetching user data");
        // Fallback user data if error occurs.
        user = { id: userId, name: "", email: "", role: "user" };
    }

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const name = (form.querySelector('input[name="name"]') as HTMLInputElement).value;
        const email = (form.querySelector('input[name="email"]') as HTMLInputElement).value;
        const role = (form.querySelector('select[name="role"]') as HTMLSelectElement).value;

        try {
            const res = await fetch(`http://localhost:8000/api/admin/users/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ name, email, role }),
            });
            if (!res.ok) {
                throw new Error("Failed to update user");
            }
            alert("User updated successfully");
            navigateTo("admin-users");
        } catch (error) {
            console.error(error);
            alert("Error updating user");
        }
    };

    return html`
        <style>
            ${styles}
        </style>
        <div class="edit-container">
            <form @submit=${handleSubmit}>
                <h1>Edit User</h1>
                <label for="name">Name</label>
                <input type="text" name="name" .value=${user?.name || ""} placeholder="Name" required />
                <label for="email">Email</label>
                <input type="email" name="email" .value=${user?.email || ""} placeholder="Email" required />
                <label for="role">Role</label>
                <select name="role" required>
                    <option value="user" ?selected=${user?.role === "user"}>User</option>
                    <option value="admin" ?selected=${user?.role === "admin"}>Admin</option>
                </select>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    `;
}
