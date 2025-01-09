const fs = require("fs-extra");

const FileStorage = require("./FileStorage");
const TTL_CLEANUP_INTERVAL = 60000; // 1 minute interval

const cache = {};

const setCache = (userId, key, value, ttl = 3600) => {
  const expiry = Date.now() + ttl * 1000;
  if (!cache[userId]) cache[userId] = {};
  cache[userId][key] = { value, expiry };
  FileStorage.saveCache(userId, cache[userId]);
};

const getCache = (userId, key) => {
  const retrivedCache = FileStorage.loadCache(userId);
  const item = retrivedCache ? retrivedCache[key] : null;
  if (!item || item.expiry < Date.now()) {
    deleteCache(userId, key);
    return null;
  }
  return item.value;
};

const deleteCache = (userId, key) => {
  const retrivedCache = FileStorage.loadCache(userId);
  if (retrivedCache[key]) {
    delete retrivedCache[key];
    FileStorage.saveCache(userId, retrivedCache, true);
  }
};

const cleanupExpiredKeys = () => {
  const folderPath = "./cache";
  readAllFilesFromFolderAsync(folderPath).then((files) => {
    files?.forEach((path) => {
      const userId = path?.replace(".cache.json", "");
      const caches = FileStorage.loadCache(userId);
      for (const key in caches) {
        if (caches[key].expiry < Date.now()) {
          deleteCache(userId, key, true);
        }
      }
    });
  });
};

const readAllFilesFromFolderAsync = async (folderPath) => {
  try {
    const files = await fs.readdir(folderPath);
    return files;
  } catch (error) {
    console.error("Error reading files:", error);
    return [];
  }
};

// Will check and auto clear after every TTL_CLEANUP_INTERVAL times
setInterval(cleanupExpiredKeys, TTL_CLEANUP_INTERVAL);

module.exports = { setCache, getCache, deleteCache };
