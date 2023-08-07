<script setup lang="ts">

</script>
<template>
    <button class="bg p-3 px-4 m-4 rounded-lg" id="BaseBtn">
        測試測試
    </button>
</template>
<style lang="scss" scoped>
#BaseBtn {
    border: 2px solid $color-green-600;
    color: $color-green-600;
    transition: 0.5s;
    font-size: 1.5rem;
    &:hover {
        color: $color-white;
        background: $color-green-600;
    }
}
</style>