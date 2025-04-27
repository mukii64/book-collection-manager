import { html } from "lit";
import { showBooksPage } from "./pages/BooksPage";
import { showAddBookPage } from "./pages/AddBookPage";
import { showLoginPage } from "./pages/LoginPage";
import { showAboutPage } from "./pages/AboutPage";
import { showDetailsPage } from "./pages/DetailsPage";
import { showAllBooksPage } from "./pages/AllBooksPage";
import { showEditPage } from "./pages/EditPage";
import { render } from "lit";

export async function navigateTo(route: string, addToHistory = true) {
    const root = document.getElementById("app")!;
    const userId = localStorage.getItem("user_id");

    let page;

    if (route === "books") {
        if (!userId) {
            page = await showLoginPage();
        } else {
            page = await showBooksPage();
        }
    } else if (route.startsWith("details/")) {
        const bookId = route.split("/")[1];
        page = await showDetailsPage(bookId);
    } else if (route.startsWith("edit/")) {
        const bookId = route.split("/")[1];
        page = await showEditPage(bookId);
    } else if (route === "all-books") {
        page = await showAllBooksPage();
    } else if (route === "add") {
        page = await showAddBookPage();
    } else if (route === "login") {
        page = await showLoginPage();
    } else if (route === "about") {
        page = await showAboutPage();
    } else {
        page = html`<p>Not found</p>`;
    }

    render(page, root);

    if (addToHistory) {
        history.pushState({ route }, "", `/${route}`);
    }
}

window.addEventListener("popstate", (event) => {
    const route = event.state?.route || "books";
    navigateTo(route, false);
});

navigateTo("books");
