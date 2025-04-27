import { LitElement, html, css } from "lit";

export class StatusBadge extends LitElement {
    static properties = {
        isRead: { type: Boolean },
        showBadge: { type: Boolean }, // New property to control visibility
    };

    static styles = css`
        .status-badge {
            display: inline-block;
            padding: 0.5rem 1rem;
            border-radius: 12px;
            font-size: 0.9rem;
            font-weight: bold;
            color: white;
        }

        .status-badge.read {
            background-color: #34a853;
        }

        .status-badge.not-read {
            background-color: #e34f4f;
        }
    `;

    render() {
        if (!this.showBadge) return null;

        return html`
            <div class="status-badge ${this.isRead ? "read" : "not-read"}">
                ${this.isRead ? "Read" : "Not Read"}
            </div>
        `;
    }
}

customElements.define("status-badge", StatusBadge);
