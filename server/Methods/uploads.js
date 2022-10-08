const fs = require("fs");
const Messages = require("../models/privateMessages");

const UploadImage = async (req, res) => {
  const { username } = req.body;
  try {
    await Messages.findOneAndUpdate(
      { username: username },
      {
        profileImage: {
          data: fs.readFileSync("uploads/" + req.file.filename),
          contentType: "image/png",
        },
      }
    );
    res.send("save");
    console.log("Image is save");
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = UploadImage;
