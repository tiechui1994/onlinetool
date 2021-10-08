<template>
    <div class="index fillcontain">
        <el-row style="height:100%;">
            <el-col :span="4" style="min-height:100%; background-color:#545c64;">
                <el-menu :default-active="defaultActive"
                         background-color="#545c64"
                         text-color="#fff"
                         active-text-color="#ffd04b"
                         router>
                    <el-menu-item index="image"><i class="el-icon-link"></i>图片转换</el-menu-item>

                    <el-menu-item index="coding"><i class="el-icon-link"></i>编码转换</el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="20" style="height: 100%; overflow: auto;">
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

<style lang="css">
    @import "../style/common.css";
</style>
