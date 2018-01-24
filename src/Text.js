export default class Text {

    constructor(point, text, size, font, center) {
        this._point = point;
        this._text = text;
        this._size = size;
        this._font = font;
        this._center = center;
    }

    get point() {
        return this._point;
    }

    get text() {
        return this._text;
    }

    get size() {
        return this._size;
    }

    get font() {
        return this._font;
    }

    get center() {
        return this._center;
    }
}