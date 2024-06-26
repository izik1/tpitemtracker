<script lang="ts" generics="T">
    let {
        title,
        name,
        options,
        value = $bindable(options?.[0].value),
        enabled = true,
    }: {
        title: string;
        name: string;
        options: { value: T; label: string }[];
        value: T;
        enabled?: boolean;
    } = $props();
</script>

<div>
    <label for="sl-{name}">{title}</label>
    <select id="sl-{name}" bind:value disabled={!enabled}>
        {#each options as item}
            <option value={item.value}>{item.label}</option>
        {/each}
    </select>
</div>
