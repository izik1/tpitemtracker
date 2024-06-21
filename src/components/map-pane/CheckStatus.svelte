<script lang="ts">
    import { checkDataGlitchless } from "$lib/logic";
    import { availableChecks } from "$lib/index.svelte";
    import { getContext } from "svelte";
    import type { CheckName } from "$lib/logic/check-name";
    import type { LocalStore } from "$lib/local-store.svelte";
    import type { Set } from "svelte/reactivity";

    const openedChecks: LocalStore<Set<CheckName>> = getContext("openedChecks");
    const completableChecks: { readonly value: Set<CheckName> } =
        getContext("completableChecks");

    const totalChecks = checkDataGlitchless.length;
    const remaining = $derived(totalChecks - openedChecks.value.size);
    const available = $derived(
        availableChecks(
            checkDataGlitchless.map((it) => it.name),
            openedChecks.value,
            completableChecks.value,
        ),
    );
</script>

<div class="check-status">
    Checks: {available} Available, {remaining} Remaining, {totalChecks} Total.
</div>

<style>
    .check-status {
        background-color: var(--background);
        border: 0.05em solid snow;
        margin: 0.1em;
        contain: content;
    }
</style>
