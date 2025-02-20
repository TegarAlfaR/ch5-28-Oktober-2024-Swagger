const { Shops, Products, Users } = require("../models");
const {Op} = require("sequelize")

const createShop = async (req, res) => {
  const { name, adminEmail, userId } = req.body;

  try {
    const newShop = await Shops.create({
      name,
      adminEmail,
      userId,
    });

    res.status(201).json({
      status: "Success",
      message: "Success create new Shop",
      isSuccess: true,
      data: {
        newShop,
      },
    });
  } catch (error) {
    console.log(error.name);
    if (error.name === "SequelizeValidationError") {
      const errorMessage = error.errors.map((err) => err.message);
      return res.status(400).json({
        status: "Failed",
        message: errorMessage[0],
        isSuccess: false,
        data: null,
      });
    }else if(error.name == "SequelizeDatabaseError"){
      return res.status(400).json({
        status: "Failed",
        message: error.message || "Database error",
        isSuccess: false,
        data: null,
      });
    }else{
      res.status(500).json({
        status: "Failed",
        message: "An unexpected error occured",
        isSuccess: false,
        data: null,
      });
    }

    res.status(500).json({
      status: "Failed",
      message: error.message,
      isSuccess: false,
      data: null,
    });
  }
};

const getAllShop = async (req, res) => {
  try {
    // cara 1. jaga request query nya agar tidak kemana mana
    // cara 2. dinamis filter
    
    // menggunakan cara 1
    const { shopName, adminEmail, productName, stock } = req.query

    const limit = req.query.limit ? parseInt(req.query.limit) : false; 
    const page = req.query.page ? parseInt(req.query.page) : 1;

    const condition = {};
    if(shopName) condition.name = { [Op.iLike]: `%${shopName}%` }

    const productCondition= {}
    if(productName) productCondition.name = { [Op.iLike]: `%${productName}%` }
    if(stock) productCondition.stock = stock 

    const start = 0 + (page - 1) * limit
    const end = page * limit

    const shops = await Shops.findAndCountAll({
      include: 
      [
        {
          model: Products,
          as: "products",
          attributes: ["name", "images", "stock", "price"],
          where: productCondition
        },
        {
          model: Users,
          as: "user",
          attributes: ["name"]
        },
      ],
      attributes: ["name", "adminEmail"],
      where: condition,
      limit: limit ? limit : undefined,
      offset: start ? start : undefined
    });

    const countShops = shops.count
    const pagination = {}
    pagination.totalRow = shops.count
    pagination.totalPage = limit ? Math.ceil(countShops / limit) : 1;
    
    if(page > pagination.totalPage){
      return res.status(404).json({
        status: "Failed",
        message: "Page not found",
        isSuccess: false,
        data: null
      });
    }

    if(end < countShops){
      pagination.current = {
        page,
        limit
      }
    }
    if(end < countShops && end != 0){
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
      message: "Success get shops data",
      isSuccess: true,
      pagination,
      data: {
        shops: shops.rows
      },
    });
  } catch (error) {
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

const getShopById = async (req, res) => {
  const id = req.params.id;

  try {
    const Shop = await Shops.findOne({
      where: {
        id,
      },
    });

    res.status(200).json({
      status: "Success",
      message: "Success get shop data",
      isSuccess: true,
      data: {
        Shop,
      },
    });
  } catch (error) {
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

const updateShop = async (req, res) => {
  const id = req.params.id;
  const { name, adminEmail } = req.body;

  try {
    const Shop = await Shops.findOne({
      where: {
        id,
      },
    });

    if (!Shop) {
      res.status(404).json({
        status: "Fail",
        message: "Data not found",
        isSuccess: false,
        data: null,
      });
    }

    await Shops.update({
      name,
      adminEmail,
    });

    res.status(200).json({
      status: "Success",
      message: "Success update shop",
      isSuccess: true,
      data: {
        Shop: {
          id,
          name,
          stock,
          price,
        },
      },
    });
  } catch (error) {
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

const deleteShop = async (req, res) => {
  const id = req.params.id;

  try {
    const Shop = await Shops.findOne({
      where: {
        id,
      },
    });

    if (!Shop) {
      res.status(404).json({
        status: "Fail",
        message: "Data not found",
        isSuccess: false,
        data: null,
      });
    }

    await Shops.destroy();

    res.status(200).json({
      status: "Success",
      message: "Success delete shop",
      isSuccess: true,
      data: null,
    });
  } catch (error) {
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

module.exports = {
  createShop,
  getAllShop,
  getShopById,
  updateShop,
  deleteShop,
};
