import { html, css } from "lit";
import { navigateTo } from "../main";
import "../components/AppHeader";
import "../components/StatusBadge";
import { apiFetch } from "../utils/apiFetch";

const styles = css`
    :host {
        display: block;
        font-family: "Arial", sans-serif;
        padding: 2rem;
    }

    h1 {
        text-align: center;
        font-size: 2.5rem;
        color: #4a90e2;
        margin-bottom: 10px;
    }

    .author {
        text-align: center;
        font-size: 1.2rem;
        color: #666;
        margin-bottom: 20px;
    }

    .book-details-container {
        background-color: #f4f7fc;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        max-width: 800px;
        margin: 4rem auto;
    }

    p {
        font-size: 1.1rem;
        color: #333;
        line-height: 1.6;
        margin-bottom: 20px;
    }

    .status-badge {
        display: inline-block;
        padding: 0.5rem 1rem;
        border-radius: 12px;
        font-size: 0.9rem;
        font-weight: bold;
        color: white;
        margin-bottom: 20px;
    }

    .button-container {
        display: flex;
        justify-content: center;
        gap: 20px;
    }

    button {
        padding: 12px 20px;
        background-color: #4a90e2;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1.1rem;
        transition: background-color 0.3s ease;
    }

    button:hover {
        background-color: #357ab7;
    }

    .read-button {
        background-color: #34a853;
    }

    .read-button:hover {
        background-color: #2d8d44;
    }

    .delete-button {
        background-color: #e34f4f;
    }

    .delete-button:hover {
        background-color: #d03c3c;
    }
`;

export async function showDetailsPage(bookId: string) {
    const res = await apiFetch(`http://localhost:8000/api/books/${bookId}`);
    const book = await res.json();

    if (!book) {
        return html`<p>Book not found.</p>`;
    }

    const currentUserId = parseInt(localStorage.getItem("user_id") || "-1");
    const isAdmin = localStorage.getItem("is_admin") === "true";
    const canEditOrDelete = book.user_id === currentUserId || isAdmin;

    const handleMarkAsRead = async () => {
        const userId = localStorage.getItem("user_id");

        if (!userId) {
            alert("User ID is missing. Please log in again.");
            navigateTo("login");
            return;
        }

        await apiFetch(
            `http://localhost:8000/api/books/${book.id}/toggle-read`,
            {
                method: "PATCH",
            },
        );

        navigateTo(`details/${bookId}`);
    };

    const handleDeleteBook = async () => {
        await apiFetch(`http://localhost:8000/api/books/${book.id}`, {
            method: "DELETE",
        });
        navigateTo("books");
    };

    const handleEditBook = () => {
        navigateTo(`edit/${bookId}`);
    };

    return html`
        <style>
            ${styles}
        </style>
        <app-header></app-header>
        <div class="book-details-container">
            <h1>${book.title}</h1>
            <p class="author">By ${book.author}</p>
            <status-badge
                .isRead=${book.is_read}
                .showBadge=${book.user_id === currentUserId}
            ></status-badge>
            <p><strong>Description:</strong> ${book.description}</p>
            <p><strong>Date Published:</strong> ${book.published_date}</p>
            <p><strong>Added By:</strong> User ID ${book.user_id}</p>
            <!-- Displaying the description, date published, and added by -->

            ${canEditOrDelete
                ? html`
                      <div class="button-container">
                          <button
                              @click=${handleMarkAsRead}
                              class="read-button"
                          >
                              Toggle Read
                          </button>
                          <button
                              @click=${handleDeleteBook}
                              class="delete-button"
                          >
                              Delete
                          </button>
                          <button @click=${handleEditBook} class="edit-button">
                              Edit
                          </button>
                      </div>
                  `
                : ""}
        </div>
    `;
}
