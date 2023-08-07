<template>
    <Transition name="fade">        
        <div class="bg-blue-300">
            12312
        </div>
    </Transition>
</template>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>