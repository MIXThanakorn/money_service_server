const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.postMoney = async (req, res) => {
  try {
    const { moneyDetail, moneyDate, moneyInOut, moneyType, userID } = req.body;
    const result = await prisma.money_tb.create({
      data: {
        moneyDetail: moneyDetail,
        moneyDate: moneyDate,
        moneyInOut: moneyInOut,
        moneyType: moneyType,
        userID: userID,
      },
    });

    res.status(201).json({
      message: "เพิ่มข้อมูลสําเร็จ",
      info: result,
    });
  } catch (err) {
    res.status(500).json({
      message: `พบเจอปัญหาในการทำงาน: ${err}`,
    });
  }
};

exports.getMoneyByType = async (req, res) => {
  try {
    const { userID } = req.params;
    const result = await prisma.money_tb.findMany({
      where: {
        userID: parseInt(userID),
      },
    });
    if (result) {
      res.status(200).json({
        message: "Money found successfully",
        info: result,
      });
    } else {
      res.status(404).json({
        message: "Money not successfully",
        info: result,
      });
    }
  } catch (err) {
    res.status(500).json({
      error: `Server Error: ${err}`,
    });
    console.log(err);
  }
};
