const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  NotFoundError,
  BadRequestError,
  NotAuthenticatedError,
} = require("./../utils/errors");

const generateAccessToken = (email, id) => {
  const payload = { email, id };
  return jwt.sign(payload, process.env.JWT_TOKEN || "web is awesome", {
    expiresIn: process.env.FOODLE_JWT_EXPIRY || "30d",
  });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next(new BadRequestError("email or password missing"));
    return;
  }

  User.findOne({ email }, "email password type ", (err, user) => {
    if (err) {
      next(err);
      return;
    }

    if (!user) {
      next(new NotFoundError("unknown user"));
      return;
    }

    user.comparePassword(password, user.password, (err, isMatch) => {
      if (err) {
        next(err);
      } else if (isMatch) {
        res.json({
          message: "login successful",
          data: {
            uid: user._id,
            email: user.email,
            type: user.type,
            token: generateAccessToken(email, user._id),
          },
        });
      } else {
        next(new NotAuthenticatedError("password wrong"));
      }
    });
  });
};

const register = (req, res, next) => {
  const { firstName, lastName, username, email, password } = req.body;

  if (!username) {
    next(new BadRequestError("username is missing"));
    return;
  }

  if (!email) {
    next(new BadRequestError("email is missing"));
    return;
  }

  const salt = bcryptjs.genSaltSync(parseInt(process.env.SALT_ROUNDS) || 12);

  const hashedPassword = bcryptjs.hashSync(password, salt);
  const newUser = {
    firstName,
    lastName,
    username,
    email,
    password: hashedPassword,
  };

  User.create(newUser, (err, user) => {
    if (err) {
      next(err);
    } else {
      const data = {
        firstName,
        lastName,
        email,
        uid: user._id,
        type: user.type,
        token: generateAccessToken(email, user._id),
      };
      res.json({ data });
    }
  });
};

const resetPassword = (req, res, next) => {
  res.json({ error: "Not implemented" });
};

const changePassword = (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword) {
    next(new BadRequestError("email or password missing"));
    return;
  }

  if (!newPassword) {
    next(new BadRequestError("current password missing"));
    return;
  }

  User.findOne({ _id: req.user.id }, "password", (err, user) => {
    if (err) {
      next(err);
    }

    if (user === null) {
      next(NotFoundError("user not found"));
      return;
    }

    user.comparePassword(oldPassword, user.password, async (err, isMatch) => {
      if (err) {
        next(err);
        return;
      }
      if (isMatch) {
        const result = await User.updateOne(
          { _id: user._id },
          { password: newPassword }
        ).exec();

        res.json({
          success: "password changed successfully",
        });
      } else next(new BadRequestError("password incorrect"));
    });
  });
};

const checkAuthStatus = (req, res, next) => {
  res.json({ data: { status: "authenticated" } });
};

const getCurrentUser = (req, res, next) => {
  User.findOne({ _id: req.user.id }, "+email", (err, user) => {
    if (err) {
      next(err);
      return;
    }
    res.json({ data: user });
  });
};

const updateUser = (req, res, next) => {
  const { firstName, lastName, email } = req.body;

  User.updateOne(
    { _id: req.user.id },
    { firstName, lastName, email },
    (err, user) => {
      if (err) {
        next(err);
      } else {
        res.json({ data: user });
      }
    }
  );
};

module.exports = {
  login,
  register,
  resetPassword,
  changePassword,
  checkAuthStatus,
  getCurrentUser,
  updateUser,
};
