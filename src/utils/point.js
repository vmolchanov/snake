/**
 * Класс, описывающий точку на площади
 */
class Point {
    /**
     * @param {number} x 
     * @param {number} y 
     * @constructor
     */
    constructor(x = 0, y = 0) {
        this._x = x;
        this._y = y;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    set x(value) {
        if (typeof value === 'number') {
            this._x = value;
        }
    }

    set y(value) {
        if (typeof value === 'number') {
            this._y = value;
        }
    }
}

export default Point;
