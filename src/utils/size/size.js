class Size {
    constructor(width = 0, height = 0) {
        this._width = width;
        this._height = height;
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    set width(value) {
        if (typeof value === 'number' && value >= 0) {
            this._width = value;
        }
    }

    set height(value) {
        if (typeof value === 'number' && value >= 0) {
            this._height = value;
        }
    }
}

export default Size;