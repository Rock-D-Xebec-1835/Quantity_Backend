const jwt = require("jsonwebtoken");

function auth(req, res, next) {

  console.log("AUTH HEADER:");
  console.log(req.headers.authorization);

  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({
      error: "No token provided"
    });
  }

  const token = header.split(" ")[1];

  console.log("TOKEN:");
  console.log(token);

  try {

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log("DECODED:");
    console.log(decoded);

    req.user = decoded;

    next();

  } catch (err) {

    console.log(err);

    return res.status(401).json({
      error: "Invalid token"
    });

  }
}

module.exports = auth;