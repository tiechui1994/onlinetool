<template>
    <svg :width="width" :height="height" :class="iconclass">
        <use :href="`#${id}`"></use>
    </svg>
</template>

<script>
    export default {
        name: 'icon',
        props: {
            width: {
                type: Number,
                default: 14
            },
            height: {
                type: Number,
                default: 14
            },
            iconclass: {
                type: String,
                default: ''
            },
            id: {
                type: String,
                default: ''
            }
        }
    }
</script>

<style>
    svg {
        overflow: visible !important;
        fill: currentColor;
        transform: translateZ(0);
    }
</style>