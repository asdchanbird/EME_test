<template>
    <div class="w-1/2">
        <div class="custom-tree-container">
            <p>Using render-content</p>
            <el-tree ref="tree" :data="dataSource" show-checkbox node-key="id" default-expand-all :expand-on-click-node="false"
                :render-content="renderContent" draggable />
            <!-- <p class="text-lg font-bold">Using scoped slot</p> -->
            <!-- <el-tree :data="dataSource" show-checkbox node-key="id" default-expand-all :expand-on-click-node="false" >
                <template #default="{ node, data }">
                    <span class="custom-tree-node my-2">
                        <p>{{ console.log(node) }}</p>
                        <span class="text-lg w-1/2">{{ node.label }}</span>
                        <span class="w-1/2 text-right">
                            <a @click="append(data)" class="bg-gray-200 rounded-md p-1">+</a>
                            <a style="margin-left: 8px" @click="remove(node, data)" class="bg-gray-200 rounded-md p-1">-</a>
                        </span>
                    </span>
                </template>
            </el-tree> -->
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type Node from 'element-plus/es/components/tree/src/model/node'
const tree = ref()
interface Tree {
    id: number
    label: string
    children?: Tree[]
}
let id = 1000

const append = (data: Tree) => {
    const newChild = { id: id++, label: '未命名資料夾', children: [] }
    if (!data.children) {
        data.children = []
    }
    data.children.push(newChild)
    dataSource.value = [...dataSource.value]
    console.log(newChild)
    rename(data, newChild.id)
}


const remove = (node: Node, data: Tree) => {
    const parent = node.parent
    const children: Tree[] = parent.data.children || parent.data
    const index = children.findIndex((d) => d.id === data.id)
    // children.splice(index, 1)
    // dataSource.value = [...dataSource.value]
    tree.value.remove(data) 
}
const rename= (data: Tree, key: number) => {
    // const parent = node.parent
    // const children: Tree[] = parent.data.children || parent.data
    console.log('rename:', data)
    if (data.children) {
        const children = data.children[data.children?.length-1] as any
        console.log(children)
        // children.label = 
    }
    console.log(tree.value.getCurrentKey())
    let newss = {
        id: key,
        label: '最新子節點'
    }
    console.log(key)
    tree.value.updateKeyChildren(key, newss)
    // console.log(tree.value.remove(data))
    // dataSource.value = [...dataSource.value]
        
}
const renderContent = (
    h: any,
    {
        node,
        data,
        store,
    }: {
        node: Node
        data: Tree
        store: Node['store']
    }
) => {
    return h(
        'span',
        {
            class: 'custom-tree-node',
        },
        h('span', null, node.label),
        h(
            'span',
            null,
            h(
                'a',
                {
                    onClick: () => append(data),
                },
                ' + '
            ),
            h(
                'a',
                {
                    style: 'margin-left: 8px',
                    onClick: () => remove(node, data),
                },
                ' - '
            )
        )
    )
}

const dataSource = ref<Tree[]>([
    {
        id: 1,
        label: 'Level one 1',
        children: [
            {
                id: 4,
                label: 'Level two 1-1',
                children: [
                    {
                        id: 9,
                        label: 'Level three 1-1-1',
                    },
                    {
                        id: 10,
                        label: 'Level three 1-1-2',
                    },
                ],
            },
        ],
    },
    {
        id: 2,
        label: 'Level one 2',
        children: [
            {
                id: 5,
                label: 'Level two 2-1',
            },
            {
                id: 6,
                label: 'Level two 2-2',
            },
        ],
    },
    {
        id: 3,
        label: 'Level one 3',
        children: [
            {
                id: 7,
                label: 'Level two 3-1',
            },
            {
                id: 8,
                label: 'Level two 3-2',
            },
        ],
    },
])
</script>

<style>
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 18px;
    padding-right: 8px;
}
/* ::v-deep.el-tree-node__content {
    height: 38px;
} */
.el-tree-node__content {
    color: #626aef;
    margin: 5px 0;
}
</style>
