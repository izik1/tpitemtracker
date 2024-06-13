import { init, setTracker, setLogic, setSkipOption, showSettings, editMode } from "./render.ts";

if (module.hot) {
    module.hot.accept();
}


if (document.readyState === "loading") {
    // Loading hasn't finished yet
    document.addEventListener("DOMContentLoaded", init);
} else {
    // `DOMContentLoaded` has already fired
    init()
}

window.onload = () => {
    customElements.define('settings-list',
        class extends HTMLElement {
            constructor() {
                super();

                let template = document.getElementById("settings-list")! as HTMLTemplateElement;
                let templateContent = template.content;

                const shadowRoot = this.attachShadow({ mode: "open" });
                shadowRoot.appendChild(templateContent.cloneNode(true));
            }
        }
    )

    customElements.define('settings-menu',
        class extends HTMLElement {
            constructor() {
                super();

                let template = document.getElementById("settings-menu")! as HTMLTemplateElement;
                let templateContent = template.content;

                const shadowRoot = this.attachShadow({ mode: "open" });
                shadowRoot.appendChild(templateContent.cloneNode(true));
            }
        }
    )

    for (const elem of document.getElementsByName("checktracker")) {
        elem.onclick = setTracker
    }


    document.getElementById('settingsbutton')!.onclick = (ev) => showSettings(ev.currentTarget);
    document.getElementById('edit-mode')!.onclick = (_ev) => editMode()

    for (const elem of document.querySelectorAll<HTMLElement>('[data-skip]')) {
        console.log("registering skip option: ", elem.dataset.skip);
        (elem as HTMLElement).onclick = (ev) => setSkipOption(elem.dataset.skip!, ev.currentTarget! as HTMLInputElement)
    }

    {
        const select = (document.getElementById('background-select')! as HTMLSelectElement);
        select.onchange = (ev) => setLogic(ev.currentTarget! as HTMLSelectElement);
    }

    {
        const select = (document.getElementById('logic-select')! as HTMLSelectElement);
        select.onchange = (ev) => setLogic(ev.currentTarget! as HTMLSelectElement);
    }
}
