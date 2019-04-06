import './style.css';
import React, {Component} from 'react';
import FieldRow from '../FieldRow';
import EDirection from '../../enums/direction';
import EKey from '../../enums/key';
import Point from '../../utils/point';

class Game extends Component {
    constructor(props) {
        super(props);

        this.size = 10;
        this.direction = EDirection.RIGHT;
        this.foodCell = -1;
        this.emptyCell = 0;

        this.state = {
            field: this.createField()
        };

        this.start();

        this.onKeyUp = this.onKeyUp.bind(this);
    }

    componentWillMount() {
        document.addEventListener('keyup', this.onKeyUp);
    }

    componentWillUnmount() {
        document.removeEventListener('keyup', this.onKeyUp);
    }

    render() {
        return (
            <div className="Game">
                <svg
                    className='Game__svg'
                    width='400'
                    height='400'
                    viewBox='0 0 155 155'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    {
                        this.state.field.map((row, index) => {
                            return ( 
                                <FieldRow 
                                    row={row}
                                    rowIndex={index}
                                    key={index}
                                />
                            );
                        })
                    }
                </svg>
            </div>
        );
    }

    /**
     * Обработчик события нажатия на кнопку.
     * @param {Object} e 
     */
    onKeyUp(e) {
        switch (e.which) {
            case EKey.ARROW_UP:
                if (this.direction != EDirection.BOTTOM) {
                    this.direction = EDirection.TOP;
                }
                break;
            case EKey.ARROW_RIGHT:
                if (this.direction != EDirection.LEFT) {
                    this.direction = EDirection.RIGHT;
                }
                break;
            case EKey.ARROW_DOWN:
                if (this.direction != EDirection.TOP) {
                    this.direction = EDirection.BOTTOM;
                }
                break;
            case EKey.ARROW_LEFT:
                if (this.direction != EDirection.RIGHT) {
                    this.direction = EDirection.LEFT;
                }
                break;
        }
    }

    /**
     * Создание поля.
     * @return {number[][]}
     */
    createField() {
        const field = new Array(this.size);
        for (let i = 0; i < field.length; i++) {
            field[i] = new Array(this.size);
        }
        for (let i = 0; i < field.length; i++) {
            for (let j = 0; j < field[i].length; j++) {
                field[i][j] = 0;
            }
        }
        field[3][2] = 1;

        const foodPoint = this.getFoodPoint(field);
        field[foodPoint.y][foodPoint.x] = this.foodCell;

        return field;
    }

    /**
     * Начало игры.
     */
    start() {
        const interval = setInterval(() => {
            const newField = this.move();

            if (!newField) {
                clearInterval(interval);
                alert('Вы програли!');
                return;
            }

            this.setState({
                field: newField
            });
        }, 500);
    }

    /**
     * Делает один ход змейки.
     * @return {?number[][]} - игровое поле после хода
     */
    move() {
        let field = this.state.field.slice();
        let currentPartPoint = this.getPointByPart(field, 1);
        let nextPoint = this.getPointByDirection(currentPartPoint);
        let currentPart = 1;

        // Выход за пределы поля
        if (
            nextPoint.x < 0 ||
            nextPoint.x >= this.size ||
            nextPoint.y < 0 ||
            nextPoint.y >= this.size
        ) {
            return null;
        }

        // Врезание в змейку
        if (field[nextPoint.y][nextPoint.x] > this.emptyCell) {
            return null;
        }

        // Еда
        if (field[nextPoint.y][nextPoint.x] === this.foodCell) {
            field = field.map((row) =>
                row.map((cell) => 
                    cell > 0 ? ++cell : cell
                )
            );
            field[nextPoint.y][nextPoint.x] = 1;
            
            const foodPoint = this.getFoodPoint(field);
            field[foodPoint.y][foodPoint.x] = this.foodCell;

            return field;
        }

        while (currentPartPoint !== null) {
            field[nextPoint.y][nextPoint.x] = currentPart;
            field[currentPartPoint.y][currentPartPoint.x] = this.emptyCell;
            nextPoint = currentPartPoint;
            currentPartPoint = this.getPointByPart(field, ++currentPart, nextPoint);
        }

        return field;
    }

    /**
     * Возвращает координату следующей точки исходя из направления движения.
     * @param {Point} point - Координата, относительно которой ведется поиск
     * @return {Point}
     */
    getPointByDirection(point) {
        switch (this.direction) {
            case EDirection.TOP:
                return new Point(point.x, point.y - 1);
            case EDirection.RIGHT:
                return new Point(point.x + 1, point.y);
            case EDirection.BOTTOM:
                return new Point(point.x, point.y + 1);
            case EDirection.LEFT:
                return new Point(point.x - 1, point.y);
        }
    }

    /**
     * Возвращает координату точки, значение которой равно part. Если from не передано, то поиск
     * идет по всему массиву, иначе в точках вокруг from.
     * @param {number[][]} field - Игровое поле
     * @param {number} part - Значение ячейки, поиск которого осуществляется на игровом поле
     * @param {?Point} from - Координата, относительно которой ведется поиск
     * @return {Point}
     */
    getPointByPart(field, part, from = null) {
        if (from !== null) {
            // сверху
            if (from.y - 1 >= 0 && field[from.y - 1][from.x] === part) {
                return new Point(from.x, from.y - 1);
            }
            // справа
            if (from.x + 1 < this.size && field[from.y][from.x + 1] === part) {
                return new Point(from.x + 1, from.y);
            }
            // снизу
            if (from.y + 1 < this.size && field[from.y + 1][from.x] === part) {
                return new Point(from.x, from.y + 1);
            }
            // слева
            if (from.x - 1 >= 0 && field[from.y][from.x - 1] === part) {
                return new Point(from.x - 1, from.y);
            }

            return null;
        }

        for (let i = 0; i < field.length; i++) {
            const j = field[i].indexOf(part);
            if (j !== -1) {
                return new Point(j, i);
            }
        }

        return null;
    }

    /**
     * Возвращает случайную координату точки с едой.
     * @param {number[][]} field - Игровое поле
     * @return {Point}
     */
    getFoodPoint(field) {
        const points = [];

        field.forEach((row, i) => {
            row.forEach((cell, j) => {
                if (cell === 0) {
                    points.push(new Point(j, i));
                }
            });
        });

        return points[Math.floor(Math.random() * (points.length - 1))];
    }
}

export default Game;