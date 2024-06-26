<script lang="ts">
    import SettingsMenu from "./SettingsMenu.svelte";
    import { type RandomizerSettings } from "$lib/settings";
    import Select from "../Select.svelte";
    import type { LocalStore } from "$lib/local-store.svelte";
    import { getContext } from "svelte";
    import type { Set } from "svelte/reactivity";
    import type { CheckName } from "$lib/logic/check-name";
    import { baseItems } from "$lib/items";
    import Checkbox from "../Checkbox.svelte";

    const randomizerSettings: LocalStore<RandomizerSettings> =
        getContext("randomizerSettings");

    const openedChecks: LocalStore<Set<CheckName>> = getContext("openedChecks");
    const items: LocalStore<typeof baseItems> = getContext("items");

    const clearTrackers = () => {
        openedChecks.value.clear();
        items.value = Object.assign({}, baseItems);
    };

    const skipList: {
        label: string;
        value: keyof RandomizerSettings["skip"];
    }[] = [
        { label: "Prologue", value: "prologue" },
        { label: "Faron Twilight", value: "faronTwilight" },
        { label: "Eldin Twilight", value: "eldinTwilight" },
        { label: "Lanayru Twilight", value: "lanayruTwilight" },
        { label: "Midna's Desperate Hour", value: "mdh" },
        { label: "Lakebed Entrance", value: "lakebedEntrance" },
        { label: "Aribters Grounds Entrance", value: "arbitersEntrance" },
        { label: "Snowpeak Entrance", value: "snowpeakEntrance" },
        { label: "City in the Sky Entrance", value: "cityEntrance" },
    ];
</script>

<div class="settings-pane">
    <h2>Settings</h2>
    <!-- todo: import from randomizer generator -->
    <SettingsMenu title="Randomizer Options">
        <fieldset>
            <legend>Logic Options</legend>
            <Select
                title="Logic Rules"
                name="rando-logic"
                enabled={false}
                bind:value={randomizerSettings.value.logic}
                options={[
                    { label: "Glitchless", value: "glitchless" },
                    { label: "Glitched", value: "glitched" },
                ]}
            />
            <Checkbox
                id="rando-logic-open-map"
                label="Unlock Map regions"
                bind:checked={randomizerSettings.value.openMap}
            />
        </fieldset>

        <fieldset>
            <legend>Access Options</legend>
            <Select
                name="rando-access-faron"
                title="Faron Access"
                bind:value={randomizerSettings.value.faronWoodsLogic}
                options={[
                    { label: "Closed", value: "closed" },
                    { label: "Open", value: "open" },
                ]}
            />
            <Select
                name="rando-access-mines"
                title="Goron Mines Access"
                bind:value={randomizerSettings.value.goronMinesLogic}
                options={[
                    { label: "Closed", value: "closed" },
                    { label: "No Wrestling", value: "no-wrestling" },
                    { label: "Open", value: "open" },
                ]}
            />
            <Select
                name="rando-access-tot"
                title="Temple of Time Access"
                bind:value={randomizerSettings.value.totLogic}
                options={[
                    { label: "Vanilla", value: "vanilla" },
                    { label: "Open Grove", value: "open-grove" },
                    { label: "Open", value: "open" },
                ]}
            />
            <Select
                name="rando-access-palace"
                title="Palace of Twilight Access"
                bind:value={randomizerSettings.value.palaceLogic}
                options={[
                    { label: "Vanilla", value: "vanilla" },
                    { label: "Fused Shadows", value: "fused-shadows" },
                    { label: "Mirror Shards", value: "mirror-shards" },
                    { label: "Open", value: "open" },
                ]}
            />
            <Select
                name="rando-access-castle"
                title="Hyrule Castle Access"
                bind:value={randomizerSettings.value.castleLogic}
                options={[
                    { label: "Vanilla", value: "vanilla" },
                    { label: "Fused Shadows", value: "fused-shadows" },
                    { label: "Mirror Shards", value: "mirror-shards" },
                    { label: "All Dungeons", value: "all-dungeons" },
                    { label: "Open", value: "open" },
                ]}
            />
        </fieldset>

        <fieldset>
            <legend>Dungeon Items</legend>
            <Select
                name="rando-small-key"
                title="Small Keys"
                options={[
                    {
                        label: "Vanilla",
                        value: "vanilla",
                    },
                    {
                        label: "Keysy",
                        value: "keysy",
                    },
                ]}
                bind:value={randomizerSettings.value.smallKeys}
            />
        </fieldset>

        <fieldset>
            <legend>Skip Options</legend>
            {#each skipList as { label, value }}
                <Checkbox
                    id="cb-rando-skip-{value}"
                    bind:checked={randomizerSettings.value.skip[value]}
                    {label}
                />
            {/each}
        </fieldset>

        <fieldset>
            <legend>Other</legend>
            <Checkbox
                id="cb-rando-big-wallets"
                bind:checked={randomizerSettings.value.increaseWalletCapacity}
                label="Increased Wallet Capacity"
            />
        </fieldset>
    </SettingsMenu>
    <button onclick={clearTrackers}>Clear trackers</button>
</div>

<style>
    button {
        margin-left: 2em;
    }
    h2 {
        text-align: center;
    }

    div.settings-pane {
        width: 25em;
        background-color: var(--background-dim);
        overflow-y: scroll;
    }
</style>
