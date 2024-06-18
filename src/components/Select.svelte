<script lang="ts">
    let {
        title,
        name,
        options,
        value = $bindable(options?.[0].value),
        enabled = true,
    }: {
        title: string;
        name: string;
        options: { value: string; label: string }[];
        value: string;
        enabled?: boolean;
    } = $props();
</script>

<li>
    <label for="sl-{name}">{title}</label>
    <select id="sl-{name}" bind:value disabled={!enabled}>
        {#each options as item}
            <option value={item.value}>{item.label}</option>
        {/each}
    </select>
</li>
