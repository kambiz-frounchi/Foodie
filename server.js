//
const express = require("express");
const aws = require("aws-sdk");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const passport = require("./passport");
const MongoStore = require("connect-mongo")(session);
const bodyParser = require("body-parser");
const morgan = require("morgan");
const PORT = process.env.PORT || 3001;
const app = express();
const routes = require("./routes");
const fileUpload = require("express-fileupload");
const S3_BUCKET = process.env.S3_BUCKET || "foodiebucket";

const credentials = new aws.Credentials({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "" 
});

aws.config.region = "us-east-2";
aws.config.credentials = credentials;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(morgan("dev"));
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/foodie", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use(
  session({
    secret: "fraggle-rock-bottom", //a random string to make the hash that is generated secure
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: false, //required
    saveUninitialized: false, //required
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session()); // calls the deserializeUser

app.get("/sign-s3", (req, res) => {
  const s3 = new aws.S3();
  const fileName = req.query["file-name"];
  const fileType = req.query["file-type"];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: "public-read",
  };

  s3.getSignedUrl("putObject", s3Params, (err, data) => {
    if (err) {
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`,
    };
    res.write(JSON.stringify(returnData));
    res.end();
  });
});

// Add routes, both API and view
app.use(routes);

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
