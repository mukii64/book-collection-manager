import { LitElement, html, css } from "lit";

export class BookFilter extends LitElement {
    static styles = css`
        .filter-container {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin: 1rem 0;
        }

        input,
        select {
            padding: 0.5rem;
            font-size: 1rem;
        }

        select {
            width: 12%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        option {
            width: 100%;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
    `;

    static properties = {
        authors: { type: Array },
    };

    constructor() {
        super();
        this.authors = [];
    }

    handleSearch(event: Event) {
        const searchQuery = (event.target as HTMLInputElement).value;
        this.dispatchEvent(
            new CustomEvent("search", { detail: { searchQuery } }),
        );
    }

    handleAuthorFilter(event: Event) {
        const selectedAuthor = (event.target as HTMLSelectElement).value;
        this.dispatchEvent(
            new CustomEvent("filter-author", { detail: { selectedAuthor } }),
        );
    }

    handleReadFilter(event: Event) {
        const readStatus = (event.target as HTMLSelectElement).value;
        this.dispatchEvent(
            new CustomEvent("filter-read", { detail: { readStatus } }),
        );
    }

    render() {
        return html`
            <div class="filter-container">
                <input
                    type="text"
                    placeholder="Search by title..."
                    @input=${this.handleSearch}
                />
                <select @change=${this.handleAuthorFilter}>
                    <option value="">All Authors</option>
                    ${this.authors.map((author) => {
                        const displayName =
                            author.length > 20
                                ? author.slice(0, 17) + "..."
                                : author;
                        return html`<option value=${author}>
                            ${displayName}
                        </option>`;
                    })}
                </select>

                <select @change=${this.handleReadFilter}>
                    <option value="">All Books</option>
                    <option value="read">Read</option>
                    <option value="unread">Unread</option>
                </select>
            </div>
        `;
    }
}

customElements.define("book-filter", BookFilter);
