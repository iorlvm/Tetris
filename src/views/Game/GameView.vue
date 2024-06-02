<script setup>
import Cell from '@/game_manager/class/Cell';
import GameBody from './components/GameBody.vue';
import PieceView from './components/PieceView.vue';
import TetrisEngine from '@/game_manager/TetrisEngine';
import { onMounted, ref } from 'vue';

const gameBoard = ref([]);
const nextPiece = ref([]);
const holdPiece = ref([]);


const tetrisEngine = new TetrisEngine();

onMounted(() => {
    refresh();
    document.addEventListener('keydown', keydown);
});

const refresh = () => {
    gameBoard.value = tetrisEngine.getGameBoard();
    nextPiece.value = tetrisEngine.getNextPiece();
    holdPiece.value = tetrisEngine.getHoldPiece();
    gameBoard.value.splice(20, 1, []); // 讓vue能夠監聽到陣列內容改變
}

const dwon = () => {
    const res = tetrisEngine.movePiece('D');
    if (res.length > 0) {
        // 消除動畫
        eliminateAnimation(res, 25, 300);
    } else if (tetrisEngine.holdPiece == null) {
        tetrisEngine.generateRandomPiece();
    }
}

const space = () => {
    const res = tetrisEngine.movePiece('S');
    if (res.length > 0) {
        // 消除動畫
        eliminateAnimation(res, 25, 300);
    } else {
        tetrisEngine.generateRandomPiece();
    }

}

const eliminateAnimation = (res, interval, duration) => {
    let count = 0;
    const animationInterval = setInterval(() => {
        if (count >= duration / interval) {
            clearInterval(animationInterval);
            eliminate(res);
            tetrisEngine.generateRandomPiece();
            refresh();
            return;
        }
        let color = count % 2 == 0 ? Cell.ELIMINATE : Cell.EMPTY;
        res.forEach(i => {
            for (let j = 0; j < tetrisEngine.board[i].length; j++) {
                tetrisEngine.board[i][j] = color;
            }
        });
        refresh();
        count++;
    }, interval);
}


const eliminate = (res) => {
    res.forEach(e => {
        tetrisEngine.board.splice(e, 1);
    });
    res.forEach(() => {
        tetrisEngine.board.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    });
}


let started = false;
const keydown = (event) => {
    event.preventDefault();
    // console.log(event.key);
    switch (event.key) {
        case 'ArrowUp':
            if (!started) return;
            tetrisEngine.movePiece('U');
            refresh();
            break;
        case 'ArrowDown':
            if (!started) return;
            dwon();
            refresh();
            break;
        case 'ArrowLeft':
            if (!started) return;
            tetrisEngine.movePiece('L');
            refresh();
            break;
        case 'ArrowRight':
            if (!started) return;
            tetrisEngine.movePiece('R');
            refresh();
            break;
        case ' ':
            if (!started) return;
            space();
            refresh();
            break;
        case 'Enter':
            if (!started) {
                tetrisEngine.startGame();
                started = true;
                let timer = setInterval(() => {
                    dwon();
                    started = tetrisEngine.started;
                    refresh();
                    if (!started) {
                        clearTimeout(timer);
                    }
                }, 1000);
                refresh();
            }
            break;
    }
};

</script>

<template>
    <div class="container">
        <main>
            <PieceView :piece="holdPiece" />
            <GameBody :gird-data="gameBoard" />
            <PieceView :piece="nextPiece" />
        </main>
    </div>
</template>

<style lang="scss" scoped>
main {
    margin: 5px;
    display: flex;
    justify-content: center;
}

.game {
    margin: 0 20px;
}

.row {
    display: flex;
}

.grid-cell {
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
</style>