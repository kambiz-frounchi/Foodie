const router = require("express").Router();
const tagsController = require("../../controllers/tagsController");

router.route("/").get(tagsController.findAll);

module.exports = router;
