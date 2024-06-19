<script lang="ts">
    import { groups, groupStatus } from "$lib/chests";
    import {
        checkDataGlitchless,
        checkIdsGlitchless,
        completableChecks,
    } from "$lib/logic";
    import { overworld } from "$lib/chests";
    import type { CheckName } from "$lib/logic/check-name";
    import { availableChecks, openedChecks } from "$lib";
    import Check from "./Check.svelte";
    import type { CheckKind } from "$lib/logic/checks";
    import Tooltip from "./Tooltip.svelte";

    let {
        activeMap = "standard",
        activeGroup = $bindable(null),
    }: { activeMap: CheckKind; activeGroup: number | null } = $props();

    const checkKind = (check: CheckName) =>
        checkDataGlitchless[checkIdsGlitchless[check]].kind;
</script>

<div>
    {#each overworld as check, index}
        {#if checkKind(check.name) === activeMap}
            <Check {check} {index}></Check>
        {/if}
    {/each}
    {#each groups as group, index}
        {@const checkCount = availableChecks(group.checks, $openedChecks, $completableChecks)}
        <button
            class="dungeon"
            data-status={groupStatus($completableChecks, $openedChecks, group)}
            style="left: {group.x}; top: {group.y}"
            onclick={() => {
                activeGroup = index;
            }}
        >
            <span class="chestCount">
                {#if checkCount > 0}
                    {checkCount}
                {/if}
            </span>
            <Tooltip id="gr-tt-{index}" content={group.name} color="grey"
            ></Tooltip>
        </button>
    {/each}
</div>

<style>
    .dungeon {
        cursor: pointer;
        width: 18px;
        height: 18px;
        text-align: center;
        padding: 0;
        position: absolute;
    }

    button {
        border: 1px solid black;
    }

    [data-status="unavailable"] {
        background-color: rgb(255, 0, 0);
    }

    [data-status="available"] {
        background-color: rgb(0, 255, 0);
    }

    [data-status="possible"] {
        background-color: rgb(210, 190, 30);
    }

    [data-status="opened"] {
        background-color: rgb(127, 127, 127);
    }

    .chestCount {
        color: black;
        line-height: 15px;
        display: inline-block;
        font-size: 12px;
    }
</style>
