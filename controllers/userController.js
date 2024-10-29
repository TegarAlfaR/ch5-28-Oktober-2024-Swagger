const { Users } = require("../models");
const {Op} = require("sequelize")

const findUsers = async (req, res, next) => {
  try {
    const { name, age, address, role} = req.query
    const limit = req.query.limit ? parseInt(req.query.limit) : null; 
    const page = req.query.page ? parseInt(req.query.page) : 1;

    const userCondition = {}
    if(name) userCondition.name = { [Op.iLike]: `%${name}%` }
    if(age) userCondition.age = age
    if(address) userCondition.address = { [Op.iLike]: `%${address}%` }
    if(role) userCondition.role = { [Op.iLike]: `%${role}%` }

    const start = 0 + (page - 1) * limit
    const end = page * limit
    
    const users = await Users.findAndCountAll({
      attributes: ["id", "name", "age", "address", "role"],
      where: userCondition,
      limit: limit ? limit : undefined,
      offset: start ? start : undefined
    });

    const countUsers = users.count
    const pagination = {}
    pagination.totalRow = users.count
    pagination.totalPage = limit ? Math.ceil(countUsers / limit) : 1;

    if(page > pagination.totalPage){
      return res.status(404).json({
        status: "Failed",
        message: "Page not found",
        isSuccess: false,
        data: null
      });
    }

    if(end < countUsers){
      pagination.current = {
        page,
        limit
      }
    }
    if(end < countUsers && end != 0){
      pagination.next = {
        page : page +1,
        limit
      }
    }
    if(start > 0){
      pagination.prev = {
        page : page -1,
        limit
      }
    }

    res.status(200).json({
      status: "Success",
      message: "Success get all data",
      isSuccess: true,
      pagination,
      data: {
        users
      },
    });
  } catch (error){
    console.log(error.name);
    if (error.name === "SequelizeValidationError") {
      const errorMessage = error.errors.map((err) => err.message);
      return res.status(400).json({
        status: "Fail",
        message: errorMessage[0],
        isSuccess: false,
        data: null,
      });
    }

    res.status(500).json({
      status: "Fail",
      message: error.message,
      isSuccess: false,
      data: null,
    });
  }
};

const findUserById = async (req, res, next) => {
  try {
    const user = await Users.findOne({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "Success",
      data: {
        user,
      },
    });
  } catch (err) {}
};

const updateUser = async (req, res, next) => {
  const { name, age, role, address, shopId } = req.body;
  try {
    await Users.update(
      {
        name,
        age,
        role,
        address,
        shopId,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json({
      status: "Success",
      message: "sukses update user",
    });
  } catch (err) {}
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await Users.findOne({
      where: {
        id: req.params.id,
      },
    });

    await Users.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "Success",
      message: "sukses delete user",
    });
  } catch (err) {}
};

module.exports = {
  findUsers,
  findUserById,
  updateUser,
  deleteUser,
};
