import { html } from "lit";
import { navigateTo } from "../main";
import "../components/AppHeader";
import "../components/BookForm";

export async function showAddBookPage() {
    const handleSubmit = async (book: any) => {
        try {
            const res = await fetch("http://localhost:8000/api/books", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-User-ID": book.user_id.toString(),
                    "X-User-Role": "admin",
                },
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
        <book-form .onSubmit=${handleSubmit}></book-form>
    `;
}
