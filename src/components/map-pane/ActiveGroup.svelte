<script lang="ts">
    import { openedChecks, toggleCheck } from "$lib";
    import { checkStatus, groups } from "$lib/chests";
    import { completableChecks } from "$lib/logic";

    const { groupId }: { groupId: number | null } = $props();

    const group = $derived(groupId !== null ? groups[groupId] : null);
    const groupName = $derived(group?.name ?? "Hyrule");
    const checks = $derived(group?.checks ?? []);
</script>

<div class="group">
    <h3>{groupName}</h3>
    <hr />
    <ul>
        {#each checks as check}
            <li>
                <button
                    data-status={checkStatus(
                        $completableChecks,
                        $openedChecks,
                        check,
                    )}
                    onclick={() => toggleCheck(check)}>{check}</button
                >
            </li>
        {/each}
    </ul>
</div>

<style>
    .group {
        display: flex;
        flex-direction: column;
        background-color: var(--background);
        position: absolute;
        bottom: 0.1em;
        left: 0.1em;
        width: 17em;
        height: 18em;
        contain: strict;
        padding: 0.1em;
    }

    .group > ul {
        overflow-y: scroll;
        overflow-x: clip;
    }

    .group > h3 {
        align-self: center;
    }

    [data-status="unavailable"] {
        color: rgb(255, 0, 0);
    }

    [data-status="available"] {
        color: rgb(0, 255, 0);
    }

    [data-status="possible"] {
        color: rgb(210, 190, 30);
    }

    [data-status="opened"] {
        color: lightgrey;
    }

    button {
        /* width: 100%; */
        background-color: unset;
        border: 0;
        color: snow;
        width: 90%;
        text-align: left;
        padding: 10px;
    }

    button:hover,
    button:focus {
        background-color: slategray;
    }

    .group > hr {
        width: 100%;
    }
</style>
