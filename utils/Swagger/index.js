const swaggerUI = require("swagger-ui-express");
const defaultComponents = require("./default.json");
const swaggerOptions = require("./swaggerOptions.json");
const ContentArray = require("../ContentArray.js");
const Loggers = require("../Loggers.js");
const docuList = ContentArray("docs");
const path = require('path');
const HttpTokenChecking = require("../../modules/MiddlewareModule/controllers/HttpTokenChecking.js");

swaggerOptions.servers =[{"url" : "http://localhost:3000"},{"url" : "http://localhost:4000"}]
mergeJSON(swaggerOptions, defaultComponents);
for (const r of docuList) {
  const module =  require(r.path);
  mergeJSON(swaggerOptions, module);
}


function mergeObjects(mainObject, objectToMerge, key) {
  if (mainObject.hasOwnProperty(key) && objectToMerge.hasOwnProperty(key)) {
      if (key === 'tags') {
          mainObject[key] = mainObject[key].concat(objectToMerge[key]);
      }
      else if (key === 'paths') {
        let mergeTo = mainObject[key]
        for (const [props, value] of Object.entries(objectToMerge[key])) {
          if (mergeTo[props]) {
            mergeTo[props] = {
              ...mergeTo[props],
              ...value
            };
          } else {
            mergeTo[props] = value;
          }
        }
        mainObject[key]=mergeTo;
   
      }
      else if (key === 'components' && objectToMerge.hasOwnProperty('components')) {
       
          mainObject[key].schemas = { ...mainObject[key].schemas, ...objectToMerge[key].schemas };
      }
  } else {
      const errorMsg = `Key '${key}' not found in both objects or missing in one of the objects.`;
      Loggers.error(__filename, errorMsg);
  }
}

function mergeJSON(mainJSON, jsonToMerge) {
  Object.keys(jsonToMerge).forEach(key => {
      mergeObjects(mainJSON, jsonToMerge, key);
  });
}
swaggerOptions.tags.sort((a, b) => {
  if (a.name < b.name)  return -1;
  if (a.name > b.name) return 1
  return 0;
});

module.exports = (app) => {
  app.get('/api-docs-login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
  });
  app.get('/api-docs-json', (req, res) => {
      res.json(swaggerOptions);
  });
  app.get('/api-docs/:id',HttpTokenChecking, (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });
}