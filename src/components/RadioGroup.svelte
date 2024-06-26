<script lang="ts">
    interface Props {
        title: string;
        groupName: string;
        items: { value: string; label: string }[];
        group: string | undefined;
    }

    let {
        title,
        groupName,
        items,
        group = $bindable(items?.[0].value),
    }: Props = $props();
</script>

<fieldset role="radiogroup">
    <legend>{title}</legend>

    {#each items as item}
        {@const id = `rg-${groupName}-${item.value}`}
        <!-- https://www.w3.org/WAI/tutorials/forms/grouping/ -->
        <!-- WAI is content wrapping these in divs -->
        <div>
            <input
                {id}
                type="radio"
                name={groupName}
                value={item.value}
                bind:group
            />
            <label for={id}>{item.label}</label>
        </div>
    {/each}
</fieldset>
