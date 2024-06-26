<script lang="ts">
    import type { Snippet } from "svelte";

    const { title, children }: { title: string, children: Snippet } = $props();
</script>

<details open>
    <summary>{title}</summary>
        {@render children()}
</details>

<style>
    details {
        padding: 1em;
    }
</style>
