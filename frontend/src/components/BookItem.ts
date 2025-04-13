import { LitElement, html, css } from "lit";
import { property, customElement } from "lit/decorators.js";
import { navigateTo } from "../main";

@customElement("book-item")
export class BookItem extends LitElement {
    @property({ type: Object }) book: any;

    static styles = css`
        :host {
            display: block;
            max-width: 600px;
            margin: 1rem auto;
        }

        .card {
            background: #fff;
            padding: 1.5rem;
            border-radius: 12px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
            transition: box-shadow 0.2s ease-in-out;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }

        .card:hover {
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.12);
        }

        .title {
            font-size: 1.2rem;
            font-weight: bold;
            color: #333;
        }

        .author {
            font-size: 1rem;
            color: #666;
        }

        .actions {
            display: flex;
            justify-content: flex-end;
            gap: 0.5rem;
        }

        button {
            padding: 0.5rem 0.75rem;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.9rem;
            transition: background 0.2s ease-in-out;
        }

        button:first-child {
            background-color: #e0f0ff;
            color: #0077cc;
        }

        button:first-child:hover {
            background-color: #cce7ff;
        }

        button:last-child {
            background-color: #ffe0e0;
            color: #cc0000;
        }

        button:last-child:hover {
            background-color: #ffcccc;
        }
    `;

    async deleteBook() {
        if (!confirm(`Delete "${this.book.title}"?`)) return;

        try {
            const res = await fetch(
                `http://localhost:8000/api/books/${this.book.id}`,
                {
                    method: "DELETE",
                    headers: {
                        "X-User-ID": "5",
                        "X-User-Role": "admin",
                        Accept: "application/json",
                    },
                },
            );

            if (!res.ok) throw new Error(await res.text());
            this.remove();
        } catch (err) {
            console.error("Failed to delete book:", err);
            alert("Could not delete book.");
        }
    }

    render() {
        if (!this.book) return html`<p>No book data.</p>`;

        return html`
            <div class="card">
                <div class="title">${this.book.title}</div>
                <div class="author">by ${this.book.author}</div>
                <div class="actions">
                    <button
                        @click=${() => navigateTo(`/books/${this.book.id}`)}
                    >
                        Details
                    </button>
                    <button @click=${this.deleteBook}>Delete</button>
                </div>
            </div>
        `;
    }
}
