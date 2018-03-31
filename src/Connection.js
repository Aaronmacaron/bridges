export default class Connection {

    constructor(startNode, endNode, double = false) {
        this._startNode = startNode;
        this._endNode = endNode;
        this._double = double;
    }

    get startNode() {
        return this._startNode;
    }

    get endNode() {
        return this._endNode;
    }

    get double() {
        return this._double;
    }
}