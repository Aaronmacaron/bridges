export default class Node {

    constructor(point, count, radius = 20) {
        this._point = point;
        this._count = count;
        this._radius = radius;
    }

    isClick(clickPoint) {
        const xDif = Math.abs(this._point.x - clickPoint.x);
        const yDif = Math.abs(this._point.y - clickPoint.y);
        const distance = Math.sqrt((xDif ** 2) + (yDif ** 2)); // Pythagoras

        if (distance < this._radius) {
            return true;
        }
    }

    set count(value) {
        this._count = value;
    }

    get point() {
        return this._point;
    }

    get count() {
        return this._count;
    }

    get radius() {
        return this._radius;
    }

    set radius(value) {
        this._radius = value;
    }
}