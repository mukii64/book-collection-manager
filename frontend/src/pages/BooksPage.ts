import { html, css } from "lit";
import { navigateTo } from "../main";
import "../components/BookItem";
import "../components/AppHeader";

export async function showBooksPage() {
    const userId = parseInt(localStorage.getItem("user_id") || "-1");

    if (!userId) {
        alert("Please log in first.");
        navigateTo("login");
        return;
    }

    const res = await fetch(`http://localhost:8000/api/books`, {
        headers: {
            "X-User-ID": userId.toString(),
        },
    });

    const books = await res.json();
    return html`
        <style>
            .books-container {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 500px));
                gap: 2rem;
                padding: 2rem;
                justify-content: center;
                align-items: start;
            }

            h1 {
                text-align: center;
                margin-top: 1rem;
                font-size: 2rem;
                color: #333;
            }
        </style>
        <app-header></app-header>
        <h1>Library</h1>
        <div class="books-container">
            ${books.map(
                (book: any) => html`<book-item .book=${book}></book-item>`,
            )}
        </div>
    `;
}
