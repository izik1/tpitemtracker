<script lang="ts">
    import type { Snippet } from "svelte";

    const { title, children }: { title: string, children: Snippet } = $props();
</script>

<li>
    <fieldset>
        <legend>{title}</legend>
        <ul>
            {@render children()}
        </ul>
    </fieldset>
</li>

<style>
    ul {
        padding-left: 0px;
        list-style-type: none;
    }
</style>
