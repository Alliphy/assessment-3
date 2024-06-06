import express from "express";
import session from "express-session";
import morgan from "morgan";
import nunjucks from "nunjucks";
import { fetchArtworkLink } from "./api.js";

const app = express();
const port = "4090";

const allComments = [
  {
    message: "",
    author: "",
  },
];

// Middleware
app.use(morgan("dev"));
// post reqs
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(
  session({
    secret: "shhhh",
    saveUninitialized: true,
    resave: false,
  })
);

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.get("/", async (req, res) => {
  const link = await fetchArtworkLink();
  const props = {
    imageLink: link,
    comments: allComments,
  };
  res.render("index.html.njk", props);
});

app.post("/submit-comment", async (req, res) => {
  const comment = req.body.comment;

  const newComment = {
    message: comment,
    author: "Anonymous",
  };

  allComments.push(newComment);
  const props = {
    comments: allComments,
  };
  res.render("index.html.njk", props);
});

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
