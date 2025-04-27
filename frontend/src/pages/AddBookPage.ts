import { html } from "lit";
import { navigateTo } from "../main";
import "../components/AppHeader";
import "../components/BookForm";
import { apiFetch } from "../utils/apiFetch";

export async function showAddBookPage() {
    const isAdmin = localStorage.getItem("is_admin") === "true";

    const handleSubmit = async (book: any) => {
        try {
            const res = await apiFetch("http://localhost:8000/api/books", {
                method: "POST",
                body: JSON.stringify(book),
            });

            if (!res.ok) throw new Error("Failed to add book");
            alert("Book added!");
            navigateTo("books");
        } catch (err) {
            console.error("Error adding book:", err);
            alert("Failed to add book.");
        }
    };

    return html`
        <app-header></app-header>
        <h1 style="text-align: center; margin-top: 1rem">Add a New Book</h1>
        <book-form .onSubmit=${handleSubmit} .isAdmin=${isAdmin}></book-form>
    `;
}
