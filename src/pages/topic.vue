<template>
    <div class="topic">
        <div class="back">
            <el-button type="danger" @click="goback()" class="backbtn">返回</el-button>
        </div>

        <div class="title">
            <ul v-for="(item, key) in items" :key="key">
                <li @click="onclick(key)">
                    <el-button v-if="key === idx" class="btn" type="success" size="mini">{{key+1}}</el-button>
                    <el-button v-if="key !== idx" class="btn" size="mini">{{key+1}}</el-button>
                </li>
            </ul>
        </div>

        <div class="content">
            <span class="span1">題目</span>
            <img :src="'/static/'+items[idx].questionImg+'.webp'"/>
            <span class="span2">答案</span>
            <img :src="'/static/'+items[idx].answerImg+'.webp'"/>
        </div>

    </div>
</template>

<script>
    import {calendar, percentage, schedule, sorting, memory, pattern} from "../config/local"

    export default {
        data() {
            return {
                idx: -1,
                items: [{
                    questionImg: "",
                    answerImg: ""
                }]
            }
        },
        created() {
            const query = this.$route.query;
            switch (query.category) {
                case 'calendar':
                    this.items = calendar;
                    break;
                case 'percentage':
                    this.items = percentage;
                    break;
                case 'schedule':
                    this.items = schedule;
                    break;
                case 'sorting':
                    this.items = sorting;
                    break;
                case 'memory':
                    this.items = memory;
                    break;
                case 'pattern':
                    this.items = pattern;
                    break;
                default:
                    this.items = calendar;
                    break;
            }
            this.idx = 0;
        },
        methods: {
            onclick: function (idx) {
                this.idx = idx
            },
            goback: function () {
                this.$router.push({
                    path: '/questions',
                    name: 'questions',
                })
            }
        },
        watch: {
            idx: {
                immediate: true,
                handler(val) {
                    this.$nextTick(() => {
                        this.idx = val;
                    })
                }
            },
        },
    }
</script>

<style scoped lang="less">
    .topic {
        width: 100%;
        padding-left: 15px;
        padding-right: 15px;
        padding-top: 15px;

        .back {
            text-align: center;

            .backbtn {
                padding-left: 75px;
                padding-right: 75px;
                margin-bottom: 10px;
                margin-top: -5px;
            }
        }

        .title {
            ul {
                display: inline;
                white-space: nowrap;
            }
            ul li {
                padding: 2px 1px;
                display: inline-block;
                white-space: nowrap;
            }

            .btn {
               padding: 7px !important;
            }
        }
        .content {
            span {
                display: inline-block;
                margin: 0 auto;
                text-align: center;
                width: 100%;
                padding-top: 5px;
                padding-bottom: 5px;
                font-size: 18px;
            }

            .span1 {
                color: green;
            }

            .span2 {
                color: red;
            }

            img {
                display: block;
                margin: 0 auto;
                max-width: 85%;
            }
        }
    }
</style>
