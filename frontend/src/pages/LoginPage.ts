import { html, css } from "lit";
import { navigateTo } from "../main";
import "../components/AppHeader";

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

    .login-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        height: 100vh;
    }

    .art-section {
        background: url("/bookshelf.svg") no-repeat center center;
        background-size: cover;
        height: 100%;
    }

    .form-section {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 2rem;
        background-color: #f4f7fc;
        height: 100%;
    }

    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        max-width: 400px;
        width: 100%;
        padding: 30px;
        background: linear-gradient(135deg, #ffffff, #f4f7fc);
        border-radius: 16px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        margin: auto;
    }

    h1 {
        text-align: center;
        color: #4a90e2;
        font-size: 2.5rem;
        margin-bottom: 20px;
        font-weight: 700;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    label {
        display: block;
        font-size: 1.2rem;
        margin-bottom: 10px;
        color: #555;
        font-weight: 500;
    }

    input[type="number"],
    input[type="checkbox"] {
        margin-bottom: 20px;
    }

    input[type="number"] {
        width: 50%;
        padding: 12px;
        font-size: 1rem;
        border: 2px solid #ddd;
        border-radius: 8px;
        outline: none;
        transition:
            border-color 0.3s ease,
            box-shadow 0.3s ease;
    }

    input[type="number"]:focus {
        border-color: #4a90e2;
        box-shadow: 0 0 8px rgba(74, 144, 226, 0.5);
    }

    button {
        width: 100%;
        padding: 12px;
        background: linear-gradient(135deg, #4a90e2, #6fb3f2);
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 1.2rem;
        font-weight: 600;
        cursor: pointer;
        transition:
            background 0.3s ease,
            transform 0.2s ease;
        box-shadow: 0 4px 10px rgba(74, 144, 226, 0.3);
    }

    button:hover {
        background: linear-gradient(135deg, #357ab7, #4a90e2);
        transform: translateY(-2px);
    }

    button:active {
        transform: translateY(0);
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        .login-container {
            grid-template-columns: 1fr;
        }

        .art-section {
            height: 40%;
        }

        .form-section {
            height: 60%;
        }
    }
`;

export async function showLoginPage() {
    const handleLoginSubmit = (e: Event) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;

        const userId = (
            form.querySelector('input[name="user_id"]') as HTMLInputElement
        ).value;

        const isAdmin = (
            form.querySelector('input[name="is_admin"]') as HTMLInputElement
        ).checked;

        localStorage.setItem("user_id", userId);
        localStorage.setItem("is_admin", isAdmin ? "true" : "false");

        // Redirect to the books page
        navigateTo("books");
    };

    return html`
        <style>
            ${styles}
        </style>
        <div class="login-container">
            <!-- Left Section: Artwork -->
            <div class="art-section"></div>

            <!-- Right Section: Login Form -->
            <div class="form-section">
                <form @submit=${handleLoginSubmit}>
                    <h1>Login</h1>
                    <label>
                        Enter Your User ID:
                        <input name="user_id" type="number" min="1" required />
                    </label>
                    <label>
                        <input name="is_admin" type="checkbox" />
                        Log in as Admin
                    </label>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    `;
}
