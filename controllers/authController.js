const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { user, pwd, isMicrosoft } = req.body;
  if (!user) return res.status(400).json({ message: "Username is required." });

  let foundUser = await User.findOne({ username: user }).exec();
  console.log("Found user full:", foundUser);

  if (isMicrosoft) {
    if (!foundUser) {
      // ✅ Create new Microsoft user if not found
      foundUser = new User({ username: user, roles: { User: 2001 }, isMicrosoft: true });

      try {
        await foundUser.save();
      } catch (err) {
        return res.status(500).json({ message: "Error saving Microsoft user", error: err.message });
      }
    }

    // ✅ Generate JWT token
    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      { UserInfo: { username: foundUser.username, roles: roles } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "900s" }
    );

    return res.json({ accessToken });
  }

  // ✅ Normal login flow (when isMicrosoft is false)
  if (!pwd) return res.status(400).json({ message: "Password is required." });

  if (!foundUser) return res.sendStatus(401); // Unauthorized

  // ✅ Compare hashed password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (!match) return res.sendStatus(401);

  // ✅ Generate JWT tokens
  const roles = Object.values(foundUser.roles);
  const accessToken = jwt.sign(
    { UserInfo: { username: foundUser.username, roles: roles } },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "900s" }
  );
  const refreshToken = jwt.sign({ username: foundUser.username }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1d",
  });

  // ✅ Save refresh token
  foundUser.refreshToken = refreshToken;
  await foundUser.save();

  res.cookie("jwt", refreshToken, { httpOnly: true, sameSite: "None", maxAge: 24 * 60 * 60 * 1000 });
  res.json({ accessToken });
};

module.exports = { handleLogin };
