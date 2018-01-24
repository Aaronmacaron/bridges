export default class Rect {

    constructor(point, width, height, color, filled) {
        this._point = point;
        this._width = width;
        this._height = height;
        this._color = color;
        this._filled = filled;
    }

    get point() {
        return this._point;
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    get color() {
        return this._color;
    }

    get filled() {
        return this._filled;
    }
}