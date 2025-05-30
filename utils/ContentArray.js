const fs = require("fs");
const path = require("path");
const ReadDir = require("./FileSystem/ReadDir");

module.exports = (contentDir) => {
  // const normalizedPath = require.main.path;
  const normalizedPath = process.cwd();
  const modulesPath = path.join(normalizedPath, "modules");
  const moduleList = ReadDir(modulesPath);

  let listContent = [];

  for (const m of moduleList) {
    const contentPath = path.join(modulesPath, m, contentDir);
    if (!fs.existsSync(contentPath)) continue;
    const contentFiles = ReadDir(contentPath);
    listContent = [...listContent, ...contentFiles.map(e => {
      let models = {};
      models.name = e.split(".js")[0];
      models.path = path.join(contentPath, e);
      return models;
    })];
  }

  return listContent;
}