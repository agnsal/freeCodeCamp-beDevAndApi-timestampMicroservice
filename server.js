import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html");
});

// Do not change code above this line

app.get("/api{/:date}", (req, res) => {
  const n = Number(req.params?.date);
  const d = req.params.date ? new Date(isNaN(n) ? req.params.date : n) : new Date();
  if(isNaN(d.getTime())){
    const e = new Error("Invalid Date");
    e.code = 400; 
    throw e;
  }
  res.json({
    unix: d.getTime(),
    utc: d.toUTCString()
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.code || 500).json({
    error: err.message
  });
});

// Do not change code below this line

const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
