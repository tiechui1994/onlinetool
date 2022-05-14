<template>
    <div class="echarts">
        <div id="echarts0" class="item"></div>
        <div id="echarts1" class="item"></div>
        <div id="echarts2" class="item"></div>
        <div id="echarts3" class="item"></div>
        <div id="echarts4" class="item"></div>
        <div id="echarts5" class="item"></div>
        <div id="echarts6" class="item"></div>
        <div id="echarts7" class="item"></div>
        <div id="echarts8" class="item"></div>
        <div id="echarts9" class="item"></div>
        <div id="echarts10" class="item"></div>
        <div id="echarts11" class="item table-item">
            <span class="title">{{question12}}</span>
            <el-table :data="data12" border>
                <el-table-column
                    prop="name"
                    label="选项"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="value"
                    label="小计"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="percent"
                    label="比例">
                </el-table-column>
            </el-table>
        </div>
        <div id="echarts12" class="item table-item">
            <span class="title">{{question13}}</span>
            <el-table :data="data13" border>
                <el-table-column
                    prop="name"
                    label="选项"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="value"
                    label="小计"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="percent"
                    label="比例">
                </el-table-column>
            </el-table>
        </div>
        <div id="echarts13" class="item"></div>
        <div id="echarts14" class="item"></div>
        <div id="echarts15" class="item"></div>
    </div>
</template>

<script>
    import * as echarts from 'echarts';

    export default {
        data() {
            return {
                question12: '',
                question13: '',
                data12: [],
                data13: [],
            }
        },
        async mounted() {
            const data = await this.getitems();
            console.info(data);
            for (let i = 0; i <= 15; i++) {
                this.draw(i, data)
            }
        },
        methods: {
            async getitems() {
                const requestOptions = {
                    method: "GET",
                    headers: {"Content-Type": "application/json"},
                };
                return await fetch("https://jobs.tiechui1994.vercel.app/api/diagram", requestOptions)
                    .then(response => response.json());
            },
            draw(idx, items) {
                const item = items[idx];
                if (item.type === 'pie') {
                    const echart = echarts.init(document.getElementById('echarts' + idx));
                    echart.setOption({
                        title: {
                            text: idx + 1 + ". " + item.question,
                            left: 'center'
                        },
                        tooltip: {},
                        series: [
                            {
                                name: 'Access From',
                                type: 'pie',
                                radius: '50%',
                                data: item.data,
                            }
                        ]
                    });
                } else if (item.type === 'bar') {
                    const echart = echarts.init(document.getElementById('echarts' + idx));
                    const names = [], values = [];
                    item.data.forEach((item) => {
                        names.push(item.name);
                        values.push(item.value);
                    });

                    echart.setOption({
                        title: {
                            text: idx + 1 + ". " + item.question,
                            left: 'center'
                        },
                        tooltip: {},
                        xAxis: [
                            {
                                type: 'category',
                                data: names,
                                axisTick: {
                                    alignWithLabel: true
                                }
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value'
                            }
                        ],
                        series: [
                            {
                                name: 'Access',
                                type: 'bar',
                                radius: '20%',
                                data: values,
                            }
                        ]
                    })
                } else {
                    let total = 0;
                    const values = [];
                    item.data.forEach((item) => {
                        total += item.value
                    });
                    item.data.forEach((item) => {
                        values.push({
                            name: item.name,
                            value: item.value,
                            percent: (item.value * 100 / total).toFixed(2) + "%"
                        })
                    });

                    values.push({
                        name: "本题有效填写人次",
                        value: total
                    });
                    if (idx === 11) {
                        this.question12 = idx + 1 + ". " + item.question
                        this.data12 = values
                    }
                    if (idx === 12) {
                        this.question13 = idx + 1 + ". " + item.question
                        this.data13 = values
                    }
                }
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../style/const";

    .echarts {
        .item {
            margin: 0 auto;
            width: 800px;
            height: 400px;
        }

        .table-item {
        }

        .title {
            color: #293346;
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 15px;
            text-align: center;
            display: block;
        }
    }
</style>
