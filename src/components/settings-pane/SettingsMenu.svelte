<script lang="ts">
    export let title: string;
</script>

<details open>
    <summary>{title}</summary>
    <ul>
        <slot></slot>
    </ul>
</details>

<style>
    ul {
        padding-left: 0px;
        list-style-type: none;
    }

    details {
        padding: 1em;
    }
</style>
