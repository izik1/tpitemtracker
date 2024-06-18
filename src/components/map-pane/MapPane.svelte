<script lang="ts">
    import ActiveGroup from "./ActiveGroup.svelte";
    import RadioGroup from "../RadioGroup.svelte";
    import MapOverlay from "./MapOverlay.svelte";
    import CheckStatus from "./CheckStatus.svelte";
    import type { CheckKind } from "$lib/logic/checks";

    let activeMap: CheckKind = $state("standard");
    let activeGroup: number | null = $state(null);
</script>

<div class="map">
    <enhanced:img
        alt="A map of Hyrule"
        class="scale"
        src="$lib/assets/map.webp?q=75"
    />

    <ActiveGroup groupId={activeGroup}></ActiveGroup>
    <CheckStatus></CheckStatus>
    <MapOverlay {activeMap} bind:activeGroup></MapOverlay>

    <!--  This can't *just* be the fieldset because the legend would float over the map with no background -->
    <div class="select-map">
        <RadioGroup
            title="Active Map"
            groupName="check-tracker"
            bind:group={activeMap}
            items={[
                { label: "Standard", value: "standard" },
                { label: "Poes", value: "poe" },
                { label: "Bugs", value: "bug" },
            ]}
        ></RadioGroup>
    </div>
</div>

<style>
    .scale {
        object-fit: cover;
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: -1;
    }
    .map {
        /* background-image: url("$lib/assets/map.webp?q=1");
        background-repeat: no-repeat;
        background-size: 100% 100%; */
        /* ideally this would be some relative sizing, but that gets very tricky with layout. */
        width: calc(900px * 0.9);
        height: calc(950px * 0.9);
        contain: strict;
    }

    .select-map {
        background-color: var(--background);
        position: absolute;
        bottom: 0.1em;
        right: 0.1em;
        contain: content;
        padding: 0.1em;
    }
</style>
