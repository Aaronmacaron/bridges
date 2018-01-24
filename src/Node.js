export default class Node {

    constructor(point, count) {
        this._point = point;
        this._count = count;
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
}