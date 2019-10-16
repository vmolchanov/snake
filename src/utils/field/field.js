import {random} from '../random';
import Point from '../point';
import EDirection from '../../enums/direction';

class Field {
    constructor(size, field = null) {
        this.SNAKE_START = 1;
        this.FOOD_CELL = -1;
        this.EMPTY_CELL = 0;
        this.size = size;
        this._field = (field === null) ?
            this.createEmpty() :    
            field.slice();
            
    }

    get field() {
        return this._field;
    }

    static getPointByDirection(point, direction) {
        switch (direction) {
            case EDirection.TOP:
                return new Point(point.x, point.y - 1);
            case EDirection.RIGHT:
                return new Point(point.x + 1, point.y);
            case EDirection.BOTTOM:
                return new Point(point.x, point.y + 1);
            case EDirection.LEFT:
                return new Point(point.x - 1, point.y);
            default:
                return new Point();
        }
    }

    clone() {
        return new Field(this.size, this._field);
    }

    move(direction) {
        const snakeStartPoint = this.getPointByPart(this.SNAKE_START);
        let nextPoint = Field.getPointByDirection(snakeStartPoint, direction);
        const {x: nextX, y: nextY} = nextPoint;

        const isInField = nextX >= 0 && nextX < this.size && nextY >= 0 && nextY < this.size;
        if (!isInField) {
            throw new Error('Выход за пределы поля');
        }

        if (this._field[nextY][nextX] > this.EMPTY_CELL) {
            throw new Error('Врезание в змейку');
        }

        if (this._field[nextY][nextX] === this.FOOD_CELL) {
            this._field = this._field.map((row) =>
                row.map((cell) => 
                    cell > 0 ? ++cell : cell
                )
            );
            this._field[nextY][nextX] = 1;

            const {x, y} = this.getFoodPoint();
            this._field[y][x] = this.FOOD_CELL;

            return this;
        }

        let currentPoint = snakeStartPoint;
        let currentPart = 1;

        while (currentPoint !== null) {
            this._field[nextPoint.y][nextPoint.x] = currentPart;
            this._field[currentPoint.y][currentPoint.x] = this.EMPTY_CELL;
            nextPoint = currentPoint;
            currentPoint = this.getPointByPart(++currentPart, nextPoint);
        }

        return this;
    }

    getFoodPoint() {
        const points = [];

        this._field.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell === this.EMPTY_CELL) {
                    points.push(new Point(x, y));
                }
            });
        });

        return points[random(0, points.length)];
    }

    create() {
        this._field = this.createEmpty();
        this._field[random(0, this.size)][random(0, this.size)] = 1;
        const foodPoint = this.getFoodPoint(this._field);
        this._field[foodPoint.y][foodPoint.x] = this.FOOD_CELL;
        return this;
    }

    createEmpty() {
        const field = [...new Array(this.size)]
            .map(() => [...new Array(this.size)]
                .map(() => 0));
        return field;
    }

    getPointByPart(part, from = null) {
        if (from !== null) {
            const coords = [
                new Point(from.x, from.y - 1),
                new Point(from.x + 1, from.y),
                new Point(from.x, from.y + 1),
                new Point(from.x - 1, from.y)
            ];
    
            for (let i = 0; i < coords.length; i++) {
                const {x, y} = coords[i];
                const isInField = (x >= 0 && x < this.size && y >= 0 && y < this.size);
                if (isInField && this._field[y][x] === part) {
                    return coords[i];
                }
            }
    
            return null;
        }
    
        for (let i = 0; i < this._field.length; i++) {
            const j = this._field[i].indexOf(part);
            if (j !== -1) {
                return new Point(j, i);
            }
        }
    
        return null;
    }
}

export default Field;