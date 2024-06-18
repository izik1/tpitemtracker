<script lang="ts">
    import SettingsGroup from "./SettingsGroup.svelte";
    import SettingsMenu from "./SettingsMenu.svelte";
    import { randomizerSettings, type RandomizerSettings } from "$lib/settings";
    import Select from "../Select.svelte";

    const skipList: {
        label: string;
        value: keyof RandomizerSettings["skip"];
    }[] = [
        { label: "Prologue", value: "prologue" },
        { label: "Faron Twilight", value: "faronTwilight" },
        { label: "Eldin Twilight", value: "eldinTwilight" },
        { label: "Lanayru Twilight", value: "lanayruTwilight" },
        { label: "Midna's Desperate Hour", value: "mdh" },
    ];
</script>

<div>
    <h2>Settings</h2>
    <!-- todo: import from randomizer generator -->
    <SettingsMenu title="Randomizer Options">
        <SettingsGroup title="Logic Options">
            <Select
                title="Logic Rules"
                name="rando-logic"
                enabled={false}
                bind:value={$randomizerSettings.logic}
                options={[
                    { label: "Glitchless", value: "glitchless" },
                    { label: "Glitched", value: "glitched" },
                ]}
            />
        </SettingsGroup>
        <SettingsGroup title="Access Options">
            <Select
                name="rando-access-faron"
                title="Faron Access"
                bind:value={$randomizerSettings.faronWoodsLogic}
                options={[
                    { label: "Closed", value: "closed" },
                    { label: "Opened", value: "open" },
                ]}
            />
            <Select
                name="rando-access-mines"
                title="Goron Mines Access"
                bind:value={$randomizerSettings.goronMinesLogic}
                options={[
                    { label: "Closed", value: "closed" },
                    { label: "No Wrestling", value: "no-wrestling" },
                    { label: "Open", value: "open" },
                ]}
            />
        </SettingsGroup>

        <SettingsGroup title="Dungeon Items">
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
                bind:value={$randomizerSettings.smallKeys}
            />
        </SettingsGroup>

        <SettingsGroup title="Skip Options">
            {#each skipList as { label, value }}
                <li>
                    <input
                        type="checkbox"
                        id="cb-rando-skip-{value}"
                        bind:checked={$randomizerSettings.skip[value]}
                    />
                    <label for="cb-rando-skip-{value}">{label}</label>
                </li>
            {/each}
        </SettingsGroup>
    </SettingsMenu>
</div>

<style>
    h2 {
        text-align: center;
    }

    div {
        width: 25em;
        background-color: var(--background-dim);
        overflow-y: scroll;
    }
</style>
