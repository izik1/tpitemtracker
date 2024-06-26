<script lang="ts">
    let {
        id,
        label,
        checked = $bindable(false),
    }: { id: string; label: string; checked: boolean } = $props();
</script>

<div>
    <input type="checkbox" {id} bind:checked />
    <label for={id}>{label}</label>
</div>
