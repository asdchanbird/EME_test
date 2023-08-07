<script setup lang="ts">
const title: any = ref()
const id = ref(1)
</script>
<template>
    <div>
        <p>Example of data fetching inside a component:</p>
        <p><button @click="id--">Previous</button> - <button @click="id++">Next</button></p>
        <TheQuote :id="id" />
        <NuxtLink to="/">Back home</NuxtLink>
      </div>
      <el-tabs type="border-card">
      <el-tab-pane label="User">User</el-tab-pane>
      <el-tab-pane label="Config">Config</el-tab-pane>
      <el-tab-pane label="Role">Role</el-tab-pane>
      <el-tab-pane label="Task">Task</el-tab-pane>
    </el-tabs>
</template>
<style lang="scss">
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