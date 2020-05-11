const { PythonShell } = require("python-shell");
const path = require('path');
const { pythonPath } = require('../../pythonPath');

function predictImg(userNumber, date, imgFileName) {
  return new Promise((resolve) => {
    const options = {
      mode: "text",
      pythonPath,
      pythonOptions: ["-u"],
      scriptPath: path.resolve('server', 'darkflow_2')
    };

    const shell = new PythonShell("predict.py", options);

    shell.send(userNumber.toString());
    shell.send(date);
    shell.send(imgFileName);

    let result = [];

    shell.on("message", (predictedFood) => {
      let predicted;
      try {
        console.log(predictedFood);
        predicted = JSON.parse(predictedFood);
        result.push(predicted);
      } catch (e) { }
    });

    shell.on("close", () => {
      console.log("python code ended...");
      resolve(result);
    });
  });
}

module.exports.predictImg = predictImg;