import { html, css } from "lit";
import "../components/AppHeader";

const styles = css`
    :host {
        display: block;
        font-family: "Arial", sans-serif;
        padding: 2rem;
    }

    h1 {
        text-align: center;
        font-size: 2.5rem;
        color: #4a90e2;
        margin-bottom: 20px;
    }

    p {
        font-size: 1.1rem;
        color: #333;
        line-height: 1.6;
        margin-bottom: 20px;
        text-align: center;
    }

    .about-container {
        background-color: #f4f7fc;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        max-width: 800px;
        margin: 4rem auto;
    }
`;

export async function showAboutPage() {
    return html`
        <style>
            ${styles}
        </style>
        <app-header></app-header>
        <div class="about-container">
            <h1>Book Collection Manager</h1>
            <p>
                This is a small SPA Webapp developed for the PR Service
                Engineering at JKU University.
            </p>
            <p>
                This website uses LIT + Vite as frontend Framework, and PHP for
                the backend logic.
            </p>
            <p>
                Login Artwork:
                <a
                    href="https://www.vecteezy.com/free-vector/bookshelf"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Bookshelf Vectors by Vecteezy
                </a>
            </p>
        </div>
    `;
}
