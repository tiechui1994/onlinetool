<template>
    <div class="topic">
        <div class="back">
            <el-button type="danger" @click="goback()" class="backbtn">返回</el-button>
            <el-input placeholder="请输入内容" v-model="search" @change="onselect">
                <el-button slot="append" icon="el-icon-search" @click="onsearch()"></el-button>
            </el-input>
        </div>

        <div class="title">
            <ul>
                <li @click="onclick(key)" v-for="(item, key) in items" :key="key">
                    <el-button v-if="key === idx" class="btn" type="success" size="mini">{{key+1}}
                    </el-button>
                    <el-button v-if="key !== idx" class="btn" size="mini">{{key+1}}</el-button>
                </li>
            </ul>
        </div>

        <div class="content" v-if="idx>=0">
            <span class="span1">題目</span>
            <img :src="prefix+items[idx].questionImg+'.webp'"/>
            <span class="span2">答案</span>
            <img :src="prefix+items[idx].answerImg+'.webp'"/>
        </div>

    </div>
</template>

<script>
    import {calendar, percentage, schedule, sorting, memory, pattern} from "../config/local"

    export default {
        data() {
            return {
                prefix: 'https://cdn.jsdelivr.net/gh/tiechui1994/onlinetool@master/static/',
                idx: -1,
                search: "",
                items: [{
                    questionImg: "",
                    answerImg: ""
                }]
            }
        },
        created() {
            this.items = this.getitems();
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
            },
            getitems: function () {
                const query = this.$route.query;
                let items = [];
                switch (query.category) {
                    case 'calendar':
                        items = calendar;
                        break;
                    case 'percentage':
                        items = percentage;
                        break;
                    case 'schedule':
                        items = schedule;
                        break;
                    case 'sorting':
                        items = sorting;
                        break;
                    case 'memory':
                        items = memory;
                        break;
                    case 'pattern':
                        items = pattern;
                        break;
                    default:
                        items = calendar;
                        break;
                }
                return items;
            },
            onsearch: function () {
                const items = this.getitems();
                const filter = [];
                items.forEach((item) => {
                    if (item.description.includes(this.search)) {
                        filter.push(item);
                    }
                });

                this.items = filter;
                if (this.items.length > 0) {
                    this.idx = 0;
                } else {
                    this.idx = -1;
                }
            },
            onselect: function (val) {
                this.onsearch()
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
    @import "../style/const";

    .topic {
        padding-left: 15px;
        padding-right: 15px;
        padding-top: 15px;

        @media @mobile {
            width: 100%;
        }

        @media @web {
            width: 80%;
            margin: 0 auto;
        }

        .back {
            text-align: center;
            display: flex;
            margin-bottom: 10px;

            .el-button {
                width: 25%;
            }

            .el-input {
                margin-left: 10px;
                width: calc(75% - 10px);
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
                float: left; /* 设置浮动 */
                word-break: break-all;
                word-wrap: break-word;
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
