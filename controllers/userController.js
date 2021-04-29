import Users from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const maxAge = 3 * 24 * 60 * 60;

const createAccessToken = (id) => {
  return jwt.sign(id, process.env.ACCESS_TOKEN_SECRET, { expiresIn: maxAge });
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await Users.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'This user already exist!' });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ msg: 'Password must be at least 6 characters long!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Users({ name, email, password: hashedPassword });
    await newUser.save();

    const accessToken = createAccessToken({ id: newUser._id });
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });

    res.status(201).json({ accessToken });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'User does not exist!' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Incorrect password!' });
    }

    const accessToken = createAccessToken({ id: user._id });
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });

    res.status(200).json({ accessToken });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie('accessToken');
    return res.status(200).json({ msg: 'Logged out' });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await Users.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(400).json({ msg: 'User does not exist!' });
    }

    res.json(user);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export { register, login, logout, getUser };
