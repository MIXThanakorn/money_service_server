const { PrismaClient } = require("@prisma/client");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

//? สร้างตัวแปรอ้างอิงสำหรับ prisma เพื่อเอาไปใช้
const prisma = new PrismaClient();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/users");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      "user_" +
        Math.floor(Math.random() * Date.now()) +
        path.extname(file.originalname)
    );
  },
});
exports.uploadUser = multer({
  storage: storage,
  limits: {
    fileSize: 100000000, //? file 1 mb
  },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));
    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Error: Images Only");
  },
}).single("userImage");

exports.createUser = async (req, res) => {
  try {
    const { userFullName, userBirthDate, userName, userPassword } = req.body;
    const result = await prisma.user_tb.create({
      data: {
        userFullName: userFullName,
        userBirthDate: userBirthDate,
        userName: userName,
        userPassword: userPassword,
        userImage: req.file ? req.file.path.replace("images\\users\\", "") : "",
      },
    });

    res.status(201).json({
      message: "เพิ่มข้อมูลสําเร็จ",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      message: `พบเจอปัญหาในการทำงาน: ${err}`,
    });
    console.log("Error", err);
  }
};

exports.checklogin = async (req, res) => {
  try {
    const result = await prisma.user_tb.findFirst({
      where: {
        userName: req.params.userName,
        userPassword: req.params.userPassword,
      },
    });

    if (result) {
      res.status(200).json({
        message: "เข้าสู่ระบบสําเร็จ",
        info: result,
      });
    } else {
      res.status(404).json({
        message: "ไม่พบข้อมูล",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: `พบเจอปัญหาในการทำงาน: ${err}`,
    });
  }
};
