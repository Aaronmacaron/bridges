import Rect from "./Rect";
import Circle from "./Circle";
import Point from "./Point";

export default class Can {

    constructor(canvas) {
        if (canvas instanceof HTMLCanvasElement) {
            this._canvas = canvas;
            this._ctx = canvas.getContext('2d');
        }
    }

    rect(rect) {
        if (!(rect instanceof Rect)) {
            throw new Error("Rect must be of type Rect.");
        }

        this._ctx.rect(rect.point.x, rect.point.y, rect.width, rect.height);

        if (rect.filled) {
            this._ctx.fillStyle = rect.color;
            this._ctx.fill()
        } else {
            this._ctx.strokeStyle = rect.color;
            this._ctx.stroke()
        }

        this._ctx.closePath();
    }

    circle(circle) {
        if (!(circle instanceof Circle)) {
            throw new Error("Circle must be of type Circle.");
        }

        this._ctx.beginPath();

        this._ctx.arc(circle.point.x, circle.point.y, circle.radius, 0, 2 * Math.PI);

        if (circle.filled) {
            this._ctx.fillStyle = circle.color;
            this._ctx.fill();
        } else {
            this._ctx.strokeStyle = circle.color;
            this._ctx.stroke();
        }

        this._ctx.closePath();
    }

    text(text) {
        if (text.center) {
            this._ctx.textBaseline = 'middle';
            this._ctx.textAlign = 'center';
        } else {
            this._ctx.textBaseline = 'alphabetic';
            this._ctx.textAlign = 'start';
        }

        this._ctx.font = text.size + 'px ' + text.font;

        this._ctx.fillText(text.text, text.point.x, text.point.y)
    }

    line(line) {
        this._ctx.lineWidth = line.thickness;
        this._ctx.strokeStyle = line.color;
        this._ctx.beginPath();
        this._ctx.moveTo(line.startPoint.x, line.startPoint.y);
        this._ctx.lineTo(line.endPoint.x, line.endPoint.y);
        this._ctx.stroke();
        this._ctx.closePath();
    }

    convertAbsoluteClickPositionToRelative(point) {
        const rect = this._canvas.getBoundingClientRect();
        const x = point.x - rect.left;
        const y = point.y - rect.top;
        return new Point(x, y);
    }

    clear() {
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }

    get width() {
        return this._canvas.width;
    }

    get height() {
        return this._canvas.height;
    }

    set width(width) {
        return this._canvas.width = width;
    }

    set height(height) {
        return this._canvas.height = height;
    }
}