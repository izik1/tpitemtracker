import { init, setFaronEscape, setKeysy, setTracker, setLogic, setSkipOption, showSettings, editMode, resetLayout } from "./render";

if (document.readyState === "loading") {
    // Loading hasn't finished yet
    document.addEventListener("DOMContentLoaded", init);
} else {
    // `DOMContentLoaded` has already fired
    init();
}

window.onload = () => {
    customElements.define('settings-list',
        class extends HTMLElement {
            constructor() {
                super();

                const template = document.getElementById("settings-list")! as HTMLTemplateElement;
                const templateContent = template.content;

                const shadowRoot = this.attachShadow({ mode: "open" });
                shadowRoot.appendChild(templateContent.cloneNode(true));
            }
        }
    );

    customElements.define('settings-menu',
        class extends HTMLElement {
            constructor() {
                super();

                const template = document.getElementById("settings-menu")! as HTMLTemplateElement;
                const templateContent = template.content;

                const shadowRoot = this.attachShadow({ mode: "open" });
                shadowRoot.appendChild(templateContent.cloneNode(true));
            }
        }
    );

    for (const elem of document.getElementsByName("checktracker")) {
        elem.onclick = setTracker;
    }


    document.getElementById('settingsbutton')!.onclick = (ev) => showSettings(ev.currentTarget! as HTMLElement);
    document.getElementById('edit-mode')!.onclick = () => editMode();
    document.getElementById('reset-layout')!.onclick = () => resetLayout();
    document.getElementById('enable-small-keysy')!.onclick = (ev) => setKeysy(ev.currentTarget! as HTMLInputElement);
    document.getElementById('faron-escape')!.onclick = (ev) => setFaronEscape(ev.currentTarget! as HTMLInputElement);

    for (const elem of document.querySelectorAll<HTMLElement>('[data-skip]')) {
        console.debug("registering skip option: ", elem.dataset.skip);
        (elem as HTMLElement).onclick = (ev) => setSkipOption(elem.dataset.skip!, ev.currentTarget! as HTMLInputElement);
    }

    {
        const select = (document.getElementById('background-select')! as HTMLSelectElement);
        select.onchange = (ev) => setLogic(ev.currentTarget! as HTMLSelectElement);
    }

    {
        const select = (document.getElementById('logic-select')! as HTMLSelectElement);
        select.onchange = (ev) => setLogic(ev.currentTarget! as HTMLSelectElement);
    }
};
