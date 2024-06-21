<script lang="ts">
    import { toggleCheck } from "$lib/index.svelte";
    import { checkStatus, type OverworldCheck } from "$lib/chests";
    import { checkKinds } from "$lib/logic";
    import Tooltip from "./Tooltip.svelte";
    import type { LocalStore } from "$lib/local-store.svelte";
    import type { CheckName } from "$lib/logic/check-name";
    import { Set } from "svelte/reactivity";
    import { getContext } from "svelte";

    const openedChecks: LocalStore<Set<CheckName>> = getContext("openedChecks");
    const completableChecks: { readonly value: Set<CheckName> } =
        getContext("completableChecks");

    interface CheckProps {
        index: number;
        check: OverworldCheck;
    }

    let { index, check }: CheckProps = $props();

    export const kind = checkKinds[check.name];
</script>

<button
    style="left: {check.x}; top: {check.y};"
    data-status={checkStatus(
        completableChecks.value,
        openedChecks.value,
        check.name,
    )}
    class="chest {kind}"
    onclick={() => toggleCheck(openedChecks.value, check.name)}
    aria-pressed={openedChecks.value.has(check.name)}
    aria-labelledby="ow-tt-{index}"
>
    <Tooltip id="ow-tt-{index}">{check.name}</Tooltip>
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
