<script lang="ts">
    import { itemLayout } from "$lib/items";
    import Item from "./Item.svelte";
</script>

<div>
    <section class="layout" aria-labelledby="h-item-tracker">
        <h2 id="h-item-tracker">Item tracker</h2>
        {#each $itemLayout as row}
            <div class="row">
                {#each row as col}
                    <Item itemId={col}></Item>
                {/each}
            </div>
        {/each}
    </section>
</div>

<style>
    h2 {
        text-align: center;
    }
    .layout {
        display: flex;
        flex-direction: column;
        justify-content: start;
        gap: 0.2em;
        background-color: var(--background-dim);
        padding: 1em 2em 2em 2em;
    }

    .row {
        display: flex;
        justify-content: center;
        gap: 0.2em;
    }
</style>
