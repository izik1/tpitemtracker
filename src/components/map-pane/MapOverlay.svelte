<script lang="ts">
    import { groups, groupStatus } from "$lib/chests";
    import {
        checkDataGlitchless,
        checkIdsGlitchless,
        completableChecks,
    } from "$lib/logic";
    import { overworld, type Group } from "$lib/chests";
    import type { CheckName } from "$lib/logic/check-name";
    import { openedChecks, availableChecks } from "$lib";
    import Check from "./Check.svelte";
    import type { CheckKind } from "$lib/logic/checks";
    import Tooltip from "./Tooltip.svelte";

    export let activeMap: CheckKind = "standard";
    export let activeGroup: number | null = null;

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
        {@const checkCount = availableChecks(
            group.checks,
            $completableChecks,
            $openedChecks,
        )}
        <button
            class="dungeon"
            data-status={groupStatus($completableChecks, $openedChecks, group)}
            style="left: {group.x}; top: {group.y}"
            on:click={() => {
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

    .poe[data-status="unavailable"] {
        background-color: rgb(188, 0, 161);
    }

    .bug[data-status="unavailable"] {
        background-color: rgb(255, 255, 0);
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
