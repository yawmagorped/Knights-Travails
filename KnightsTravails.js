import Queue from 'yocto-queue';

const Node = (x, y, prev = null) => {
    const _x = x;
    const _y = y;

    let _isVisited = false;
    let adjacentList = new Queue();
    let _prevNode = prev;

    return {
        get x() {
            return _x;
        },
        get y() {
            return _y;
        },
        get prevNode() {
            return _prevNode;
        },
        set prevNode(value) {
            _prevNode = value;
        },
        get isVisited() {
            return _isVisited;
        },
        set isVisited(value) {
            _isVisited = value;
        }
        , adjacentList};
}

const Graph = (startX, startY) => { 
    const BOARD_SIZE = 8;

    let board = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
        board[i] = [];
        for (let j = 0; j < BOARD_SIZE; j++) {
            board[i].push(Node(i, j))
        }
    }
    let head = board[startX][startY];

    const isInBound = (x, y) => {
        if (x < BOARD_SIZE && x >= 0 && y < BOARD_SIZE && y >= 0)
            return true;
        else
            return false;
    }

    const forEachAdjacent = (x, y, callback) => {
        if (isInBound(x+1, y+2))
            callback(x+1, y+2);
        if (isInBound(x+2, y+1))
            callback(x+2, y+1);
        if (isInBound(x+2, y-1))
            callback(x+2, y-1);
        if (isInBound(x+1, y-2))
            callback(x+1, y-2);
        if (isInBound(x-1, y-2))
            callback(x-1, y-2);
        if (isInBound(x-2, y-1))
            callback(x-2, y-1);
        if (isInBound(x-2, y+1))
            callback(x-2, y+1);
        if (isInBound(x-1, y+2))
            callback(x-1, y+2);
    }

    const buildAdjacentList = (x, y) => {
        if (!board[x][y]) {
            throw new Error("calling buildAdjacentList on a non existing board house");
        }

        forEachAdjacent(x,y, (inputX, inputY) => {
            if(!board[inputX][inputY].isVisited) {
                board[inputX][inputY].prevNode = board[x][y];
                board[x][y].adjacentList.enqueue(board[inputX][inputY]);
            }
        });

        return board[x][y].adjacentList;
    }

    const tracePath = (node) => {
        let path = [];
        while(node !== null) {
            console.log("x: " + node.x + " y: " + node.y);
            path.push(node);
            node = node.prevNode;
        }
        return path;
    }

    const find = (endX, endY) => {
        let queue = new Queue();
        head.isVisited = true;
        queue.enqueue(head);
        while (queue.size > 0) {
            let node = queue.dequeue();
            
            let newQueue = buildAdjacentList(node.x, node.y);
            let count = 0;
            for (const newNode of newQueue) {
                if (!newNode.isVisited) {
                    newNode.isVisited = true;
                    queue.enqueue(newNode);
                }
            }
            
            if (node.x == endX && node.y == endY) {
                console.log("found it!!");
                return tracePath(node);
            }
        }
    }

    const printBoardArray = () => {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j]) {
                    console.log(`board[${i}][${j}] = ${board[i][j].x}, ${board[i][j].y}`);
                    if (board[i][j].prevNode !== null) {
                        console.log("previous node: [" + board[i][j].prevNode.x + ", " + board[i][j].prevNode.y + "]");
                    } else console.log("previous node: " + board[i][j].prevNode);
                } else {
                    console.log("empty");
                }
                console.log("----------------");
            }
            console.log();
            console.log("next row: ");
        }
    }

    return {buildAdjacentList, printBoardArray, find};
}

function knightMoves(start, end) {
    let graph = Graph(...start);
    graph.find(...end);
    // graph.printBoardArray();
}

knightMoves([0,1], [7, 6]);