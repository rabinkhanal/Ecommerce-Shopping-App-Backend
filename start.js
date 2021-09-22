const http = require("http");
const app = require("./index");

const port = process.env.PORT || 8080;
const serve = http.createServer(app);
app.listen(port, () => console.log("Server running @ port: " + port));
