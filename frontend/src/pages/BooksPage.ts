import { html, css } from "lit";
import { navigateTo } from "../main";
import "../components/BookItem";
import "../components/AppHeader";
import "../components/BookFilter";
import { BooksHelper } from "../utils/BooksHelper";
import { apiFetch } from "../utils/apiFetch";

export async function showBooksPage() {
    const userId = parseInt(localStorage.getItem("user_id") || "-1");

    if (!userId) {
        alert("Please log in first.");
        navigateTo("login");
        return;
    }

    const booksHelper = new BooksHelper();

    const res = await apiFetch("http://localhost:8000/api/books");
    const books = await res.json();
    const authors = Array.from(new Set(books.map((book: any) => book.author)));

    booksHelper.initializeBooks(books);

    function updatePage() {
        const container = document.querySelector(".books-container");
        if (container) {
            container.innerHTML = "";
            booksHelper.getFilteredBooks().forEach((book: any) => {
                const bookItem = document.createElement("book-item");
                bookItem.book = book;
                bookItem.addEventListener("click", () =>
                    booksHelper.handleBookClick(book.id),
                );
                container.appendChild(bookItem);
            });
        }
    }

    function handleSearch(event: CustomEvent) {
        booksHelper.handleSearch(event.detail.searchQuery);
        updatePage();
    }

    function handleAuthorFilter(event: CustomEvent) {
        booksHelper.handleAuthorFilter(event.detail.selectedAuthor);
        updatePage();
    }

    function handleReadFilter(event: CustomEvent) {
        booksHelper.handleReadFilter(event.detail.readStatus);
        updatePage();
    }

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
        <h1>My Library</h1>
        <book-filter
            .authors=${authors}
            @search=${handleSearch}
            @filter-author=${handleAuthorFilter}
            @filter-read=${handleReadFilter}
        ></book-filter>
        <div class="books-container">
            ${booksHelper
                .getFilteredBooks()
                .map(
                    (book: any) => html`
                        <book-item
                            .book=${book}
                            @click=${() => booksHelper.handleBookClick(book.id)}
                        ></book-item>
                    `,
                )}
        </div>
    `;
}
