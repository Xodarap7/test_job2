/**
 * @author Басаргин Я.Э
 * Программный модуль хранящий конструкторы классов фигур
 * формат - javaScript
 * 
 * @module Rectangle, RegularTriangle, RightTriangle, Circle, Ellipce
 */

/** 
 * @constructor Rectangle
 * 
 * @param {number} width  Ширина прямоугольника
 * @param {number} height Высота прямоугольника
 * @param {number} x координата центра фигуры
 * @param {number} y координата центра фигуры
 * @param {number} angle угол поворота
 * @param {number} conturColor 
 * @param {number} bgColour 
 * 
 */

const Rectangle = class {
    constructor(width, height, x, y, angle, conturColor, bgColour) {
        this.typeFigure = "10";
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.conturColour = conturColor;
        this.bgColour = bgColour
    }
}
const RegularTriangle = class {
    constructor(a, x, y, angle, conturColor, bgColour) {
        this.typeFigure = "20";
        this.a = a;
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.conturColour = conturColor;
        this.bgColour = bgColour
    }
}
const RightTriangle = class {
    constructor(a, b, x, y, angle, conturColor, bgColour) {
        this.typeFigure = "21";
        this.a = a;
        this.b = b;
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.conturColour = conturColor;
        this.bgColour = bgColour
    }
}
const Circle = class {
    constructor(a, x, y, conturColor, bgColour) {
        this.typeFigure = "30";
        this.a = a;
        this.x = x;
        this.y = y;
        this.conturColour = conturColor;
        this.bgColour = bgColour
    }
}
const Ellipce = class {
    constructor(a, b, x, y, angle, conturColor, bgColour) {
        this.typeFigure = "31";
        this.a = a;
        this.b = b;
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.conturColour = conturColor;
        this.bgColour = bgColour
    }
}
module.exports = { Rectangle, RegularTriangle, RightTriangle, Circle, Ellipce }