const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../docs/swagger.json")

router.use("/", swaggerUi.serve);
router.use("/", swaggerUi.setup(swaggerDocument));


module.exports = router;
