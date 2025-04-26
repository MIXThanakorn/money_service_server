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
