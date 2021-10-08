<template>
    <div class="index fillcontain">
        <el-row style="height:100%;">
            <el-col :span="3" style="min-height:100%; background-color:#545c64;">
                <el-menu :default-active="defaultActive"
                         background-color="#545c64"
                         text-color="#fff"
                         active-text-color="#ffd04b"
                         router>
                    <el-menu-item :disabled="true"></el-menu-item>
                    <el-menu-item index="image">
                        <i class="el-icon-link"></i><span class="nav-name">图片转换</span>
                    </el-menu-item>

                    <el-menu-item index="coding">
                        <i class="el-icon-link"></i><span class="nav-name">编码转换</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="21" style="height: 100%; overflow: auto;">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        computed: {
            defaultActive: function () {
                if (this.$route.path === '/') {
                    return '/image'
                }
                return this.$route.path.replace('/', '');
            }
        },
    }
</script>

<style lang="less" rel="stylesheet/less">
    @import "../style/common";

    .index .nav-name {
        font-size: 14px;
        font-weight: 600;
    }
</style>
