import { render } from "lit";
import { showBooksPage } from "./pages/BooksPage";

export async function navigateTo(route: string) {
    let page;

    if (route === "books") {
        page = await showBooksPage();
    } else {
        page = html`<p>Not found</p>`;
    }

    render(page, document.body);
}

window.addEventListener("navigate", (e: any) => {
    navigateTo(e.detail);
});

navigateTo("books");
