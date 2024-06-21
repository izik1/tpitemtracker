<script lang="ts">
    import type { Snippet } from "svelte";

    const {
        id,
        children,
        color = "black",
    }: { id: string; children: Snippet; color?: string } = $props();
</script>

<span {id} role="tooltip" style="background-color:{color}">{@render children()}</span>

<style>
    span {
        display: none;
        width: 120px;
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 5px 0;
        position: absolute;
        z-index: 1;
        bottom: 170%;
        left: 50%;
        margin-left: -60px;
    }
    span::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: black transparent transparent transparent;
    }

    :global(:hover) > span,
    :global(:focus) > span {
        display: block;
    }
</style>
