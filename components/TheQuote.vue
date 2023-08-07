<script setup lang="ts">
const props = defineProps({
    id: Number
})
// const { data: quote, pending, error } = await useFetch(() => `https://dummyjson.com/quotes/${props.id}`)

const datas = ref([])
const fetchData = (async ()=> {
    await nextTick()
    const res = new Promise((resolve,reject)=> {
        useFetch('https://192.168.36.52:8443/DashboardManagementAPI/DashboardDesignGroup/ReadAll',{
            method: 'GET',
            server: false,
            onRequestError({ request, options, error }) {
                // 处理请求错误
                console.log("服务器链接失败!");
                reject(error);
            },
            onResponse({ request, response, options }) {
                console.log(response._data)
                // 处理响应数据
                resolve(response._data);
            },
        })
    })
    return res
    // return Data.value   
})
const { data: user, refresh } = useAsyncData('user', () => $fetch('https://192.168.36.52:8443/DashboardManagementAPI/DashboardDesignGroup/ReadAll'));

// let result = await fetchData()
// console.log(result)
const { data: answer } = await useFetch('https://jsonplaceholder.typicode.com/todos/1', {
    method: 'GET',
})
console.log(answer)  
// console.log(result)
onMounted(async()=> {
    // console.log(answer)
    // datas.value = aa.result
    // console.log(datas.value)
    // const result = await fetchData()
    // console.log(result)
})

// console.log(quote)
</script>

<template>
    <div>
        <!-- <p v-if="pending">Fetching...</p>
        <pre v-else-if="error">Could not load quote: {{ error.data }}</pre>
        <figure v-else class="quote">
            <blockquote>{{ quote.quote }}</blockquote>
            <figcaption>&mdash; {{ quote.author }}</figcaption>
        </figure> -->
        <!-- {{ user }} -->
        <div>
            <h2>userId</h2>
            {{ answer.userId }}
            <h2>title</h2>
            {{ answer.title }}
        </div>
        <!-- {{ fetchData() }} -->
        <!-- <ClientOnly> -->
            <!-- <h2 v-if="datas != {}">{{ datas }}1213</h2> -->
        <!-- </ClientOnly> -->
    </div>
</template>

<style scoped>
.quote {
    font: 1.25rem serif, system-ui;
    line-height: 150%;
    max-width: 60ch;
    margin: 1.5rem 0;
    padding: 1rem;
    border-radius: .5em;
    background: hsl(260, 60%, 96%);
    border: 1px solid hsl(260, 60%, 92%);
}

.quote figcaption,
.quote blockquote {
    margin: 1rem;
}
</style>