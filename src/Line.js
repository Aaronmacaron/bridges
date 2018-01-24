export default class Line {

    constructor(startPoint, endPoint, color, thickness) {
        this._startPoint = startPoint;
        this._endPoint = endPoint;
        this._color = color;
        this._thickness = thickness;
    }

    get startPoint() {
        return this._startPoint;
    }

    get endPoint() {
        return this._endPoint;
    }

    get color() {
        return this._color;
    }

    get thickness() {
        return this._thickness;
    }
}