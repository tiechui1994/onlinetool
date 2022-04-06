<template>
    <div class="questions">
        <head-top></head-top>
        <el-row align="middle">
            <el-col :span="span" v-for="(item,idx) in items" :key="idx" class="item">
                <div class="image">
                    <el-image :src="prefix+item.url" fit="contain"></el-image>
                </div>
                <div class="btn">
                    <el-button type="primary" :size="btnsize" @click="toDst(item.category)">
                        {{item.name}}
                    </el-button>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import HeadTop from '../components/HeadTop'

    export default {
        components: {
            HeadTop
        },
        data() {
            return {
                span: 8,
                btnsize: "media",
                prefix: 'https://cdn.jsdelivr.net/gh/tiechui1994/onlinetool@master',
                items: [{
                    name: '日历题目',
                    category: 'calendar',
                    url: '/static/img/calendar.webp',
                }, {
                    name: '比例题目',
                    category: 'percentage',
                    url: '/static/img/percentage.webp',
                }, {
                    name: '安排时间',
                    category: 'schedule',
                    url: '/static/img/schedule.webp',
                }, {
                    name: '找规律',
                    category: 'pattern',
                    url: '/static/img/pattern.webp',
                }, {
                    name: '排序题',
                    category: 'sorting',
                    url: '/static/img/sorting.webp',
                }, {
                    name: '记忆与其他',
                    category: 'memory',
                    url: '/static/img/memory.webp',
                }]
            }
        },
        created() {
            const isMobile = navigator.userAgent.match(
                /(phone|pad|pod|iPhone|iPod|ios|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
            );
            if (isMobile) {
                this.span = 12;
                this.btnsize = "small"
            } else {
                this.span = 8;
                this.btnsize = "media"
            }
        },
        methods: {
            toDst: function (category) {
                this.$router.push({
                    path: '/questions/topic',
                    name: 'topic',
                    params: {
                        category: category,
                    },
                    query: {
                        category: category,
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
    @import "../style/const";

    .questions {
        .item {
            text-align: center;
            padding-top: 15px;
        }

        .image {
            display: inline-block;

            @media @mobile {
                width: 100px;
                height: 100px;
            }

            @media @web {
                width: 200px;
                height: 200px;
            }

            .el-image {
                overflow: unset;
            }
        }

        img {
            vertical-align: middle;
        }
    }
</style>
