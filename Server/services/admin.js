const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const Admin = require("../models/Admin");
const admin_Task = require("../models/Admin_Dashboard");
exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username }).lean();
    if (!admin) return res.status(404).send("Invalid credentials");

    const isMatch = await compare(password, admin.password);
    if (!isMatch) return res.status(400).send("Invalid credentials...");
    const token = sign({ admin }, process.env.JWT_SECRET, {
      expiresIn: 360000,
    });
    return res.status(200).json({ token, admin });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
exports.getalltasks = async (req, res) => {
  try {
    let Task_all = await admin_Task.find({});
    res.status(200).send(Task_all);
  }
  catch (err) {
    res.status(400).send(err)
  }
};
exports.addnewtask = async (req, res) => {
  try {
    let Insert_task = req.body;
    await admin_Task.create(Insert_task);
    res.status(200).send("Success");
  }
  catch (err) {
    res.status(400).send(err)
  }
};

exports.updatetask = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("id", id);
    console.log(req.body);
    await admin_Task.findOneAndUpdate({ _id: id }, req.body);
    res.status(200).send("Success");
  }
  catch (err) {
    res.status(400).send(err)
  }
};

exports.deletetask = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    await admin_Task.deleteOne({ _id: id });
    res.status(200).send("Success");
  }
  catch (err) {
    res.status(400).send(err)
  }
};
exports.getAuthAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req?.admin?._id).select("-password").lean();
    if (!admin)
      return res.status(400).send("Admin not found, Authorization denied..");
    return res.status(200).json({ ...admin });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

