const app = require("./app");
const config = require("config");

const PORT = config.get("port") || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
