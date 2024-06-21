<script lang="ts">
    import MapPane from "../components/map-pane/MapPane.svelte";
    import ItemPane from "../components/item-pane/ItemPane.svelte";
    import SettingsPane from "../components/settings-pane/SettingsPane.svelte";
    import localStore from "$lib/local-store.svelte";
    import { setContext } from "svelte";
    import { baseItems } from "$lib/items";
    import { defaultRandomizerSettings } from "$lib/settings";

    setContext("items", localStore("items", baseItems));
    setContext(
        "randomizerSettings",
        localStore("randomizerSettings", defaultRandomizerSettings),
    );
</script>

<svelte:head>
    <title>Twilight Princess Item Tracker</title>
</svelte:head>

<header>
    <h1>Twilight Princess Item Tracker</h1>
</header>

<main>
    <ItemPane />
    <MapPane></MapPane>
    <SettingsPane></SettingsPane>
</main>

<footer>
    <p>
        Twilight Princess Tracker v2.0, originally by Lunar Soap, Updated by
        Feli Heli, and rewritten by orangesnowfox.
    </p>
    <p>
        With help and inspiration from
        <a href="https://github.com/TreZc0">TreZc0</a>
        and <a href="https://github.com/TestRunnerSRL">TestRunner</a>.
    </p>
</footer>

<style>
    header {
        text-align: center;
    }

    main {
        display: flex;
        justify-content: space-evenly;
    }

    :root {
        --background: #212028;
        --background-dim: #1b1a21;

        color: snow;
        background-color: var(--background);
        font-size: 16px;
    }

    a {
        color: #8a8aff;
    }
</style>
