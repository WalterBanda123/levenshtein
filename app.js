const express = require("express");
const multer = require("multer");
const fs = require("fs-extra");
const excelToJson = require("convert-excel-to-json");
const app = express();
const port = 3000;
const uploadHandler = multer({ dest: "uploads/" });
const length_80 = require("./length");
const levenshtein$ = require("fast-levenshtein");

app.post("/read", uploadHandler.single("file"), async (req, res) => {
  try {
    if (req.file.fieldname === null || req.file.filename === "undefined") {
      res.status(400).json({
        message: "No file found",
      });
    } else {
      const filePath = `uploads/` + req.file.filename;
      const excelData = excelToJson({
        sourceFile: filePath,
        header: {
          rows: 1,
        },
        /* ****CONFIGURE THIS LINE SO THAT YOU SET UP THE KEYS IN THE OBJECT
                person SENT BY LAS******
                */
        columnToKey: {
          // "*":"{{columnHeader}}"
          A: "brand",
          B: "category",
          C: "model",
          D: "name",
          E: "address",
          F: "country",
          G: "status",
        },
      });

      fs.remove(filePath);

      const newList = excelData["parsedData"].map((obj) =>
        Object.assign(obj, {
          trademark: "",
          distributor: "",
          origin: "",
          manufacture_date: "",
          price: 0,
          image_vides: "",
          piano_sound: "",
          geometry: { type: "Point" },
          coordinates: [0, 0],
          agent: {},
          project: {},
          retailer: {},
          active: true,
          verified: false,
          notes: "",
          images: [],
          inMasterlist: true,
          location: {},
          pcc: "",
          user: {},
          duplicate: false,
          targetDetails: [],
          visitDetails: {},
          noticeDetails: [],
          target: false,
          visit: false,
          notice: false,
          noticeAmount: 0,
          tRatio: 0,
          vRatio: 0,
          _created_at: new Date().toDateString(),
          _updated_at: new Date().toUTCString(),
        })
      );
      console.log(newList);
      res.status(200).json({
        message: "This process was a success!",
        jsonData: newList,
      });
    }
  } catch (error) {
    res.status(500).json({
      errorMessage: error.message,
    });
  }
});

//---CREATING A NAMES ARRAYS TO MATCH THEM
app.get("/names", async (req, res) => {
  try {
    const fileSystem = require("fs");
    const path = require("path");

    const filePath = path.join(__dirname, "response.json");
    const data = fileSystem.readFileSync(filePath, { encoding: "utf-8" });

    const parsedData = JSON.parse(data);
    const dataArr = parsedData.jsonData;

    const namesArr = [];
    dataArr.forEach((obj) => {
      namesArr.push(obj.name);
    });

    res.status(200).json({
      message: "Successfully obtained the names",
      names: namesArr,
    });
    // console.log(namesArr.slice(0, 2000));
  } catch (error) {
    res.status(500).json({
      errorMessage: error.message,
    });
  }
});

//---READING NAMES AND FUZZY MATCH THEM-----
app.get("/fuzzed", async (req, res) => {
  try {
    const fileSystem = require("fs");
    const path = require("path");

    const filePath = path.join(__dirname, "uniques_names.json");
    const data = fileSystem.readFileSync(filePath, { encoding: "utf-8" });

    const parsedData = JSON.parse(data);
    const dataArr = parsedData.names;

    const aSet = new Set(dataArr);

    //---CREATE FUZZY MATCH ALGORITHM TO MATCH THE NAMES ---

    const filteredNameList = [];
    dataArr.forEach((str) => {
      const result = str.toLowerCase().replaceAll(/[/\s+ " "  , . ]/g, "");
      filteredNameList.push(result);
    });

    res.status(200).json({
      message: "Successfully obtained the names",
      names: filteredNameList,
    });
  } catch (error) {
    res.status(500).json({
      errorMessage: error.message,
    });
  }
});

app.get("/uniques", (req, res) => {
  try {
    const fileSystem = require("fs");
    const path = require("path");

    const filePath = path.join(__dirname, "uniques_names.json");
    const data = fileSystem.readFileSync(filePath, { encoding: "utf-8" });

    const parsedData = JSON.parse(data);
    const dataArr = parsedData.names;


    const aSet = new Set(dataArr);
    
    const uniqueNames = [...aSet];
    console.log("uniqueNames.length", uniqueNames.length);

    //--READING FILE FOR THE REPLACED NAMES ----
    const filePath_ = path.join(__dirname, "replaced_names.json");
    const data_ = fileSystem.readFileSync(filePath_, { encoding: "utf-8" });

    const parsedData_ = JSON.parse(data_);
    const dataArr_ = parsedData_.names;
    console.log(dataArr_.length);

    // const aSet_ = new Set(dataArr_);

    const uniqueNames_ = [...dataArr_];
    console.log("uniqueNames_.length", uniqueNames_.length);

    const results = [];

    for (const uni of uniqueNames_) {
      const obj = { key: uni, value: [] };
      for (let i = 0; i < uniqueNames.length; i++) {
        if (uni === obj.key) {
          const distance = levenshtein$.get(
            length_80(obj.key),
            length_80(
              uniqueNames[i].toLowerCase().replaceAll(/[/\s+ , " " . ]/g, "")
            )
          );

          //  console.log(arrForNames[i]);
          if (distance < 1 && uni === obj.key) {
            obj.value.push(uniqueNames[i]);
          } else {
            if (!results.includes(obj)) {
              results.push(obj);
            }
          }
        }
      }
    }

    res.status(200).json({
      message: "Successfully obtained the names",
      // results: uniqueNames_,
      results: results,
      // names: arrForNames,
    });
  } catch (error) {
    res.status(500).json({
      errorMessage: error.message,
    });
  }
});

// ---CREATING MY SERVER----
app.listen(port, () => {
  console.log("App is running at port 3000");
});
