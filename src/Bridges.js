import Can from "./Can";
import Circle from "./Circle";
import Text from "./Text";
import Line from "./Line";
import Point from "./Point";

const NODE_WIDTH = 20;
const NODE_FONT_SIZE = 22;
const NODE_FONT_FAMILY = 'ubuntu,noto sans,arial,sans-serif';
const GRID_COLS = 7;
const GRID_ROWS = 7;
const CELL_SIZE = 65;
const GRID_WIDTH = 2;

export default class Bridges {

    constructor(canvasSelector) {
        this.setCanvasBySelector(canvasSelector);
        this._nodes = [];
    }

    setCanvasBySelector(canvasSelector) {
        const canvas = document.querySelector(canvasSelector);
        const notACanvasError = new Error("The provided selector doesn't reference a canvas element.");

        if (!canvas) {
            throw notACanvasError;
        }

        if (canvas.nodeName !== 'CANVAS') {
            throw notACanvasError;
        }

        this._can = new Can(canvas);
    }

    renderNode(node) {
        const circle = new Circle(node.point, NODE_WIDTH, 'black', false);
        this._can.circle(circle);
        const text = new Text(node.point, node.count, NODE_FONT_SIZE, NODE_FONT_FAMILY, true);
        this._can.text(text);
    }

    renderGrid() {
        for (let x = 0; x <= this._can.width; x += CELL_SIZE) {
            const startPoint = new Point(x, 0);
            const endPoint = new Point(x, this._can.height);
            const line = new Line(startPoint, endPoint, '#D3D3D3', GRID_WIDTH);
            this._can.line(line);
        }

        for (let y = 0; y <= this._can.width; y += CELL_SIZE) {
            const startPoint = new Point(0, y);
            const endPoint = new Point(this._can.width, y);
            const line = new Line(startPoint, endPoint, '#D3D3D3', GRID_WIDTH);
            this._can.line(line);
        }
    }

    setProperSize() {
        const width = GRID_COLS * CELL_SIZE;
        const height = GRID_ROWS * CELL_SIZE;
        this._can.width = width;
        this._can.height = height;
    }

    getCellCenter(col, row) {
        const cellHalf = CELL_SIZE / 2;
        const startX = CELL_SIZE * --col;
        const startY = CELL_SIZE * --row;

        return new Point(startX + cellHalf, startY + cellHalf);
    }

    addNode(node) {
        this._nodes.push(node);
    }

    set nodes(value) {
        this._nodes = value;
    }
}