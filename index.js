const http = require("http");
const fs = require("fs");

const PORT = 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type' : 'text/html'})
  let api = "." + req.url;
  fs.readdir(api, { encoding: "utf8" }, (err, data) => {
    res.write(`<h2>${api} content: </h2>`);
    if (err) {
      console.log(err);
      res.end(fs.readFileSync(`${api}`));
    } else {
      let display = "";
      if(data.length === 0){
        display += "<p>This directory is empty<p>";
      }
      data.forEach((e) => {
      display += `<li><a href="${e}/">${e}</a></li>`;
      });
      res.end(`<ol>${display}</ol>`);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
