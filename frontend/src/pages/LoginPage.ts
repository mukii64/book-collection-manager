import { html, css } from "lit";
import { navigateTo } from "../main";
import "../components/AppHeader";

const styles = css`
    :host {
        display: block;
        font-family: "Arial", sans-serif;
    }

    h1 {
        text-align: center;
        color: #4a90e2;
        font-size: 2rem;
        margin-top: 20px;
    }

    form {
        max-width: 400px;
        margin: 20px auto;
        padding: 20px;
        background-color: #f4f7fc;
        border-radius: 8px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }

    label {
        display: block;
        font-size: 1.1rem;
        margin-bottom: 10px;
        color: #333;
    }

    input[type="number"] {
        width: 100%;
        padding: 10px;
        font-size: 1rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        margin-bottom: 20px;
        outline: none;
    }

    input[type="number"]:focus {
        border-color: #4a90e2;
    }

    button {
        width: 100%;
        padding: 12px;
        background-color: #4a90e2;
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 1.2rem;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    button:hover {
        background-color: #357ab7;
    }

    .login-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background-color: #e5f3ff;
    }
`;

export async function showLoginPage() {
    const handleLoginSubmit = (e: Event) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const userId = (
            form.querySelector('input[name="user_id"]') as HTMLInputElement
        ).value;

        // Store the selected user ID in localStorage
        localStorage.setItem("user_id", userId);

        // Redirect to the books page
        navigateTo("books");
    };

    return html`
        <style>
            ${styles}
        </style>
        <app-header></app-header>
        <div class="login-container">
            <h1>Login</h1>
            <form @submit=${handleLoginSubmit}>
                <label>
                    Select User ID:
                    <input name="user_id" type="number" required />
                </label>
                <button type="submit">Login</button>
            </form>
        </div>
    `;
}
