<script lang="ts">
    import { openedChecks, toggleCheck } from "$lib";
    import { checkStatus, type OverworldCheck } from "$lib/chests";
    import {
        checkDataGlitchless,
        checkIdsGlitchless,
        completableChecks,
    } from "$lib/logic";
    import Tooltip from "./Tooltip.svelte";

    interface CheckProps {
        index: number;
        check: OverworldCheck;
    }

    let { index, check }: CheckProps = $props();


    export const kind =
        checkDataGlitchless[checkIdsGlitchless[check.name]].kind;
</script>

<button
    style="left: {check.x}; top: {check.y};"
    data-status={checkStatus($completableChecks, $openedChecks, check.name)}
    class="chest {kind}"
    onclick={() => toggleCheck(check.name)}
    aria-pressed={$openedChecks.has(check.name)}
    aria-labelledby="ow-tt-{index}"
>
    <Tooltip id="ow-tt-{index}" content={check.name}></Tooltip>
</button>

<style>
    .chest {
        cursor: pointer;
        width: 9px;
        height: 9px;
        text-align: center;
        padding: 0;
        position: absolute;
    }

    [data-status="unavailable"] {
        background-color: rgb(255, 0, 0);
    }

    [data-status="available"] {
        background-color: rgb(0, 255, 0);
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

    button {
        border: 1px solid black;
    }
</style>
