const buttonFiles = document.querySelectorAll(".button-file");
const hiddenStr = document.querySelector(".hidden-str");
const formSendFileName = document.querySelector(".form-send-file-name");
const paintContainer = document.querySelector(".paint-container");
const bg = document.querySelector(".bg");
const closeButton = document.querySelector(".close-button");

let selectedFile = "";


buttonFiles.forEach(buttonFile => {
    buttonFile.addEventListener("click", () => {
        selectedFile = buttonFile.id;
        // hiddenStr.value = selectedFile;
        buttonFile.style.border = "green 2px solid";
        buttonFile.style.borderRadius = "10px";
        paintContainer.style.display = "block";
        bg.style.display = "block";
        closeButton.style.display = "block";
        // formSendFileName.submit(hiddenStr);
        console.log(selectedFile);
        const str = selectedFile.slice(1, -1)
        console.log(str);
        const typing = typeof(str);
        console.log(typing);
        fetch('http://localhost:3000/fileName', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({

                    title: str

                })
            })
            .then(res => res.json())
            .then(allFigureObjects => {
                const canvas = document.getElementById("canvas");
                const theDiv = document.querySelector(".paint-container");
                canvas.width = theDiv.clientWidth;
                canvas.height = theDiv.clientHeight;

                const ctx = canvas.getContext("2d");


                ctx.translate(canvas.width / 2, canvas.height / 2);
                // scaleX = 1;
                // scaleY = 1;
                let maxY = 0;
                let maxX = 0;

                for (let figureObject of allFigureObjects) {
                    if (Math.abs(+figureObject.x) > maxX) {
                        maxX = Math.abs(+figureObject.x);
                    }
                    if (Math.abs(+figureObject.y) > maxY) {
                        maxY = Math.abs(+figureObject.y);
                    }

                }
                console.log(maxX);
                console.log(maxY);

                if (maxY > canvas.height / 2 && +maxY >= +maxX) {
                    // if (+maxY >= +maxX) {

                    ctx.scale(canvas.height / +maxY / 2.5, canvas.height / +maxY / 2.5);
                }
                if (maxX > canvas.width / 2 && +maxX > +maxY) {
                    // if (+maxX > +maxY) {

                    ctx.scale(canvas.width / +maxX / 2.5, canvas.width / +maxX / 2.5);
                    // ctx.scale(0.5, 0.5);
                }
                for (let figureObject of allFigureObjects) {

                    switch (figureObject.typeFigure) {
                        case "10":
                            paintRectangle(figureObject);
                            break;
                        case "20":
                            paintRegularTriangle(figureObject);
                            break;
                        case "21":
                            paintRightTriangle(figureObject);
                            break;
                        case "30":
                            paintCircle(figureObject);
                            break;
                        case "31":
                            paintEllipse(figureObject);
                            break;
                    }
                }

                function paintRectangle(figureObject) {

                    const { x, y, angle, width, height, conturColour, bgColour } =
                    figureObject;

                    const canvas = document.getElementById("canvas");
                    const ctx = canvas.getContext("2d");
                    ctx.save();
                    ctx.fillStyle = bgColour;
                    ctx.strokeStyle = conturColour;

                    // Figure's center
                    let cx = +x + 0.5 * +width;
                    let cy = +y + 0.5 * +height;

                    ctx.translate(cx, cy);
                    ctx.rotate((Math.PI / 180) * +angle);
                    ctx.translate(-cx, -cy);
                    // ctx.transform(scaleX, 0, 0, scaleY, 0, 0);
                    ctx.rect(+x, +y, +width, +height);

                    ctx.fill();
                    ctx.stroke();
                    ctx.restore();
                }

                function paintRegularTriangle(figureObject) {
                    const { x, y, angle, a, conturColour, bgColour } =
                    figureObject;
                    ctx.save();
                    ctx.fillStyle = bgColour;
                    ctx.strokeStyle = conturColour;
                    let height = (+a * (Math.sqrt(3) / 2));

                    // Figure's center
                    let cx = +x;
                    let cy = +y + 0.5 * +height;

                    ctx.translate(cx, cy);
                    ctx.rotate((Math.PI / 180) * +angle);
                    ctx.translate(-cx, -cy);

                    ctx.moveTo(+x, +y);
                    ctx.lineTo(+x + +a / 2, +y + +height);
                    ctx.lineTo(+x - +a / 2, +y + +height);
                    ctx.lineTo(+x, +y);


                    ctx.fill();
                    ctx.stroke();
                    ctx.restore();


                }

                function paintRightTriangle(figureObject) {
                    const { x, y, angle, a, b, conturColour, bgColour } =
                    figureObject;

                    const canvas = document.getElementById("canvas");
                    const ctx = canvas.getContext("2d");
                    ctx.save();
                    ctx.fillStyle = bgColour;
                    ctx.strokeStyle = conturColour;

                    let cx = +x + 0.5 * +a;
                    let cy = +y + 0.5 * +b;

                    ctx.translate(cx, cy);
                    ctx.rotate((Math.PI / 180) * +angle);
                    ctx.translate(-cx, -cy);

                    ctx.moveTo(x, y);

                    ctx.lineTo(x, +y + +a);
                    ctx.lineTo(+x + +b, +y + +a);
                    ctx.lineTo(+x, +y);

                    ctx.fill();
                    ctx.stroke();
                    ctx.restore();
                }

                function paintCircle(figureObject) {
                    // const ctx = canvas.getContext("2d");
                    ctx.save();
                    ctx.beginPath();
                    ctx.strokeStyle = figureObject.conturColour;
                    ctx.lineWidth = 1;
                    // ctx.transform(scaleX, 0, 0, scaleY, 0, 0);
                    ctx.arc(figureObject.x, figureObject.y, figureObject.a, 0, 2 * Math.PI);
                    ctx.fillStyle = figureObject.bgColour;
                    ctx.fill();
                    ctx.stroke();
                    ctx.restore();
                }

                function paintEllipse(figureObject) {
                    const ctx = canvas.getContext("2d");
                    ctx.save();
                    ctx.beginPath();
                    ctx.strokeStyle = figureObject.conturColour;
                    // ctx.transform(scaleX, 0, 0, scaleY, 0, 0);
                    ctx.ellipse(
                        figureObject.x,
                        figureObject.y,
                        figureObject.a,
                        figureObject.b,
                        (Math.PI / 180) * figureObject.angle,
                        0,
                        2 * Math.PI
                    );
                    ctx.fillStyle = figureObject.bgColour;
                    ctx.fill();
                    ctx.stroke();
                    ctx.restore();
                }
            })
            .catch(error => {
                // enter your logic for when there is an error (ex. error toast)
                console.log(error)
            })





    })

});