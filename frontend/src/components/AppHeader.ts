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
            background-color: #f8f9fa;
            color: #333;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            margin: 1rem;
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
            color: #4a90e2;
        }

        h1 span {
            font-size: 2rem;
        }

        .user-info {
            font-size: 1rem;
            font-weight: 500;
            color: #777;
        }

        nav {
            display: flex;
            align-items: center;
            gap: 1.5rem;
        }

        a {
            padding: 0.5rem 1rem;
            text-decoration: none;
            color: #4a90e2;
            font-size: 1rem;
            font-weight: 500;
            transition:
                background-color 0.3s ease,
                color 0.3s ease;
            cursor: pointer;
            border-radius: 8px;
        }

        a:hover {
            background-color: #e3f2fd;
            color: #357ab7;
        }

        .cta-button {
            padding: 0.5rem 1rem;
            background-color: #ffccbc;
            color: #333;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition:
                background-color 0.3s ease,
                transform 0.2s ease;
        }

        .cta-button:hover {
            background-color: #ffab91;
            transform: translateY(-2px); /
        }
    `;

    render() {
        const userId = localStorage.getItem("user_id");
        const isAdmin = localStorage.getItem("is_admin") === "true";

        return html`
            <header>
                <div class="left-section">
                    <h1 @click=${() => navigateTo("books")}>
                        <span>📚</span>
                    </h1>
                    ${userId
                        ? html`
                              <div class="user-info">
                                  User ID: ${userId} ${isAdmin ? "(Admin)" : ""}
                              </div>
                          `
                        : ""}
                </div>
                <nav>
                    <a @click=${() => navigateTo("all-books")}>Browse</a>
                    <a @click=${() => navigateTo("books")}>My Library</a>
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
        localStorage.removeItem("user_id");
        navigateTo("login");
    }
}
