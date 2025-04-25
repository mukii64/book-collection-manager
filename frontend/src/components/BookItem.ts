import { LitElement, html, css } from "lit";
import { property, customElement } from "lit/decorators.js";
import { navigateTo } from "../main";

@customElement("book-item")
export class BookItem extends LitElement {
    @property({ type: Object }) book: any;

    static styles = css`
        :host {
            display: block;
            width: 100%;
            aspect-ratio: 3 / 2;
        }

        .card {
            background: #fff;
            padding: 1.25rem;
            border-radius: 12px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
            transition:
                transform 0.2s ease,
                box-shadow 0.2s ease;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            overflow: hidden;
        }

        .card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
        }

        .title {
            font-size: 1.15rem;
            font-weight: 600;
            color: #222;
            margin-bottom: 0.5rem;
            word-wrap: break-word;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .author {
            font-size: 0.95rem;
            color: #777;
            margin-bottom: auto;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .actions {
            display: flex;
            justify-content: flex-end;
            margin-top: 1rem;
        }

        button {
            padding: 0.4rem 0.75rem;
            background-color: #f44336;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 0.85rem;
            cursor: pointer;
        }

        button:hover {
            background-color: #d32f2f;
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
                    <button @click=${this.deleteBook}>Delete</button>
                </div>
            </div>
        `;
    }
}
