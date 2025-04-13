import { render, html } from "lit";
import { showBooksPage } from "./pages/BooksPage";
import { showAddBookPage } from "./pages/AddBookPage";

export async function navigateTo(route: string) {
    let page;

    if (route === "books") {
        page = await showBooksPage();
    } else if (route === "add") {
        page = await showAddBookPage();
    } else {
        page = html`<p>Not found</p>`;
    }

    render(page, document.body);
}

window.addEventListener("navigate", (e: any) => {
    navigateTo(e.detail);
});

navigateTo("books");
