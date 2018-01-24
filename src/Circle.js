export default class Circle {


    constructor(point, radius, color, filled) {
        this._point = point;
        this._radius = radius;
        this._color = color;
        this._filled = filled;
    }


    get point() {
        return this._point;
    }

    get radius() {
        return this._radius;
    }

    get color() {
        return this._color;
    }

    get filled() {
        return this._filled;
    }
}