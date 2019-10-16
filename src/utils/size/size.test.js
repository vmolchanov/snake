import Size from './size';

it('Размеры записываются корректно', () => {
    const size = new Size(40, 34);
    expect(size.width).toBe(40);
    expect(size.height).toBe(34);
});

it('Сеттеры размеров работают корректно с неотрицательными числами', () => {
    const size = new Size();
    size.width = 9;
    size.height = 7;
    expect(size.width).toBe(9);
    expect(size.height).toBe(7);
});

it('Сеттеры размеров не устанавливают не числовые значения', () => {
    const size = new Size();
    size.width = 'hello';
    size.height = 'world';
    expect(size.width).toBe(0);
    expect(size.height).toBe(0);
});

it('Сеттеры размеров не устанавливают отрицательные значения', () => {
    const size = new Size();
    size.width = -1;
    size.height = -485673;
    expect(size.width).toBe(0);
    expect(size.height).toBe(0);
});