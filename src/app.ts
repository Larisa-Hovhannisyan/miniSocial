import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import indexRouter from "./routes/index";
import authRouter from "./routes/auth";
import postsRouter from "./routes/posts";
import expressLayouts from "express-ejs-layouts";

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(expressLayouts);
app.set("layout", "layout");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/public", express.static(path.join(__dirname, "..", "public")));
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/posts", postsRouter);

app.use((req, res) => {
  res.status(404).render("index", { user: null, message: "Page not found" });
});

export default app;
