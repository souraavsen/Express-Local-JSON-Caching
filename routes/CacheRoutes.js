const express = require("express");
const { setCache, getCache, deleteCache } = require("../src/cache/CacheManager");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running 🚀🚀🚀" });
});

router.post("/:userId/:key", (req, res) => {
  const { userId, key } = req.params;
  const { value, ttl } = req.body;
  setCache(userId, key, value, ttl);
  res.status(200).json({ message: "Cache set successfully" });
});

router.get("/:userId/:key", (req, res) => {
  const { userId, key } = req.params;
  const value = getCache(userId, key);
  if (value === null) {
    res.status(404).json({ message: "Key not found or expired" });
  } else {
    res.status(200).json({ value });
  }
});

router.delete("/:userId/:key", (req, res) => {
  const { userId, key } = req.params;
  deleteCache(userId, key);
  res.status(200).json({ message: "Cache deleted successfully" });
});

module.exports = router;
