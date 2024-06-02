import Cell from "./Cell";

// 方塊的父類別 
class Piece {
    static WIDTH = 10;
    static HIGHT = 20;

    constructor(position = [0, 0], shape = [], value = Cell.EMPTY, point = []) {
        this.position = position;       // 方塊的進入座標 (左上角)
        this.shape = shape;             // 方塊形狀 (子類別繼承後重新指定)
        this.value = value;             // 方塊對應的值 (子類別繼承後重新指定)
        this.point = point;             // 方塊的位置 (子類別繼承後呼叫calPoint取得位置)
        this.adjustments = [            // 旋轉檢查點
            [0, 0],                     // 原點
            [0, -1], [0, 1],            // 左右移動
            [1, 0], [-1, 0]             // 上下移動
        ];
    }

    rotate(board) {
        // 順時針旋轉this.shape陣列
        let newShape = [];
        for (let j = 0; j < this.shape[0]?.length; j++) {
            let row = [];
            for (let i = this.shape.length - 1; i >= 0; i--) {
                row.push(this.shape[i][j]);
            }
            newShape.push(row);
        }
        // 驗證每個檢查點
        for (let [di, dj] of this.adjustments) {
            let newPos = [this.position[0] + di, this.position[1] + dj];
            if (this.isValidPosition(newShape, newPos, board)) {
                this.shape = newShape;
                this.position = newPos;
                this.refreshPoint();
                return;
                // return true;
            }
        }
        // 全部沒有通過  回傳值目前沒有用途  之後或許可以利用這個寫出T轉驗證
        // return false;
    }

    down(board) {
        let newPos = [this.position[0] + 1, this.position[1]];
        if (this.isValidPosition(this.shape, newPos, board)) {
            this.position = newPos;
            this.refreshPoint();
            return true;
        }
        return false;
    }

    movcRight(board) {
        let newPos = [this.position[0], this.position[1] + 1];
        if (this.isValidPosition(this.shape, newPos, board)) {
            this.position = newPos;
            this.refreshPoint();
            return true;
        }
        return false;
    }

    movcLeft(board) {
        let newPos = [this.position[0], this.position[1] - 1];
        if (this.isValidPosition(this.shape, newPos, board)) {
            this.position = newPos;
            this.refreshPoint();
            return true;
        }
        return false;
    }

    refreshPoint() {
        this.point = this.calPoint();
    }

    calPoint() {
        const [pi, pj] = this.position;
        const res = [];
        for (let i = 0; i < this.shape.length; i++) {
            for (let j = 0; j < this.shape[i].length; j++) {
                if (this.shape[i][j] === 1) res.push([i + pi, j + pj]);
            }
        }
        return res;
    }

    isValidPosition(shape, position, board) {
        const [pi, pj] = position;
        for (let i = 0; i < shape.length; i++) {
            for (let j = 0; j < shape[0].length; j++) {
                if (shape[i][j] === 1) {
                    let newI = pi + i;
                    let newJ = pj + j;
                    // 檢查是否超出邊界
                    if (newI < 0 || newI >= Piece.HIGHT || newJ < 0 || newJ >= Piece.WIDTH) {
                        return false;
                    }
                    // 檢查是否有方塊重疊
                    if (board[newI][newJ] != Cell.EMPTY) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
}

// Orange Ricky，Blue Ricky，Cleveland Z，Rhode Island Z，Hero，Teewee，Smashboy
class OrangeRicky extends Piece {
    constructor(position = [0, 3]) {
        super(
            position,
            [
                [0, 0, 1],
                [1, 1, 1]
            ],
            Cell.ORANGE_RICKY
        );
        this.refreshPoint();
    }
}

class BlueRicky extends Piece {
    constructor(position = [0, 3]) {
        super(
            position,
            [
                [1, 0, 0],
                [1, 1, 1]
            ],
            Cell.BLUE_RICKY
        );
        this.refreshPoint();
    }
}

class ClevelandZ extends Piece {
    constructor(position = [0, 3]) {
        super(
            position,
            [
                [1, 1, 0],
                [0, 1, 1]
            ],
            Cell.CLEVELAND_Z
        );
        this.refreshPoint();
    }
}

class RhodeIslandZ extends Piece {
    constructor(position = [0, 3]) {
        super(
            position,
            [
                [0, 1, 1],
                [1, 1, 0]
            ],
            Cell.RHODE_ISLAND_Z
        );
        this.refreshPoint();
    }
}

class Hero extends Piece {
    constructor(position = [0, 3]) {
        super(position,
            [
                [1, 1, 1, 1]
            ],
            Cell.HERO
        );
        this.checkPoints = [
            [
                [-1, 1],
                [-1, 0], [-1, 2],
                [0, 1], [-2, 1]
            ],
            [
                [1, -1],
                [1, -2], [1, 0], [1, -3],
                [2, -1], [0, -1]
            ]
        ];
        this.refreshPoint();
    }

    rotate(board) {
        // 使用直條專用的旋轉檢查點
        this.adjustments = this.checkPoints[0];
        // 呼叫父層的旋轉
        super.rotate(board);
        // 切換橫向跟直向使用的檢查點
        [this.checkPoints[0], this.checkPoints[1]] = [this.checkPoints[1], this.checkPoints[0]];
    }
}

class Teewee extends Piece {
    constructor(position = [0, 3]) {
        super(
            position,
            [
                [0, 1, 0],
                [1, 1, 1]
            ],
            Cell.TEEWEE
        );
        this.refreshPoint();
    }
}

class Smashboy extends Piece {
    constructor(position = [0, 4]) {
        super(
            position,
            [
                [1, 1],
                [1, 1]
            ],
            Cell.SMASHBOY
        );
        this.refreshPoint();
    }
    // 這個方塊不需要旋轉
    rotate() { }
}

export {
    Piece,
    OrangeRicky,
    BlueRicky,
    ClevelandZ,
    RhodeIslandZ,
    Hero,
    Teewee,
    Smashboy
};
