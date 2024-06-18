<script lang="ts">
    import { checkDataGlitchless, completableChecks } from "$lib/logic";
    import { availableChecks, openedChecks } from "$lib";

    const totalChecks = checkDataGlitchless.length;
    const remaining = $derived(totalChecks - openedChecks.size);
    const available = $derived(
        availableChecks(
            checkDataGlitchless.map((it) => it.name),
            $completableChecks,
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
