import { navigateTo } from "../main";

export class BooksHelper {
    private books: any[] = [];
    private filteredBooks: any[] = [];
    private searchQuery: string = "";
    private selectedAuthor: string = "";
    private readStatus: string = "";

    initializeBooks(books: any[]) {
        this.books = books;
        this.filteredBooks = books;
        this.searchQuery = "";
        this.selectedAuthor = "";
        this.readStatus = "";
    }

    applyFilters() {
        this.filteredBooks = this.books.filter((book: any) => {
            const matchesSearch = book.title
                .toLowerCase()
                .includes(this.searchQuery);
            const matchesAuthor = this.selectedAuthor
                ? book.author === this.selectedAuthor
                : true;
            const matchesReadStatus =
                this.readStatus === "read"
                    ? book.is_read
                    : this.readStatus === "unread"
                      ? !book.is_read
                      : true;

            return matchesSearch && matchesAuthor && matchesReadStatus;
        });
    }

    handleSearch(searchQuery: string) {
        this.searchQuery = searchQuery.toLowerCase();
        this.applyFilters();
    }

    handleAuthorFilter(selectedAuthor: string) {
        this.selectedAuthor = selectedAuthor;
        this.applyFilters();
    }

    handleReadFilter(readStatus: string) {
        this.readStatus = readStatus;
        this.applyFilters();
    }

    getFilteredBooks() {
        return this.filteredBooks;
    }

    handleBookClick(bookId: string) {
        navigateTo(`details/${bookId}`);
    }
}
