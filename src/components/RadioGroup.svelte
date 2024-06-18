<script lang="ts">
    interface Props {
        title: string;
        groupName: string;
        items: { value: string; label: string}[];
        group: string | undefined;
    }

    let { title, groupName, items, group = $bindable(items?.[0].value) }: Props = $props();
</script>

<fieldset>
    <legend>{title}</legend>
    <ul>
        {#each items as item}
            {@const id = `rg-${groupName}-${item.value}`}
            <li>
                <input
                    {id}
                    type="radio"
                    name={groupName}
                    value={item.value}
                    bind:group
                />
                <label for={id}>{item.label}</label>
            </li>
        {/each}
    </ul>
</fieldset>

<style>
    ul {
        padding-left: 0px;
        list-style-type: none;
    }
</style>
