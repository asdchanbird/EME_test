<script setup>
import { onMounted } from "vue";
import { ElMessage, ElMessageBox } from 'element-plus'

var jsondata = reactive([
    { "id": "ajson1", "parent": "#", "text": "父節點1" },
    { "id": "ajson2", "parent": "#", "text": "父節點2" },
    { "id": "ajson3", "parent": "ajson2", "text": "子節點1" },
    { "id": "ajson4", "parent": "ajson2", "text": "子節點2" },
]);
if (process.server) {
    console.log('在server歐')
}

onMounted(()=> {
    if (process.client) {
        console.log('在client歐')
    }
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
            "plugins": ["contextmenu","dnd",],
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
                                        jsondata.push({id: 124, text: 'New File', type: 'file', icon: 'glyphicon glyphicon-file' })
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
                                tree.copy_node($node,$node.parent, 'last')
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
        console.log(tree.open_all(),12141)
    });

})
let centerDialogVisible = ref(false)
function nodeAction(type) {
    const $node = JSON.parse(sessionStorage.getItem('Node'))
    const tree = $("#SimpleJSTree").jstree(true);
    switch(type) {
        case 'createFile':
            console.log(1)
            const newFileNode = tree.create_node($node, { text: 'New File', type: 'file', icon: 'glyphicon glyphicon-file', "li_attr": { class: "customCSS" }  });
            tree.deselect_all();
            tree.select_node(newFileNode);
            break;
        case 'createFolder':
            console.log(2)
            const newFolderNode = tree.create_node($node, { text: 'New Folder', type: 'default', "li_attr": { class: "customCSS" }  });
            console.log(newFolderNode)
            tree.deselect_all();
            tree.select_node(newFolderNode);
            break;
        case 'edit':
            tree.edit($node)
            break;
        case 'delete':
            centerDialogVisible.value = true
            break;
        case 'copy':
            tree.copy_node($node, $node.parent, 'last')
            break;

    }
    console.log(tree.get_json())
    
}
function closeDialog() {
    const $node = JSON.parse(sessionStorage.getItem('Node'))
    const tree = $("#SimpleJSTree").jstree(true);
    tree.delete_node($node);
    centerDialogVisible.value = false
}
const radio1 = ref('')
const drawer = ref(false)
</script>
<template>
    <div>
        <div>
            <client-only>
            <el-button type="primary" style="margin-left: 16px" @click="drawer = true">
            open
            </el-button>
    
            <el-drawer v-model="drawer" title="I am the title" :with-header="false">
                <span>Hi there!</span>
                <div id="SimpleJSTree"></div>
            </el-drawer>
                <div class="m-10">
                    <div class="my-8">
                        <el-button type="primary" @click="nodeAction('createFile')">新增檔案</el-button>
                        <el-button type="primary" @click="nodeAction('createFolder')">新增資料夾</el-button>
                        <el-button type="success" @click="nodeAction('edit')">編輯</el-button>
                        <el-button type="danger" @click="nodeAction('delete')">刪除</el-button>
                        <el-button type="info" @click="nodeAction('copy')">複製</el-button>
                    </div>
                </div>
                <el-dialog v-model="centerDialogVisible" title="刪除訊息" width="30%" center>
                    <span>
                        確認要刪除此資料夾檔案嗎?
                    </span>
                    <template #footer>
                      <span class="dialog-footer">
                        <el-button @click="centerDialogVisible = false">取消</el-button>
                        <el-button type="primary" @click="closeDialog()">
                          確認
                        </el-button>
                      </span>
                    </template>
                </el-dialog>
                <NuxtLink to="/docs">draggable移動</NuxtLink>
            </client-only>
        </div>
        <div>
            <el-radio-group v-model="radio1" size="large" fill="#409EFF" :border="false">
              <el-radio-button label="New York" />
              <el-radio-button label="Washington" />
              <el-radio-button label="Los Angeles" />
              <el-radio-button label="Chicago" />
            </el-radio-group>
          </div>

    </div>
</template>
<style scoped>
.customCSS {
    margin: 10px !important;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}

</style>