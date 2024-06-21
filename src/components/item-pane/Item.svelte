<script lang="ts">
    import {
        baseItems,
        isNumericItemId,
        isProgressiveItemId,
        itemsMax,
        itemsMin,
        type ItemId,
        type LayoutItem,
    } from "$lib/items";
    import { getContext } from "svelte";
    import { itemImages, type Image } from "$lib/index.svelte";
    import itemBox from "$lib/assets/item-box.webp";
    import type { LocalStore } from "$lib/local-store.svelte";

    const items: LocalStore<typeof baseItems> = getContext("items");

    const { itemId }: { itemId: LayoutItem } = $props();

    const dimmed = $derived(itemId === null || !items.value[itemId]);

    const pathPre = "/src/lib/assets/Items";

    const itemImage = (itemId: ItemId, items: typeof baseItems) => {
        let item: Image | undefined;

        if (isProgressiveItemId(itemId)) {
            item = itemImages[`${pathPre}/${itemId}${items[itemId]}.webp`];
        } else {
            item = itemImages[`${pathPre}/${itemId}.webp`];
        }

        if (!item) {
            console.log(itemId);
            console.log(items);
        }

        return item ?? itemImages[`${pathPre}/Unknown.webp`];
    };

    function updateItem(value: 1 | -1) {
        const tmp = itemId;
        if (tmp === null) {
            return;
        }
        const newValue = (min: number, max: number, old: number) => {
            const modRange = max - min + 1;
            return (
                ((((old + value - min) % modRange) + modRange) % modRange) + min
            );
        };

        if (isNumericItemId(tmp)) {
            items.value[tmp] = newValue(
                itemsMin[tmp],
                itemsMax[tmp],
                items.value[tmp],
            );
        } else {
            items.value[tmp] = !items.value[tmp];
        }
    }
</script>

<button
    class:dimmed
    style="background-image: url({itemBox})"
    disabled={!itemId}
    onclick={() => updateItem(1)}
    oncontextmenu={(ev) => {
        ev.preventDefault();
        updateItem(-1);
    }}
>
    {#if itemId !== null}
        <enhanced:img
            src={itemImage(itemId, items.value)}
            class="scale"
            alt={itemId}
        >
        </enhanced:img>
        {#if isNumericItemId(itemId)}
            <div
                class="text-icon"
                class:max={items.value[itemId] === itemsMax[itemId]}
                class:visually-hidden={isProgressiveItemId(itemId)}
            >
                {#if items.value[itemId] !== 0}
                    {items.value[itemId]}
                {/if}
            </div>
        {/if}
    {:else}
        <div class="visually-hidden">Blank</div>
    {/if}
</button>

<style>
    button {
        contain: strict;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        width: 64px;
        height: 64px;
        background-color: rgba(0, 0, 0, 0);
        border: 0;
        padding: 0;
    }

    .scale {
        object-fit: cover;
        width: 64px;
        height: 64px;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
    }

    .dimmed {
        filter: grayscale(50%) brightness(30%);
    }

    .text-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        user-select: none;
        text-align: center;
        position: absolute;
        bottom: 0;
        right: 0;
        width: 40%;
        height: 40%;
        background-color: black;
        color: snow;
    }

    .max {
        color: #00ff00;
    }

    .visually-hidden {
        clip: rect(0 0 0 0);
        clip-path: inset(50%);
        height: 1px;
        overflow: hidden;
        position: absolute;
        white-space: nowrap;
        width: 1px;
    }
</style>
