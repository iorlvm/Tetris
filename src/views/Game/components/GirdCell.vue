<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps(['value']);

const dynamicClass = computed(() => {
    // 根據接收到的值進行判斷，返回對應的class
    return {
        'border': props.value === -1,
        'empty': props.value === 0,
        'orange-ricky': props.value === 1,
        'blue-ricky': props.value === 2,
        'cleveland-z': props.value === 3,
        'rhode-island-z': props.value === 4,
        'hero': props.value === 5,
        'teewee': props.value === 6,
        'smashboy': props.value === 7,
        'eliminate': props.value === 98,
        'end-game': props.value === 99,
    };
});


</script>

<template>
    <div :class="dynamicClass"></div>
</template>

<style lang="scss" scoped>
div {
    width: 18px;
    height: 18px;
    margin: 0;
    padding: 0;
    border: 1px solid black;
}

.empty {
    background-color: black;
}

.border {
    background-color: gray;
}

.orange-ricky {
    background-color: orange;
}

.blue-ricky {
    background-color: blue;
}

.cleveland-z {
    background-color: chocolate;
}

.rhode-island-z {
    background-color: green;
}

.hero {
    background-color: aqua;
}

.teewee {
    background-color: plum;
}

.smashboy {
    background-color: yellow;
}

.eliminate {
    background-color: rgb(100, 100, 100);
}

.end-game {
    background-color: red;
}
</style>