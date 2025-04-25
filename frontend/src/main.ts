import { html } from "lit";
import { showBooksPage } from "./pages/BooksPage";
import { showAddBookPage } from "./pages/AddBookPage";
import { showLoginPage } from "./pages/LoginPage";
import { render } from "lit";

export async function navigateTo(route: string) {
    const root = document.getElementById("app")!;
    const userId = localStorage.getItem("user_id");

    let page;

    if (route === "books") {
        if (!userId) {
            page = await showLoginPage();
        } else {
            page = await showBooksPage();
        }
    } else if (route === "add") {
        page = await showAddBookPage();
    } else if (route === "login") {
        page = await showLoginPage();
    } else {
        page = html`<p>Not found</p>`;
    }

    render(page, root);
}
navigateTo("books");
