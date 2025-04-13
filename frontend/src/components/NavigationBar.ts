import { html } from "lit";
import { navigateTo } from "../main";

export function NavigationBar() {
    return html`
        <nav>
            <button @click=${() => navigateTo("books")}>Books</button>
            <button @click=${() => navigateTo("add")}>Add Book</button>
        </nav>
    `;
}
