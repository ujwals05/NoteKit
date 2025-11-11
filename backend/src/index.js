import app from "./app.js";
import connectDB from "./db/index.js";

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("The app is running on port :", process.env.PORT);
  });
});
