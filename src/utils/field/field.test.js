import Field from './field';
import Point from '../point/point';
import EDirection from '../../enums/direction';

describe('Создание поля', () => {
    const size = 5;

    it('Поле создается размера 5х5', () => {
        const {field} = new Field(size);
        expect(field.length).toEqual(size);
        field.forEach((row) => expect(row.length).toEqual(size));
    });

    it('Все ячейки пустого поля равны 0', () => {
        const fieldInstance = new Field(size);
        const {field} = fieldInstance;
        field.forEach((row) => {
            row.forEach((cell) => {
                expect(cell).toEqual(fieldInstance.EMPTY_CELL);
            });
        });
    });

    it('Игровое поле имеет только одну ячейку с едой', () => {
        const fieldInstance = new Field(size).create();
        const {field} = fieldInstance;
        let count = 0;
        field.forEach((row) => {
            row.forEach((cell) => {
                if (cell === fieldInstance.FOOD_CELL) {
                    count++;
                }
            });
        });
        expect(count).toEqual(1);
    });

    it('Игровое поле из существующего поля', () => {
        const field = [
            [0, 0, 0, 0, 0],
            [0, 4, 0, 0, 0],
            [0, 3, 2, 1, 0],
            [-1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ];
        const fieldInstance = new Field(field.length, field);
        fieldInstance.field.forEach((row, i) => {
            expect(row.every((cell, j) => cell === field[i][j])).toBeTruthy();
        });
    });

    it('Клонирование экземпляра класса Field', () => {
        const fieldInstance = new Field(size);
        const clonedFieldInstance = fieldInstance.clone();
        
        expect(clonedFieldInstance instanceof Field).toBeTruthy();
        expect(clonedFieldInstance === fieldInstance).toBeFalsy();

        const {field} = fieldInstance;
        const {field: clonedField} = clonedFieldInstance;

        clonedField.forEach((row, i) => {
            expect(row.every((cell, j) => cell === field[i][j])).toBeTruthy();
        });
    });
});

describe('Получение точки по направлению', () => {
    const point = new Point(3, 4);

    it('Змейка движется вверх', () => {
        const p = Field.getPointByDirection(point, EDirection.TOP);
        expect(p.x).toEqual(3);
        expect(p.y).toEqual(3);
    });

    it('Змейка движется вниз', () => {
        const p = Field.getPointByDirection(point, EDirection.BOTTOM);
        expect(p.x).toEqual(3);
        expect(p.y).toEqual(5);
    });

    it('Змейка движется влево', () => {
        const p = Field.getPointByDirection(point, EDirection.LEFT);
        expect(p.x).toEqual(2);
        expect(p.y).toEqual(4);
    });

    it('Змейка движется вправо', () => {
        const p = Field.getPointByDirection(point, EDirection.RIGHT);
        expect(p.x).toEqual(4);
        expect(p.y).toEqual(4);
    });

    it('Некорректное значение направления', () => {
        const p = Field.getPointByDirection(point, 1003204895);
        expect(p.x).toEqual(0);
        expect(p.y).toEqual(0);
    });
});

describe('Перемещение змейки', () => {
    it('Змейка корректно перемещается', () => {
        const initialField = [
            [0, 0, 0, 0, 0],
            [0, 4, 0, 0, 0],
            [0, 3, 2, 1, 0],
            [-1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ];
        const resultField = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 4, 3, 2, 0],
            [-1, 0, 0, 1, 0],
            [0, 0, 0, 0, 0]
        ];
        
        const {field} = new Field(initialField.length, initialField).move(EDirection.BOTTOM);

        field.forEach((row, i) => {
            expect(row.every((cell, j) => cell === resultField[i][j])).toBeTruthy();
        });
    });

    it('При врезании в стену вызывается исключение', () => {
        const initialField = [
            [0, 0, 0, 0, 0],
            [0, 5, 0, 0, 0],
            [0, 4, 3, 2, 1],
            [-1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ];
        const field = new Field(initialField.length, initialField);
        expect(() => field.move(EDirection.RIGHT)).toThrow(Error);
    });

    it('При врезании в змейку вызывается исключение', () => {
        const initialField = [
            [0, 0, 0, 0, 0],
            [0, 5, 0, 0, 0],
            [0, 4, 1, 0, 0],
            [-1, 3, 2, 0, 0],
            [0, 0, 0, 0, 0]
        ];
        const field = new Field(initialField.length, initialField);
        expect(() => field.move(EDirection.LEFT)).toThrow(Error);
    });

    it('Граничная ситуация без врезания в змейку', () => {
        const initialField = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 4, 1, 0, 0],
            [-1, 3, 2, 0, 0],
            [0, 0, 0, 0, 0]
        ];
        const resultField = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 1, 2, 0, 0],
            [-1, 4, 3, 0, 0],
            [0, 0, 0, 0, 0]
        ];

        const {field} = new Field(initialField.length, initialField).move(EDirection.LEFT);
        
        field.forEach((row, i) => {
            expect(row.every((cell, j) => cell === resultField[i][j])).toBeTruthy();
        });
    });
});