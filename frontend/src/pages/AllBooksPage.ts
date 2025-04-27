import { html, css } from "lit";
import { navigateTo } from "../main";
import "../components/BookItem";
import "../components/AppHeader";
import "../components/BookFilter";

export async function showAllBooksPage() {
    const userId = parseInt(localStorage.getItem("user_id") || "-1");

    if (!userId) {
        alert("Please log in first.");
        navigateTo("login");
        return;
    }

    const res = await fetch(`http://localhost:8000/api/books`, {});

    const books = await res.json();
    const authors = Array.from(new Set(books.map((book: any) => book.author)));

    let filteredBooks = books;
    let searchQuery = "";
    let selectedAuthor = "";
    let readStatus = "";

    function applyFilters() {
        filteredBooks = books.filter((book: any) => {
            const matchesSearch = book.title
                .toLowerCase()
                .includes(searchQuery);
            const matchesAuthor = selectedAuthor
                ? book.author === selectedAuthor
                : true;
            const matchesReadStatus =
                readStatus === "read"
                    ? book.is_read
                    : readStatus === "unread"
                      ? !book.is_read
                      : true;

            return matchesSearch && matchesAuthor && matchesReadStatus;
        });
        updatePage();
    }

    function handleSearch(event: CustomEvent) {
        searchQuery = event.detail.searchQuery.toLowerCase();
        applyFilters();
    }

    function handleAuthorFilter(event: CustomEvent) {
        selectedAuthor = event.detail.selectedAuthor;
        applyFilters();
    }

    function handleReadFilter(event: CustomEvent) {
        readStatus = event.detail.readStatus;
        applyFilters();
    }

    function handleBookClick(bookId: string) {
        navigateTo(`details/${bookId}`);
    }

    function updatePage() {
        const container = document.querySelector(".books-container");
        if (container) {
            container.innerHTML = "";
            filteredBooks.forEach((book: any) => {
                const bookItem = document.createElement("book-item");
                bookItem.book = book;
                bookItem.addEventListener("click", () =>
                    handleBookClick(book.id),
                );
                container.appendChild(bookItem);
            });
        }
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
        <h1>All Books</h1>
        <book-filter
            .authors=${authors}
            @search=${handleSearch}
            @filter-author=${handleAuthorFilter}
            @filter-read=${handleReadFilter}
        ></book-filter>
        <div class="books-container">
            ${filteredBooks.map(
                (book: any) => html`
                    <book-item
                        .book=${book}
                        @click=${() => handleBookClick(book.id)}
                    ></book-item>
                `,
            )}
        </div>
    `;
}
