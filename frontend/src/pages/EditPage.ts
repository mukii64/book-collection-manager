import { html, css } from "lit";
import { navigateTo } from "../main";
import "../components/AppHeader";
import "../components/BookForm";
import { apiFetch } from "../utils/apiFetch";

export async function showEditPage(bookId: string) {
    const res = await apiFetch(`http://localhost:8000/api/books/${bookId}`);
    const book = await res.json();

    if (!book) {
        return html`<p>Book not found.</p>`;
    }

    const isAdmin = localStorage.getItem("is_admin") === "true";

    const handleSubmit = async (updatedBook: any) => {
        await apiFetch(`http://localhost:8000/api/books/${bookId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedBook),
        });

        navigateTo(`details/${bookId}`);
    };

    return html`
        <style>
            ${css`
                :host {
                    display: block;
                    font-family: "Arial", sans-serif;
                    padding: 2rem;
                }

                h1 {
                    text-align: center;
                    font-size: 2rem;
                    color: #4a90e2;
                    margin-bottom: 20px;
                }`}
        </style>
        <app-header></app-header>
        <h1>Edit Book</h1>
        <book-form
            .initialData=${book}
            .onSubmit=${handleSubmit}
            .isAdmin=${isAdmin}
        ></book-form>
    `;
}
