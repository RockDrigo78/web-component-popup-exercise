const template = document.createElement("template");

template.innerHTML = `
    <style>
        .tooltip-container {
            display: inline-block;
            position: relative;
            z-index: 2;
        }

        .tooltip-container__alert, .tooltip-container__cancel {
            width: 1em;
            cursor: pointer;
        }

        .tooltip-container__cancel {
            display: none;
        }

        .tooltip-container__notify-container {
            position: absolute;
            bottom: 125%;
            z-index: 9;
            width: 300px;
            background-color: white;
            box-shadow: 5px 5px 10px rgba(0,0,0,.1);
            font-size: .8em;
            border-radius: .5em;
            padding: 1em;
            transform: scale(0);
            transform-origin: bottom left;
            transition: transform .5s cubic-bezier(0.860,0.000,0.070,1.000)
        }
    </style>

    <div class="tooltip-container">
        <span class="tooltip-container__alert">📤</span>
        <span class="tooltip-container__cancel">📥</span>

        <div class="tooltip-container__notify-container">
            <slot name="message" />
        </div>
    </div>
`;

class PopupNot extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    tooltip(expandState) {
        const tooltip = this.shadowRoot.querySelector(".tooltip-container__notify-container");
        const alert = this.shadowRoot.querySelector(
            ".tooltip-container__alert"
        );
        const cancel = this.shadowRoot.querySelector(
            ".tooltip-container__cancel"
        );

        if (expandState === true) {
            tooltip.style.transform = "scale(1)";
            alert.style.display = "none";
            cancel.style.display = "unset";
        } else {
            tooltip.style.transform = "scale(0)";
            alert.style.display = "unset";
            cancel.style.display = "none";
        }
    }

    connectedCallback() {
        this.shadowRoot
            .querySelector(".tooltip-container__alert")
            .addEventListener("click", () => {
                this.tooltip(true);
            });
        this.shadowRoot
            .querySelector(".tooltip-container__cancel")
            .addEventListener("click", () => {
                this.tooltip(false);
            });

        if (this.getAttribute("background-color")) {
            this.shadowRoot.querySelector(
                ".tooltip-container__notify-container"
            ).style.background = this.getAttribute("background-color");
        }
        if (this.getAttribute("text-color")) {
            this.shadowRoot.querySelector(".tooltip-container__notify-container").style.color =
                this.getAttribute("text-color");
        }
    }
}

window.customElements.define("popup-not", PopupNot);
