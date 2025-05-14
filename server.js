const dotenv = require("dotenv");
//require('dotenv').config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const { connectRabbitMQ } = require("message-bus");
const PORT = process.env.PORT || 3000;
dotenv.config();

//const { swaggerUi, swaggerDocs } = require('./swagger');

// Serve Swagger docs
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//connect to MongoDB
connectDB();

// custom middleware logger
app.use(logger);

//handle options credentials check - before cors!
// and fetch cookiescredentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//serve static files
app.use("/", express.static(path.join(__dirname, "/public")));

// routes
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

app.use(verifyJWT);
app.use("/employees", require("./routes/api/employees"));
app.use("/contactType", require("./routes/api/contactType"));
app.use("/contact", require("./routes/api/contact"));
app.use("/lookuptype", require("./routes/api/lookuptype"));
app.use("/lookup", require("./routes/api/lookup"));
app.use("/partner", require("./routes/api/PartnerRoutes"));
app.use("/children", require("./routes/api/ChildrenRoutes"));

app.use("/profile", require("./routes/api/ProfileRoutes"));
app.use("/gardaLifeClaims", require("./routes/api/GardaLifeClaimRoutes"));
app.use("/partnerLifeClaims", require("./routes/api/PartnerLifeClaimRoute"));
app.use("/criticalIllness", require("./routes/api/CriticalIllnessClimRoutes"));
app.use("/transferRequest", require("./routes/api/TransferRequestRoutes"));

//app.all is for routin and apply for all http methods at once
//app.use is for middleware and not support rjax
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

// Connect to RabbitMQ and start the server
(async () => {
  try {
    await connectRabbitMQ({
      amqpUrl: process.env.RABBITMQ_URL || "amqp://localhost",
      retryAttempts: 10,
      retryDelay: 3000,
    });

    console.log("🎉 RabbitMQ is ready in Config Service");

    mongoose.connection.once("open", () => {
      console.log("Connected to MongoDB");
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    });
  } catch (error) {
    console.error("Failed to connect to RabbitMQ:", error);
    process.exit(1);
  }
})();
