import Can from "./Can";
import Circle from "./Circle";
import Text from "./Text";
import Line from "./Line";
import Point from "./Point";
import Node from "./Node";

const NODE_FONT_SIZE = 22;
const NODE_FONT_FAMILY = 'ubuntu,noto sans,arial,sans-serif';
const NODE_FILL_COLOR = 'white';
const NODE_BORDER_COLOR = 'black';
const GRID_COLS = 7;
const GRID_ROWS = 7;
const CELL_SIZE = 65;
const GRID_WIDTH = 2;
const CONNECTION_WIDTH = 2;
const CONNECTION_COLOR = 'blue';
const CONNECTION_MARGIN = 10;

export default class Bridges {

    constructor(canvasSelector) {
        this.setCanvasBySelector(canvasSelector);
        this.registerNodeDrag();
        this._nodes = [];
        this._connections = [];
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

    render() {
        this.renderGrid();
        this.renderConnections();
        this.renderNodes();
    }

    renderNode(node) {
        const circleBorder = new Circle(node.point, node._radius, NODE_FILL_COLOR, true);
        const circle = new Circle(node.point, node._radius, NODE_BORDER_COLOR, false);
        this._can.circle(circle);
        this._can.circle(circleBorder);
        const text = new Text(node.point, node.count, NODE_FONT_SIZE, NODE_FONT_FAMILY, true);
        this._can.text(text);
        this._can.text(text);
    }

    renderNodes() {
        this._nodes.forEach(node => {
            this.renderNode(node);
        });
    }

    renderConnections() {
        this._connections.forEach(c => this.renderConnection(c));
    }

    renderConnection(connection) {
        if (connection.double) {
            this.renderDoubleConnection(connection);
            return;
        }
        const line = new Line(connection.startNode.point, connection.endNode.point, CONNECTION_COLOR, CONNECTION_WIDTH);
        this._can.line(line);
    }

    renderDoubleConnection(connection) {
        // Cloning needed so the nodes aren't affected
        const startPoint = new Point(connection.startNode.point.x, connection.startNode.point.y);
        const endPoint = new Point(connection.endNode.point.x, connection.endNode.point.y);

        startPoint.x += (CONNECTION_MARGIN / 2);
        startPoint.y += (CONNECTION_MARGIN / 2);
        endPoint.x += (CONNECTION_MARGIN / 2);
        endPoint.y += (CONNECTION_MARGIN / 2);
        const firstLine = new Line(startPoint, endPoint, CONNECTION_COLOR, CONNECTION_WIDTH);
        this._can.line(firstLine);


        startPoint.x -= CONNECTION_MARGIN;
        startPoint.y -= CONNECTION_MARGIN;
        endPoint.x -= CONNECTION_MARGIN;
        endPoint.y -= CONNECTION_MARGIN;
        const secondLine = new Line(startPoint, endPoint, CONNECTION_COLOR, CONNECTION_WIDTH);
        this._can.line(secondLine);
    }

    getNodeFromCell(cell) {
        return new Node(this.getCellCenter(cell ), 0);
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

    getCellCenter(cell) {
        const cellHalf = CELL_SIZE / 2;
        const startX = CELL_SIZE * --cell.col;
        const startY = CELL_SIZE * --cell.row;

        return new Point(startX + cellHalf, startY + cellHalf);
    }

    registerNodeDrag() {
        let clickedNode = null;
        this._can._canvas.addEventListener('mousedown', event => {
            const absolutePoint = new Point(event.clientX, event.clientY);
            const clickPoint = this._can.convertAbsoluteClickPositionToRelative(absolutePoint);
            this._nodes.forEach(node => {
                if (node.isClick(clickPoint)) {
                    clickedNode = node;
                    this._can._canvas.addEventListener('mousemove', mouseMove);
                    this._can._canvas.addEventListener('mouseup', mouseUp);
                }
            });
        });

        const mouseMove = event => {
            this.rerender();
            const absolutePoint = new Point(event.clientX, event.clientY);
            const movePoint = this._can.convertAbsoluteClickPositionToRelative(absolutePoint);
            const line = new Line(clickedNode.point, movePoint, CONNECTION_COLOR, CONNECTION_WIDTH);
            this._can.line(line);
        };

        const mouseUp = () => {
            this.rerender();
            this._can._canvas.removeEventListener('mousemove', mouseMove);
            this._can._canvas.removeEventListener('mouseup', mouseUp);
        }
    }

    rerender() {
        this._can.clear();
        this.render();
    }

    addNode(node) {
        this._nodes.push(node);
    }

    set nodes(value) {
        this._nodes = value;
    }

    set connections(value) {
        this._connections = value;
    }
}