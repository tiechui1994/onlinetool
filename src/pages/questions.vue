<template>
    <div class="questions">
        <head-top></head-top>
        <el-row :gutter="20">
            <el-col :span="6" :offset="1" v-for="(item,idx) in items" :key="idx" class="item">
                <div class="image">
                    <el-image :src="item.url" fit="contain"></el-image>
                </div>
                <div>
                    <el-button type="success" @click="toDst(item.category)">{{item.name}}</el-button>
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
                items: [{
                    name: '日历题目',
                    category: 'calendar',
                    url: 'http://www.sidatiku.com/img/dtt/cover/calendar.webp',
                }, {
                    name: '比例题目',
                    category: 'percentage',
                    url: 'http://www.sidatiku.com/img/dtt/cover/percentage.webp',
                }, {
                    name: '安排时间',
                    category: 'schedule',
                    url: 'http://www.sidatiku.com/img/dtt/cover/schedule.webp',
                }, {
                    name: '找规律',
                    category: 'pattern',
                    url: 'http://www.sidatiku.com/img/dtt/cover/pattern.webp',
                }, {
                    name: '排序题',
                    category: 'sorting',
                    url: 'http://www.sidatiku.com/img/dtt/cover/sorting.webp',
                }, {
                    name: '记忆与其他',
                    category: 'memory',
                    url: 'http://www.sidatiku.com/img/dtt/cover/memory.webp',
                }]
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

<style scoped lang="less">
    .questions {
        .item {
            text-align: center;
            margin-top: 20px;
        }

        .image {
            display: inline-block;
            width: 200px;
            height: 200px;
        }

        img {
            vertical-align: middle;
        }
    }
</style>
