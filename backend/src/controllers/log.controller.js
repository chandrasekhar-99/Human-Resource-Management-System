const {Log, User} = require('../models');
const {success, error} = require('../utils/response');
const { Op } = require('sequelize');

const getAllLogs = async (req, res) => {
  try {
    const {page=1, limit=10, userId, action} = req.query;

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;
    const offsetNum = (pageNum - 1) * limitNum;

    const whereClause = {};

    if (userId) {
      whereClause.userId = userId;
    }

    if (action) {
      whereClause.action = { [Op.iLike]: `%${action}%` };
    }

    const logs = await Log.findAndCountAll({
      where: whereClause,
      include: [{ model: User, as: 'user', attributes: ['id', 'name', 'email'] }],
      limit: limitNum,
      offset: offsetNum,
      order: [['createdAt', 'DESC']]
    });
    
    return success(res, "Logs retrieved successfully", {
      rows: logs.rows,
      count: logs.count,
      page: parseInt(page),
      limit: limitNum,
      totalPages: Math.ceil(logs.count / limitNum),
    });
  } catch (err) {
    console.log("getAllLogs error:", err);
    return error(res, err.message);
  }
};

module.exports = { getAllLogs };