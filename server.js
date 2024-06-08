import express from "express";
import session from "express-session";
import morgan from "morgan";
import nunjucks from "nunjucks";
import { fetchArtworkImageIds } from "./api.js";

const app = express();
const port = "4090";

const allComments = [];

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
  const ids = await fetchArtworkImageIds();
  const props = {
    imageIds: ids,
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
  // res.render("index.html.njk", props);

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
