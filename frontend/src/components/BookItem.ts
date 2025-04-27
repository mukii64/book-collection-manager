import { LitElement, html, css } from "lit";
import { property, customElement } from "lit/decorators.js";
import "../components/StatusBadge"; // Import the StatusBadge component
import { generatePlaceholder } from "../utils/placeholder"; // Import the placeholder utility

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
            position: relative;
            background-size: cover; /* Use the book cover as the background */
            background-position: center;
            border-radius: 12px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
            transition:
                transform 0.2s ease,
                box-shadow 0.2s ease;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: flex-end; /* Align content to the bottom */
            overflow: hidden;
            padding: 1rem;
            color: white; /* Ensure text is readable on the background */
            text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8); /* Add text shadow for readability */
        }

        .card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
        }

        .title {
            font-size: 1.15rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            word-wrap: break-word;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .author {
            font-size: 0.95rem;
            margin-bottom: 0.5rem;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .badge-container {
            position: absolute;
            top: 0.75rem;
            right: 0.75rem;
            z-index: 1;
        }
    `;

    render() {
        if (!this.book) return html`<p>No book data.</p>`;

        // Use the book's cover URL or generate a placeholder
        const coverUrl =
            this.book.coverUrl || generatePlaceholder(this.book.title);

        // Check if the current user is the one who added the book
        const currentUserId = parseInt(localStorage.getItem("user_id") || "-1");
        const isCurrentUser = this.book.user_id === currentUserId;

        return html`
            <div class="card" style="background-image: url('${coverUrl}');">
                <!-- Badge positioned at the top-right -->
                <div class="badge-container">
                    <status-badge
                        .isRead=${this.book.is_read}
                        .showBadge=${isCurrentUser} <!-- Only show if current user -->
                    ></status-badge>
                </div>
                <div class="title">${this.book.title}</div>
                <div class="author">by ${this.book.author}</div>
            </div>
        `;
    }
}
