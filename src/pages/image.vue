<template>
    <div class="image fillcontain">
        <head-top></head-top>
        <div class="container">
            <div class="header">
                <span class="type-prompt">在线图片格式转换支持:
                    <strong><code>[.jpeg] [.png] [.bmp] [.tif] [.webp] [.svg]</code></strong>
                </span>
            </div>
            <div class="filelist"></div>
            <div class="upload">
                <div class="upload-file">
                    <el-upload class="action"
                               :action="action"
                               :on-preview="onpreview"
                               :on-error="onerror"
                               :on-success="onsuccess"
                               :file-list="imagelist" :accept="imagetype"
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
                    <el-button class="raw-button">
                        <span class="button-text">
                             转换<icon id="svg-submit-arrow" :width="20" :height="22"
                                     class="button-suffix-icon"></icon>
                        </span>
                    </el-button>
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
                action: 'https://jsonplaceholder.typicode.com/posts/',
                imagetype: 'image/jpeg,image/png,image/bmp,image/webp,image/tif,image/svg+xml',
                imagelist: []
            }
        },
        methods: {
            onpreview: function (file) {
                console.log('onpreview', file)
            },
            onerror: function (err, file, fileList) {
                this.$message.error(`上传失败:${file.name}`)
            },
            onsuccess: function (respose, file, fileList) {
                console.log('onchange', file, fileList)
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