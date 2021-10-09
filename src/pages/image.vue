<template>
    <div class="image fillcontain">
        <head-top></head-top>
        <div class="container">
            <div class="header">
                <span class="type-prompt">在线图片格式转换支持:
                    <strong><code>[.jpeg] [.png] [.bmp] [.tif] [.webp] [.svg]</code></strong>
                </span>
            </div>
            <div v-if="imagelist.length===0">
                <el-upload class="dragupload"
                           :action="action"
                           :on-preview="onpreview"
                           :on-error="onerror"
                           :on-success="onsuccess"
                           :accept="imagetype"
                           :show-file-list="false"
                           :multiple="true" :limit="5">
                    <el-button class="raw-button">
                        <div class="button">
                            <span class="button-text">选择文件</span>
                            <icon class="button-icon" id="svg-from-pc" :width="25"
                                  :height="25"></icon>
                        </div>
                    </el-button>

                    <div class="upload-text">
                        <span> 放置文件在这里. 5 MB 最大文件大小</span>
                    </div>
                </el-upload>
            </div>
            <div v-if="imagelist.length > 0">
                <div class="filetable">
                    <table class="table" cellpadding="0" cellspacing="0">
                        <tbody>
                        <tr class="table-row" v-for="(item, idx) in imagelist">
                            <td class="table-col">
                            <span class="col-name">
                                <icon id="svg-image" class="col-name-icon" :width="24"
                                      :height="24"></icon>
                                {{item.name}}
                            </span>
                            </td>
                            <td class="table-col">
                                <span class="col-type"> 到 </span>
                                <el-select class="col-type-input" v-model="imagelist[idx].type"
                                           size="mini" placeholder="...">
                                    <el-option v-for="kv in type"
                                               :key="kv.key"
                                               :label="kv.value"
                                               :value="kv.key">
                                    </el-option>
                                </el-select>
                            </td>
                            <td class="table-col">
                                <el-tag type="success" size="mini">
                                    {{status[item.status]||status[1]}}
                                </el-tag>
                            </td>
                            <td class="table-col col-size">{{item.size}}</td>
                            <td class="table-col col-close">
                                <icon id="svg-close" class="col-close-icon" :width="16"
                                      :height="16" @click.native="onremove(idx)">
                                </icon>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="convertall">
                    <el-select class="col-type-input" value="将所有转换为" size="mini"
                               v-on:change="onchangeall">
                        <el-option v-for="kv in type"
                                   :key="kv.key"
                                   :label="kv.value"
                                   :value="kv.key">
                        </el-option>
                    </el-select>
                </div>
                <div class="upload">
                    <div class="upload-file">
                        <el-upload class="action"
                                   :action="action"
                                   :on-preview="onpreview"
                                   :on-error="onerror"
                                   :on-success="onsuccess"
                                   :accept="imagetype"
                                   :show-file-list="false"
                                   :multiple="true" :limit="5">
                            <el-button class="raw-button">
                            <span class="button-text">
                                <icon id="svg-plus2" :width="14" :height="14"
                                      class="button-prefix-icon"></icon>添加更多文件
                            </span>
                            </el-button>
                        </el-upload>
                        <div class="prompt">使用 Ctrl 或 Shift 一次添加多个文件</div>
                    </div>
                    <div class="upload-convert">
                        <el-button class="raw-button" v-on:click="convert">
                        <span class="button-text">
                             转换<icon id="svg-submit-arrow" :width="20" :height="22"
                                     class="button-suffix-icon"></icon>
                        </span>
                        </el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import HeadTop from '../components/HeadTop'
    import Icon from '../components/Icon'

    export default {
        components: {
            HeadTop,
            Icon
        },
        data() {
            return {
                status: {
                    1: '准备好',
                    2: '转换中',
                    3: '成功',
                    4: '失败',
                },
                type: [{
                    key: 'image/png',
                    value: 'png',
                }, {
                    key: 'image/jpeg',
                    value: 'jpeg',
                }, {
                    key: 'image/bmp',
                    value: 'bmp',
                }, {
                    key: 'image/webp',
                    value: 'webp',
                }, {
                    key: 'image/svg+xml',
                    value: 'svg',
                }],
                alltyle: '',
                action: 'https://jsonplaceholder.typicode.com/posts/',
                imagetype: 'image/jpeg,image/png,image/bmp,image/webp,image/tif,image/svg+xml',
                imagelist: []
            }
        },
        methods: {
            onchangeall: function (val) {
                for (let i = 0; i < this.imagelist.length; i++) {
                    this.imagelist[i].type = val
                }
            },
            onpreview: function (file) {
                console.log('onpreview', file)
            },
            onerror: function (err, file) {
                this.$message.error(`上传失败:${file.name}`)
            },
            onsuccess: function (respose, file) {
                let size;
                if (file.size > 1024 * 1024) {
                    size = `${(file.size / 1024 * 1024).toFixed(2)} MB`
                } else if (file.size > 1024) {
                    size = `${(file.size / 1024).toFixed(2)} KB`
                } else {
                    size = `${file.size} B`
                }
                this.imagelist.push({
                    name: file.name,
                    type: file.raw.type,
                    status: 1,
                    size: size
                });
            },
            convert: function () {
                console.warn('convert')
            },

            onremove: function (idx) {
                this.imagelist.splice(idx, 1)
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    @import "../style/common";

    .image {
        .container {
            margin-left: 20px;
            width: 80%;
        }

        .header {
            margin-top: 10px;
            margin-bottom: 10px;
            border: 1px solid #e6e6e6;
            border-radius: 2px;
            border-left-width: 8px;

            .type-prompt {
                padding: 15px 0 15px 15px;
                display: block;
                font-size: 16px;
                font-weight: 500;
            }
        }

        .dragupload {
            text-align: center;
            padding: 50px 0;
            background-color: #3c3c3c;
            background-image: linear-gradient(45deg, rgba(0, 0, 0, .06) 25%, transparent 0),
            linear-gradient(-45deg, rgba(0, 0, 0, .06) 25%, transparent 0),
            linear-gradient(45deg, transparent 75%, rgba(0, 0, 0, .06) 0),
            linear-gradient(-45deg, transparent 75%, rgba(0, 0, 0, .06) 0);
            background-size: 24px 24px;
            background-position: 0 0, 0 12px,12px -12px, -12px 0;

            .raw-button {
                padding: 0;
                border: 0;
            }

            .button {
                display: inline-block;
                vertical-align: top;
                background-color: #f33;
                color: #fff;
                border-radius: 4px;

                .button-text {
                    display: inline-block;
                    vertical-align: top;
                    margin: 0;
                    padding: 20px 45px 20px 90px;
                    color: inherit;
                    font-size: 16px;
                    line-height: 25px;
                    font-weight: 400;
                }

                .button-icon {
                    display: inline-block;
                    vertical-align: top;
                    padding: 20px 40px 20px 45px;
                    background-color: transparent !important;
                    border-width: 0 !important;
                    border-radius: 0 !important;
                    transition: opacity .15s ease-in-out, color .15s ease-in-out;
                }
            }

            .upload-text {
                padding: 13px 0 2px;
                color: #959595;
                letter-spacing: -.3px;
                font-size: 14px;
            }
        }

        .filetable {
            .table {
                display: table;
                border-spacing: 0;
                border-collapse: collapse;
                width: 100%;
                margin: 0 0 10px 0;
                text-align: left;
                line-height: 22px;
                background-color: #f8f8;
                color: #999;

                .table-row {
                    position: relative;
                    display: table-row;
                    flex-direction: row;
                    flex-wrap: wrap;
                    justify-content: flex-start;
                    align-content: stretch;
                    align-items: center;
                    margin: 0;
                    padding: 10px;
                    border: none !important;
                    transition: none;
                }

                .table-col {
                    display: table-cell;
                    flex: none;
                    position: static;
                    padding: 14px 10px;
                    border-bottom: 1px solid #f1f1f1 !important;
                    font-weight: 400;
                }

                .table-col:first-child {
                    padding-left: 26px;
                }

                .col-name {
                    font-size: 14px;
                    margin: 0;
                    transition: none;
                    white-space: nowrap;
                    overflow: hidden;
                }

                .col-name-icon {
                    margin-bottom: -6px;
                    margin-right: 10px;
                    background-color: #fafafa;
                }

                .col-type {
                    font-size: 12px;
                    padding-right: 12px;
                }

                .col-size {
                    font-size: 14px;
                }

                .col-type-input {
                    width: 90px;

                    .el-input__inner {
                        height: 40px;
                        line-height: 40px;
                        font-weight: 700;
                    }
                }

                .col-close {
                    text-align: right;
                    vertical-align: middle;
                    padding-right: 20px;
                    cursor: pointer;
                    transition: opacity .15s ease-in-out, border-color .15s ease-in-out;
                    opacity: .63;
                }

                .col-close-icon {
                    margin-bottom: -2px;
                }
            }
        }

        .convertall {
            text-align: center;
            margin-bottom: 10px;

            .el-input__inner {
                width: 120px;
                padding-left: 0;
                padding-right: 0;
                font-size: 14px;
                color: #333;
                border-width: 0;
            }

            .el-input__inner:hover {
                border: 1px #333 solid;
            }

            .el-input__icon {
                color: red;
                line-height: 28px;
                height: 28px;
                margin-top: 2px;
            }
        }

        .upload {
            display: flex;
            border-radius: 4px;
            background-size: 24px 24px;
            background-color: #3c3c3c;
            background-image: linear-gradient(45deg, rgba(0, 0, 0, .06) 25%, transparent 0),
            linear-gradient(-45deg, rgba(0, 0, 0, .06) 25%, transparent 0),
            linear-gradient(45deg, transparent 75%, rgba(0, 0, 0, .06) 0),
            linear-gradient(-45deg, transparent 75%, rgba(0, 0, 0, .06) 0);
            background-position: 0 0, 0 12px, 12px -12px, -12px 0;
        }

        .upload .upload-file {
            padding: 17px 26px;
            flex: 1;
            width: auto;

            .action {
                display: inline-block;

                .raw-button {
                    padding: 7px 20px 7px 16px;
                }

                .button-text {
                    min-width: 190px;
                    margin: 0;
                    font-weight: 600;
                    text-align: left;
                    letter-spacing: normal;
                    transition: none;
                }

                .button-prefix-icon {
                    color: #f33 !important;
                    margin-right: 12px;
                    margin-bottom: -2px;
                }
            }

            .prompt {
                color: #999;
                font-size: 14px;
                display: inline-block;
                align-self: center;
                line-height: 20px;
                margin-left: 32px;
            }
        }

        .upload .upload-convert {
            flex: 0 1 auto;
            width: auto;

            .raw-button {
                padding: 17px 14px 17px 24px;
                color: #fff;
                background-color: #f33;
                border-color: #f33;
            }

            .button-text {
                position: relative;
                min-width: 100%;
                width: 100%;
                font-size: 18px;
                line-height: 28px;
                font-weight: 600;
                text-align: left;
                vertical-align: middle;
            }

            .button-suffix-icon {
                margin-left: 60px;
                margin-bottom: -4px
            }
        }
    }

</style>