import { html } from "lit";
import { navigateTo } from "../main";
import "../components/BookItem";
import { NavigationBar } from "../components/NavigationBar";

export async function showBooksPage() {
    const res = await fetch("http://localhost:8000/api/books");
    const books = await res.json();

    return html`
        ${NavigationBar()}
        <h1>All Books</h1>
        <ul>
            ${books.map(
                (book: any) => html`<book-item .book=${book}></book-item>`,
            )}
        </ul>
    `;
}
