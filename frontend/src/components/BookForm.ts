import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("book-form")
export class BookForm extends LitElement {
    static styles = css`
        .form-wrapper {
            max-width: 600px;
            margin: 2rem auto;
            padding: 2rem;
            background: #fff;
            border-radius: 12px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
        }

        form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        label {
            display: flex;
            flex-direction: column;
            font-weight: 500;
            color: #444;
        }

        input[type="text"],
        input[type="number"],
        input[type="date"],
        textarea {
            padding: 0.5rem;
            font-size: 1rem;
            border: 1px solid #ccc;
            border-radius: 8px;
            margin-top: 0.25rem;
        }

        input[type="checkbox"] {
            margin-top: 0.5rem;
            transform: scale(1.2);
        }

        button {
            padding: 0.75rem 1rem;
            font-size: 1rem;
            background: #0077cc;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: background 0.2s ease-in-out;
        }

        button:hover {
            background: #005fa3;
        }
    `;

    @property({ type: Object }) initialData: any = {};
    @property({ type: Function }) onSubmit: Function = () => {};
    @property({ type: Boolean }) isAdmin: boolean = false;

    render() {
        const currentUserId = localStorage.getItem("user_id");

        return html`
            <div class="form-wrapper">
                <form @submit=${this.handleSubmit}>
                    <label>
                        Title:
                        <input
                            name="title"
                            type="text"
                            required
                            .value=${this.initialData.title || ""}
                        />
                    </label>
                    <label>
                        Author:
                        <input
                            name="author"
                            type="text"
                            required
                            .value=${this.initialData.author || ""}
                        />
                    </label>
                    <label>
                        Description:
                        <textarea name="description" rows="3" required>
${this.initialData.description || ""}</textarea
                        >
                    </label>
                    <label>
                        Published Date:
                        <input
                            name="published_date"
                            type="date"
                            required
                            .value=${this.initialData.published_date || ""}
                        />
                    </label>
                    <!-- Hidden input for user ID -->
                    ${this.isAdmin
                        ? html`
                              <label>
                                  User ID:
                                  <input
                                      name="user_id"
                                      type="number"
                                      required
                                      .value=${this.initialData.user_id ||
                                      currentUserId ||
                                      ""}
                                  />
                              </label>
                          `
                        : html`
                              <input
                                  name="user_id"
                                  type="hidden"
                                  .value=${currentUserId || ""}
                              />
                          `}
                    <label>
                        Read:
                        <input
                            name="is_read"
                            type="checkbox"
                            ?checked=${this.initialData.is_read || false}
                        />
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </div>
        `;
    }

    private async handleSubmit(e: Event) {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const data = Object.fromEntries(new FormData(form));

        const book = {
            ...data,
            user_id: parseInt(data.user_id as string),
            is_read: data.is_read === "on",
        };

        this.onSubmit(book);
    }
}
