<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutFooter from './components/LayoutFooter.vue'
</script>

<template>
    <div>
        <LayoutNav></LayoutNav>
        <router-view></router-view>
        <LayoutFooter></LayoutFooter>
    </div>
</template>