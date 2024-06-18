<script lang="ts">
    export let title: string;
    export let name: string;
    export let options: { value: string; label: string }[];
    export let value: string | undefined = options?.[0].value;
    export let enabled: boolean = true;
</script>

<li>
    <label for="sl-{name}">{title}</label>
    <select id="sl-{name}" bind:value disabled={!enabled}>
        {#each options as item}
            <option value={item.value}>{item.label}</option>
        {/each}
    </select>
</li>
