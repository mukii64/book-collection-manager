// frontend/src/pages/AddBookPage.ts
import { html } from "lit";
import { navigateTo } from "../main";

export async function showAddBookPage() {
    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const data = Object.fromEntries(new FormData(form));

        const book = {
            ...data,
            user_id: parseInt(data.user_id as string),
            is_read: data.is_read === "on",
        };

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
        <h1>Add a New Book</h1>
        <form @submit=${handleSubmit}>
            <label>Title: <input name="title" required /></label><br />
            <label>Author: <input name="author" required /></label><br />
            <label>Description: <input name="description" required /></label
            ><br />
            <label
                >Published Date:
                <input name="published_date" type="date" required /></label
            ><br />
            <label
                >User ID: <input name="user_id" type="number" required /></label
            ><br />
            <label>Read: <input name="is_read" type="checkbox" /></label><br />
            <button type="submit">Add Book</button>
        </form>
    `;
}
