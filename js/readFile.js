/** 
 * @author  Басаргин Я.Э
 * Программный модуль, получающий объекты фигур из текстового файла
 * формат - javaScript
 *
 * @param fs подключаем использование файлловой системы
 * @param  figureClass подключаем файл с объявлением классов
 * @see <js/figureClasses.js
 */

const fs = require("fs");
const figureClass = require("./figureClasses");

module.exports = {
    /**
     *  Функция создающая объекты фигур
     *
     * @param {string} fileContent считанный файл пользователя и преобразованный в строку
     * @param {object} arrayOfParagraph массив сторок (каждый элемент массива содержит параметры фигуры)
     * @param {object} arrayOfParam массив параметров (каждый элемент массива является параметром фигуры)
     * @return allFigureObject Массив с объектами фигур
     */

    getObjects: function(figureFileName) {
        let fileContent = fs.readFileSync(`./uploads/${figureFileName}`).toString();
        const arrayOfParagraph = fileContent.split("\r\n");
        let allFigureObjects = [];
        /**
         * Цикл для заполнения массива с объктами фигур 
         * Перебирает файл пользователя разбивает его на отдельные фигуры,
         * записывает значение для каждого параметра каждой фигуры в объектыв соответствии с типом фигур 
         * @see switch (тип фигуры) 
         */
        for (let elem of arrayOfParagraph) {
            const arrayOfParam = elem.split(" ");
            switch (arrayOfParam[3]) {
                case "10":
                    {
                        let rectangle = new figureClass.Rectangle(
                            arrayOfParam[4],
                            arrayOfParam[5],
                            arrayOfParam[0],
                            arrayOfParam[1],
                            arrayOfParam[2],
                            `rgb(${arrayOfParam[7]},${arrayOfParam[8]},${arrayOfParam[9]})`,
                            `rgb(${arrayOfParam[10]},${arrayOfParam[11]},${arrayOfParam[12]})`
                        );
                        allFigureObjects.push(rectangle);
                        break;
                    }
                case "20":
                    {
                        let regularTriangle = new figureClass.RegularTriangle(
                            arrayOfParam[4],
                            arrayOfParam[0],
                            arrayOfParam[1],
                            arrayOfParam[2],
                            `rgb(${arrayOfParam[7]},${arrayOfParam[8]},${arrayOfParam[9]})`,
                            `rgb(${arrayOfParam[10]},${arrayOfParam[11]},${arrayOfParam[12]})`
                        );
                        allFigureObjects.push(regularTriangle);
                        break;
                    }
                case "21":
                    {
                        let rightTriangle = new figureClass.RightTriangle(
                            arrayOfParam[4],
                            arrayOfParam[5],
                            arrayOfParam[0],
                            arrayOfParam[1],
                            arrayOfParam[2],
                            `rgb(${arrayOfParam[7]},${arrayOfParam[8]},${arrayOfParam[9]})`,
                            `rgb(${arrayOfParam[10]},${arrayOfParam[11]},${arrayOfParam[12]})`
                        );
                        allFigureObjects.push(rightTriangle);
                        break;
                    }
                case "30":
                    {
                        let circle = new figureClass.Circle(
                            arrayOfParam[4],
                            arrayOfParam[0],
                            arrayOfParam[1],
                            `rgb(${arrayOfParam[7]},${arrayOfParam[8]},${arrayOfParam[9]})`,
                            `rgb(${arrayOfParam[10]},${arrayOfParam[11]},${arrayOfParam[12]})`
                        );
                        allFigureObjects.push(circle);
                        break;
                    }
                case "31":
                    {
                        let ellipse = new figureClass.Ellipce(
                            arrayOfParam[4],
                            arrayOfParam[5],
                            arrayOfParam[0],
                            arrayOfParam[1],
                            arrayOfParam[2],
                            `rgb(${arrayOfParam[7]},${arrayOfParam[8]},${arrayOfParam[9]})`,
                            `rgb(${arrayOfParam[10]},${arrayOfParam[11]},${arrayOfParam[12]})`
                        );
                        allFigureObjects.push(ellipse);
                        break;
                    }
            }
        }
        return allFigureObjects;
    },
};