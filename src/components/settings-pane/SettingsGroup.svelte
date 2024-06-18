<script lang="ts">
    export let title: string;
</script>

<li>
    <fieldset>
        <legend>{title}</legend>
        <ul>
            <slot></slot>
        </ul>
    </fieldset>
</li>

<style>
    ul {
        padding-left: 0px;
        list-style-type: none;
    }
</style>
