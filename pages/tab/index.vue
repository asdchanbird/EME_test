<template>
    <div class="flex relative">
        <div class="test border-2">
            <h1 class="test">你好嗎 h1</h1>
            <h1>124124</h1>
            <hr class="m-2">
            <h2>你好嗎 h2</h2>
            <h2>21124</h2>
            <hr class="m-2">
            <h3>你好嗎 h3</h3>
            <h3>21124</h3>
            <hr class="m-2">
            <h4>你好嗎 h4</h4>
            <h4>21124</h4>
            <hr class="m-2">
            <h5>你好嗎 h5</h5>
            <h5>21124</h5>
            <hr class="m-2">
            <h6>你好嗎 h6</h6>
            <h6>21124</h6>
            <hr class="m-2">
            <p>你好嗎 p</p>
            <p>21124</p>
            <hr class="m-2">
        </div>
        <div>
            <ButtonBtn1 @click="hello()"/>
            <ButtonBtn2 @click="hello()"/>
        </div>
        <el-button type="primary" style="margin-left: 16px" @click="drawer = true">
            open
        </el-button>
        <div></div>
        <div class="drawer border-x-2 border-black">
            <div>
                <button class="bg-white my-2 p-2 text-2xl font-bold border-2 border-black rounded-l-lg absolute drawerBtn" @click="tabClick">頁面設計</button>
                <button class="bg-white my-2 p-2 text-2xl font-bold border-2 border-black rounded-l-lg absolute drawerBtn top-28" @click="tabClick">組件設計</button>
                
            </div>
            <div class="p-2">
                <button @click="close()">關閉</button>
                <div id="SimpleJSTree"></div>
            </div>
        </div>
        
        <el-drawer v-model="drawer" :show-close="true"  title="設定功能" size="50%" :lazy="true" :modal="false" class="relative">
            <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                <el-tab-pane label="基本設定" name="first" >
                    <div id="SimpleJSTree"></div>
                </el-tab-pane>
                <el-tab-pane label="進階設定" name="second">Config</el-tab-pane>
                <el-tab-pane label="Vue檔設定" name="third">Role</el-tab-pane>
                <el-tab-pane label="任務" name="fourth">Task</el-tab-pane>
            </el-tabs>
        </el-drawer>
    </div>
</template>  
<script lang="ts" setup>

import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
const drawer = ref(false)
const state = ref(false)
const activeName = ref('first')
const tabPosition = ref('left')
const target = ref()
const tabClick =(event: Event) => {
    if (target.value != event.target) {
        console.log(event.target)
        console.log(target.value)
        $(target.value).removeClass('border-r-white')
        target.value = event.target
        $(event.target).addClass('border-r-white')
    }
    $('.drawer').animate({
        // transform: 'translateX(500px)'
        right: '0px'
    },500)
}
const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event)
}
const close =() => {
    console.log(123)
    $('.drawer').animate({
        right: '-600px'
    },500)
}
const hello = () => {
    console.log('hello')
}

onMounted(() => {
    $(async function () {

        const { data, pending, error, refresh } = await useFetch('/tree', {
            method: 'GET',
            baseURL: 'http://localhost:3000/api'
        })
        console.log(data.value)
        createJSTree(data.value.data);
    });

    function createJSTree(jsondata) {
        $('#SimpleJSTree').jstree({
            "core": {
                "check_callback": true,
                'data': jsondata,
                "ellipsis": true //文字多時省略

            },
            "plugins": ["contextmenu", "dnd",],
            "contextmenu": {
                "items": function ($node) {
                    const tree = $("#SimpleJSTree").jstree(true);
                    return {
                        "Create": {
                            "separator_before": false,
                            "separator_after": true,
                            "label": "新增",
                            "action": false,
                            "submenu": {
                                "File": {
                                    "seperator_before": false,
                                    "seperator_after": false,
                                    "label": "檔案",
                                    action: function (obj) {
                                        $node = tree.create_node($node, { text: 'New File', type: 'file', icon: 'glyphicon glyphicon-file' });
                                        jsondata.push({ id: 124, text: 'New File', type: 'file', icon: 'glyphicon glyphicon-file' })
                                        tree.deselect_all();
                                        tree.select_node($node);
                                    }
                                },
                                "Folder": {
                                    "seperator_before": false,
                                    "seperator_after": false,
                                    "label": "資料夾",
                                    action: function (obj) {
                                        $node = tree.create_node($node, { text: 'New Folder', type: 'default' });
                                        tree.deselect_all();
                                        tree.select_node($node);
                                    }
                                }
                            }
                        },
                        "Rename": {
                            "separator_before": false,
                            "separator_after": false,
                            "label": "變更名字",
                            "action": function (obj) {
                                tree.edit($node);
                            }
                        },
                        "Remove": {
                            "separator_before": false,
                            "separator_after": false,
                            "label": "刪除",
                            "action": function (obj) {
                                tree.delete_node($node);
                            }
                        },
                        "Copy": {
                            "separator_before": false,
                            "separator_after": false,
                            "label": "複製",
                            "action": function (obj) {
                                console.log($node)
                                tree.copy_node($node, $node.parent, 'last')
                            }
                        }
                    };
                }
            }
        });
    }

    $('#SimpleJSTree').on("select_node.jstree", function (e, data) {
        console.log(data.node)
        sessionStorage.setItem('Node', JSON.stringify(data.node))
    })
    $('#SimpleJSTree').on("copy_node.jstree", function (e, data) {
        console.log(data.node)
        const tree = $("#SimpleJSTree").jstree(true);
        tree.edit(data.node)
    })
    $('#SimpleJSTree').on("changed.jstree", function (e, data) {
        const tree = $("#SimpleJSTree").jstree(true);
    });
    $('#SimpleJSTree').on("modal.jstree", function (e, data) {
        const tree = $("#SimpleJSTree").jstree(true);
        console.log(tree.open_all(), 12141)
    });

})


</script>
<style lang="scss">
.drawer {
    width: 600px;
    height: 100vh;
    background-color: white;
    position: absolute;
    right: -600px;
    z-index: 2000;
    transition: 0.5s;
    box-shadow: 0px 16px 48px 16px rgba(0, 0, 0, 0.08),0px 12px 32px rgba(0, 0, 0, 0.12),0px 8px 16px -8px rgba(0, 0, 0, 0.16)   /* transform: translateX(600px); */
}
.drawerBtn {
    transform: translateX(-52px);
    width: 52px;
    z-index: 2001;
    writing-mode: vertical-lr;
    transition: 0.3s;
    &:hover {
        background-color: var(--el-color-primary);
        color: white;
    }
    &:focus {
        background-color: var(--el-color-primary);
        color: white;
    }
}
:root {
    overflow: hidden;
}
.sd {
    color: red;
}
#tab {
    transition: 0.3s;
}
.tabss {
    transform: translateX(560px);
}
.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    width: 560px;
    font-size: 32px;
    font-weight: 600;
}

.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
    height: 100%;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
/* :deep(.demo-tabs) {
    color: red;
} */
/* :deep(.el-tabs__nav-scroll) {
  width: 50%;
  margin: 0 auto;
} */
.el-tabs__item {
    font-size: 18px;
    font-weight: bold;
}
.el-drawer__title {
    font-weight: bold;
    font-size: 32px;
}
.test {
    box-shadow: $box-shadow;
}
</style>
