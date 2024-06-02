import Cell from "./class/Cell";
import { BlueRicky, ClevelandZ, Hero, OrangeRicky, Piece, RhodeIslandZ, Smashboy, Teewee } from "./class/Piece";

// 定義 TetrisEngine 類別
class TetrisEngine {
    constructor() {
        // 初始化遊戲狀態等相關資料
        this.board = this.createBoard();
        this.nextPiece = new Piece();
        this.holdPiece = null;
        this.started = false;
        this.generateRandomPiece();
    }

    // 產生隨機方塊
    generateRandomPiece() {
        // 將nextPiece傳給holdPiece 並重新創建一個新的新的nextPiece
        this.holdPiece = this.nextPiece;

        // 取得1~7隨機數 獲得對應的方塊形狀
        let random = Math.floor(Math.random() * 7) + 1;
        switch (random) {
            case Cell.ORANGE_RICKY:
                this.nextPiece = new OrangeRicky();
                break;
            case Cell.BLUE_RICKY:
                this.nextPiece = new BlueRicky();
                break;
            case Cell.CLEVELAND_Z:
                this.nextPiece = new ClevelandZ();
                break;
            case Cell.RHODE_ISLAND_Z:
                this.nextPiece = new RhodeIslandZ();
                break;
            case Cell.HERO:
                this.nextPiece = new Hero();
                break;
            case Cell.TEEWEE:
                this.nextPiece = new Teewee();
                break;
            case Cell.SMASHBOY:
                this.nextPiece = new Smashboy();
                break;
        }

        // TODO 檢查是否結束遊戲
        // 判斷標準 生成的方塊與遊戲板塊的已有的方塊重疊
        if (!this.checked(this.holdPiece)) {
            this.endGame();
            return;
        }

        this.writeHoldPiece();
    }

    // 將從board中清除
    clearHoldPiece() {
        this.holdPiece.point.forEach(e => {
            const i = e[0];
            const j = e[1];
            this.board[i][j] = 0;
        });
    }

    // 將方塊依照座標放入board 
    // 當持有的方塊是null時 檢查是否有可消除橫列並產生新的隨機方塊
    writeHoldPiece() {
        if (this.holdPiece === null) {
            return this.eliminate();
            // this.generateRandomPiece();
        } else {
            this.holdPiece.point.forEach(e => {
                const i = e[0];
                const j = e[1];
                this.board[i][j] = this.holdPiece.value;
            });
            return [];
        }
    }

    // 遊戲邏輯，例如移動方塊、旋轉方塊等
    movePiece(key) {
        this.clearHoldPiece();
        switch (key) {
            case 'U':   // 上(旋轉)
                this.holdPiece.rotate(this.board);
                break;
            case 'D':   // 下(加速)
                this.down();
                break;
            case 'L':   // 左(左移)
                this.holdPiece.movcLeft(this.board);
                break;
            case 'R':   // 右(右移)
                this.holdPiece.movcRight(this.board);
                break;
            case 'S':   // 一次到底
                while (this.started && this.holdPiece !== null) {
                    this.down();
                }
                break;
        }
        return this.writeHoldPiece();
    }

    // 消除: 回傳需要消除的行數 (GameView抓取這個行數以後可以製作對應動畫)
    // 後續可以稍微優化一下  沒必要全部都跑過  但目前影響不大  暫時先這樣寫
    // this.board.length - 2的原因是因為有多放了一行不可見的陣列 (為了讓VUE能抓到陣列內容變化)
    eliminate() {
        let res = [];
        for (let i = this.board.length - 2; i >= 0; i--) {
            let flag = true;
            for (let j = 0; j < this.board[i].length; j++) {
                flag &= (this.board[i][j] != 0);
            }
            if (flag) {
                res.push(i);
            }
        }
        return res;
    }

    // 判斷操作是否可以順利執行
    checked(piece) {
        for (let i = 0; i < piece.point.length; i++) {
            if (piece.point[i][0] >= 20 || this.board[piece.point[i][0]][piece.point[i][1]] !== Cell.EMPTY) {
                return false;
            }
        }
        return true;
    }

    // 方塊向下移動
    down() {
        if (!this.holdPiece.down(this.board)) {
            // 如果操作不成功 : 表示已經觸底或是碰觸到其他方塊了
            this.writeHoldPiece();
            this.holdPiece = null;
        }
    }

    // 遊戲開始
    startGame() {
        this.board = this.createBoard();
        this.generateRandomPiece();
        this.started = true;
    }

    // 遊戲結束
    endGame() {
        // 停止遊戲
        this.started = false;
        // 將持有方塊改成結束遊戲的顏色並寫入
        this.holdPiece.value = Cell.END_GAME;
        this.writeHoldPiece();
        // 清空持有方塊
        this.holdPiece = new Piece();
    }


    // 創建遊戲板
    createBoard() {
        const res = [];
        for (let i = 0; i < 21; i++) {
            const row = [];
            for (let j = 0; j < 10; j++) {
                row.push(Cell.EMPTY);
            }
            res.push(row);
        }
        return res;
    }

    // 傳出遊戲資料
    getNextPiece() {
        return this.nextPiece;
    }

    getHoldPiece() {
        return this.holdPiece;
    }

    getGameBoard() {
        return this.board;
    }
}


// 導出 TetrisEngine 類別，讓其他檔案可以引入使用
export default TetrisEngine;