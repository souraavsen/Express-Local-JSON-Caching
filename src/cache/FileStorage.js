const fs = require("fs-extra");
const path = require("path");
const config = require("config");

const cacheDir = config.get("cacheDir");

const getFilePath = (userId) =>
  path.join(cacheDir, `${userId}.cache.json`);

const saveCache = (userId, data, deleted = false) => {
  fs.ensureDirSync(cacheDir);
  const filePath = getFilePath(userId);
  const getData = loadCache(userId);
  const dataToSave = !deleted ? { ...getData, ...data } : data;
  fs.writeFileSync(filePath, JSON.stringify(dataToSave, null, 2));
};

const loadCache = (userId) => {
  const filePath = getFilePath(userId);
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    if (stats.size === 0) {
      fs.writeFileSync(filePath, "{}");
      return {};
    }
    const content = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(content);
  }
  return {};
};

module.exports = { saveCache, loadCache };
