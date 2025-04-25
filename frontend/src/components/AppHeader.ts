import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { navigateTo } from "../main";

@customElement("app-header")
export class AppHeader extends LitElement {
    static styles = css`
        :host {
            display: block;
        }

        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 2rem;
            background-color: #4a90e2; /* Modern blue color */
            color: white;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .left-section {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        h1 {
            font-size: 1.5rem;
            margin: 0;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            cursor: pointer;
        }

        h1 span {
            font-size: 2rem;
        }

        .user-info {
            font-size: 1rem;
            font-weight: 500;
        }

        nav {
            display: flex;
            align-items: center;
            gap: 1.5rem;
        }

        a {
            padding: 0.5rem 1rem;
            text-decoration: none;
            color: white;
            font-size: 1rem;
            font-weight: 500;
            transition: color 0.3s ease;
            cursor: pointer;
        }

        a:hover {
            color: #d1eaff; /* Lighter blue for hover effect */
        }

        .cta-button {
            padding: 0.5rem 1rem;
            background-color: #ff6f61; /* Modern coral color */
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .cta-button:hover {
            background-color: #ff867c; /* Lighter coral for hover effect */
        }
    `;

    render() {
        // Get the user ID from localStorage
        const userId = localStorage.getItem("user_id");

        return html`
            <header>
                <div class="left-section">
                    <h1 @click=${() => navigateTo("books")}>
                        <span>📚</span>
                    </h1>
                    ${userId
                        ? html`<div class="user-info">User ID: ${userId}</div>`
                        : ""}
                </div>
                <nav>
                    <a @click=${() => navigateTo("books")}>Books</a>
                    <a @click=${() => navigateTo("about")}>About</a>

                    ${userId
                        ? html` <a @click=${this.handleLogout}>Logout</a> `
                        : html`
                              <a @click=${() => navigateTo("login")}>Login</a>
                          `}

                    <button
                        class="cta-button"
                        @click=${() => navigateTo("add")}
                    >
                        + Add Book
                    </button>
                </nav>
            </header>
        `;
    }

    handleLogout() {
        // Remove user ID from localStorage and redirect to login page
        localStorage.removeItem("user_id");
        navigateTo("login");
    }
}
