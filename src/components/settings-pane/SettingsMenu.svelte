<script lang="ts">
    import type { Snippet } from "svelte";

    const { title, children }: { title: string, children: Snippet } = $props();
</script>

<details open>
    <summary>{title}</summary>
    <ul>
        {@render children()}
    </ul>
</details>

<style>
    ul {
        padding-left: 0px;
        list-style-type: none;
    }

    details {
        padding: 1em;
    }
</style>
