const express = require("express");
const router = express.Router();
const users = require("../users.json");
const fs = require("fs");
const JWT = require("jsonwebtoken");

router.post("/signup", async (req, res, next) => {
  // console.log("req.body: ", req.body);

  const user = {
    id: users.length + 1,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  };

  // console.log("users before: ", users);
  users.push(user);
  // console.log("users after: ", users);

  fs.writeFile("users.json", JSON.stringify(users), (err) => {
    if (err) throw err;
    console.log("Done writing the users db");
  });

  // Option 1. refreshTokens/mern-auth-server
  // const token = jwt.sign({ _id: user.id}, process.env.JWT_SECRET, {
  // expiresIn: eval(process.env.SESSION_EXPIRY)
  //});

  // option 2. hongly tech
  const accessToken = await JWT.sign(
    { email: user.email },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "30s",
    }
  );

  res.json({ accessToken });
  // res.send("Duude");
});

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  console.log("S1. req.body of /login: ", req.body);

  let user = users.find((user) => {
    return user.email === username;
  });

  let userIndex = users.findIndex((user) => {
    return user.email === username;
  });

  // console.log("user found: ", user);

  let isMatch = password == user.password;

  if (!isMatch) {
    res.send("no match");
  }

  const accessToken = await JWT.sign(
    { email: username },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "30s",
    }
  );
  console.log("S2. /login. access token created.");

  const refreshToken = await JWT.sign(
    { email: username },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "1m",
    }
  );

  users[userIndex].refreshToken = refreshToken;

  fs.writeFile("users.json", JSON.stringify(users), (err) => {
    if (err) throw err;
    console.log("Done writing the users db");
  });
  // console.log("logged in?");
  res.json({ accessToken, refreshToken });
});

// Could possibly be a post? I guess it depends on how you do it
router.get("/token", async (req, res) => {
  // const refreshToken = req.header()
  const refreshToken = req.headers["authorization"].split("Bearer ")[1];

  try {
    // console.log("in try of /token");
    // in tutorial1 we return a 403 error OR return the access token.
    const payload = JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    // console.log("After payload");

    // console.log("payload from refreshToken: ", payload);

    const { email } = payload;

    // Find the refresh token in the DB. Make sure it matches.

    // the "find user and compare refresh tokens" part goes in the "validate" function of the refresh strat.
    const theUser = users.find((user) => user.email == email);
    // return NULL if the user does NOT have a refreshToken in the db.

    const refreshTokensMatch = theUser.refreshToken == refreshToken;

    if (refreshTokensMatch) {
      const accessToken = await JWT.sign(
        { email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30s" }
      );
      return res.json({ accessToken });
    } else {
      return { msg: "Tokens dont match. yo" };
    }
  } catch (error) {
    console.log("Error in the /token route");
  }

  // const refreshData = await JWT.verify(
  //   refreshToken,
  //   process.env.REFRESH_TOKEN_SECRET,
  // )
  // console.log("refreshData: ", refreshData);

  // create new access token.

  return res.send("attempted to grab the refresh token.");
});

router.delete("/logout", async (req, res) => {
  // todo.
  res.send("todo");
});

router.get("/me", async (req, res, next) => {
  // console.log("in /me. req:", req);
  // console.log("in /me. req.headers:", req.headers);

  const accessToken = req.headers["authorization"].split("Bearer ")[1];

  // console.log("accessToken: ", accessToken);

  try {
    const payload = JWT.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    // console.log("payload: ", payload);
    const user = {
      email: payload.email,
    };

    return res.send(user);
  } catch (err) {
    // Don't want to give the user the exact details of the issue (like if the token is expired or some other problem.)
    res.statusCode = 401;
    return res.send("Unauthorized");
  }

  // return res.send({ username: "bob" });
});

module.exports = router;
