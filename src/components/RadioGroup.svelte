<script lang="ts">
    export let title: string;
    export let groupName: string;
    export let items: { value: string; label: string }[];
    export let group: string | undefined = items?.[0].value;
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
