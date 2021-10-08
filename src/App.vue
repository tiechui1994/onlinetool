<template>
    <div id="app" class="fillcontain">
        <router-view v-if="isRouteAlive"></router-view>
    </div>
</template>

<script>
    export default {
        provide() {
            return {
                reload: this.reload
            }
        },
        data() {
            return {
                isRouteAlive: true
            }
        },
        methods: {
            reload() {
                this.isRouteAlive = false;
                this.$nextTick(() => {
                    this.isRouteAlive = true
                })
            }
        }
    }
</script>

<style lang="less">
   @import "style/common";
</style>
