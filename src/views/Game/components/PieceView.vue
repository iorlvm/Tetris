<script setup>
import GirdCell from './GirdCell.vue';
import { defineProps } from 'vue';

defineProps({
    piece: Object
});
</script>

<template>
    <div class="piece-view">
        <div>
            <!-- piece?.shape 因為消除的動畫 產出不會這麼即時 避免空值異常崩潰 -->
            <div class="row" v-for="(rowData, index) in piece?.shape" :key="index">
                <GirdCell :value="cellData != 0 ? piece.value : 0" v-for="(cellData, index) in rowData" :key="index" />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.piece-view {
    background-color: black;
    width: 80px;
    height: 80px;
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.row {
    display: flex;
}
</style>