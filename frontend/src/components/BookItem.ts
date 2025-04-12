import { LitElement, html, css } from "lit";
import { property, customElement } from "lit/decorators.js";

@customElement("book-item")
export class BookItem extends LitElement {
    @property({ type: Object }) book: any;

    static styles = css`
        li {
            list-style: none;
            border: 1px solid #ddd;
            padding: 1rem;
            margin-bottom: 1rem;
            border-radius: 8px;
            background: #f9f9f9;
        }

        .title {
            font-weight: bold;
            font-size: 1.2rem;
        }

        button {
            margin-top: 0.5rem;
            background-color: #4caf50;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            cursor: pointer;
        }

        button:hover {
            background-color: #45a049;
        }
    `;

    render() {
        if (!this.book) return html`<p>No book data.</p>`;
        return html`
            <li>
                <div class="title">${this.book.title}</div>
                <div>by ${this.book.author}</div>
                <button @click=${() => console.log("Details clicked")}>
                    Details
                </button>
            </li>
        `;
    }
}
