const router = require("express").Router();
const File = require("../models/file");

router.get("/:uuid", async (req, res) => {
  try {
    const file = await File.findOne({ uuid: req.params.uuid });
    // Link expired
    if (!file) {
      return res.render("download", { error: "Link has been expired." });
    }
    console.log("Download link generated");
    return res.render("download", {
      uuid: file.uuid,
      fileName: file.filename,
      fileSize: file.size,

      downloadLink: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`, //downloadLink name should be same as there in download.ejs file
    });
  } catch (err) {
    return res.render("download", { error: "Something went wrong." });
  }
});

module.exports = router;
