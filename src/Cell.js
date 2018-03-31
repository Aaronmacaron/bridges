export default class Cell {

    constructor(col, row) {
        this._col = col;
        this._row = row;
    }

    get col() {
        return this._col;
    }

    set col(value) {
        this._col = value;
    }

    get row() {
        return this._row;
    }

    set row(value) {
        this._row = value;
    }
}