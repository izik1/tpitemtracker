<script lang="ts">
    import ActiveGroup from "./ActiveGroup.svelte";
    import RadioGroup from "../RadioGroup.svelte";
    import MapOverlay from "./MapOverlay.svelte";
    import CheckStatus from "./CheckStatus.svelte";
    import type { CheckKind } from "$lib/logic/checks";
    import { getContext, setContext } from "svelte";
    import { type LocalStore } from "$lib/local-store.svelte";
    import { logic, makeCompletableChecks } from "$lib/logic";
    import { calculateReachableZones } from "$lib/logic/zone/zones";
    import type { RandomizerSettings } from "$lib/settings";
    import type { baseItems } from "$lib/items";

    const items: LocalStore<typeof baseItems> = getContext("items");
    const randoSettings: LocalStore<RandomizerSettings> =
        getContext("randomizerSettings");

    const reachableZones = $derived(
        calculateReachableZones(
            logic[randoSettings.value.logic].zones,
            randoSettings.value,
            items.value,
        ),
    );

    const completableChecks = $derived(
        makeCompletableChecks({
            settings: randoSettings.value,
            reachableZones: reachableZones,
            items: items.value,
        }),
    );

    setContext("completableChecks", {
        get value() {
            return completableChecks;
        },
    });

    let activeMap: CheckKind = $state("standard");
    let activeGroup: number | null = $state(null);
</script>

<div class="map">
    <enhanced:img
        alt="A map of Hyrule"
        class="scale"
        src="$lib/assets/map.webp?q=75"
    />

    <ActiveGroup groupId={activeGroup} />
    <CheckStatus />
    <MapOverlay {activeMap} bind:activeGroup />

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
    picture,
    source,
    img {
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
        /* 810, 855 */
        width: 810px;
        height: 855px;
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
