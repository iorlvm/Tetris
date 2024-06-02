<script setup>
import GirdCell from './GirdCell.vue';
import { defineProps } from 'vue';

defineProps({
    girdData: Array
});
</script>

<template>
    <div class="game-body">
        <div class="row">
            <GirdCell :value="-1" v-for="i in 12" :key="i" />
        </div>

        <div class="row" v-for="(rowData, index) in girdData" :key="'row-' + index">
            <template v-if="index < 20">
                <GirdCell :value="-1" />
                <GirdCell :value="cellData" v-for="(cellData, index) in rowData" :key="'cell-' + index" />
                <GirdCell :value="-1" />
            </template>
        </div>

        <div class="row">
            <GirdCell :value="-1" v-for="i in 12" :key="i" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.row {
    display: flex;
}
</style>