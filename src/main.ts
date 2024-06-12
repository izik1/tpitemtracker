import { init, setTracker, setLogic, setSkipOption, showSettings } from "./render.ts";

if (module.hot) {
    module.hot.accept();
}

window.onload = () => {
    init()

    for (const elem of document.getElementsByName("checktracker")) {
        elem.onclick = setTracker
    }

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



    document.getElementById('settingsbutton')!.onclick = (ev) => showSettings(ev.currentTarget);
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
