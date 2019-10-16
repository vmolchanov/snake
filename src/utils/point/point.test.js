import Point from './point';

it('Координаты записываются корректно', () => {
    const point = new Point(4, 3);
    expect(point.x).toBe(4);
    expect(point.y).toBe(3);
});

it('Сеттеры координат работают корректно с числами', () => {
    const point = new Point();
    point.x = 9;
    point.y = 7;
    expect(point.x).toBe(9);
    expect(point.y).toBe(7);
});

it('Сеттеры координат не устанавливают не числовые значения', () => {
    const point = new Point();
    point.x = 'world';
    point.y = 'hello';
    expect(point.x).toBe(0);
    expect(point.y).toBe(0);
});