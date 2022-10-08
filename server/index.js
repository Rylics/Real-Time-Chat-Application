const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const Messages = require("./models/privateMessages");
const configUpload = require("./controller/Multer");

const { createGroup, getGroups } = require("./Methods/groupMessage");
require("dotenv").config();

const {
  AddMessage,
  Delete,
  Update,
  Get,
  Addcontact,
} = require("./Methods/Messages");

const UserAccount = require("./controller/SignUp");
const Login = require("./controller/Login");
const { getgroups } = require("process");
const UploadImage = require("./Methods/uploads");

let user = [];
const room = [];

mongoose.connect(
  process.env.DATABASE_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("MONGO DATABASE CONNECTED");
  }
);

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/messages", Get);
app.delete("/user", Delete);
app.post("/signup", UserAccount);
app.post("/addcontact", Addcontact);
app.post("/login", Login);
app.post("/addMessage", AddMessage);

app.put("/uploads", configUpload.single("image"), UploadImage);

// app.post("/creategroup", createGroup);
// app.get("/getgroups", getGroups);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["POST", "GET", "PATCH"],
  },
});

io.on("connection", async (socket) => {
  console.log(`The user:${socket.id} is connected`);

  socket.on("send_message", async (data) => {
    user.push(data);

    await Messages.findOneAndUpdate(
      { username: data.username },
      {
        $push: {
          message: data.message,
        },
      }
    );
    console.log(user[0].message.sendeeer);
    console.log(data.message.socket_id);
    if (user.length >= 2) {
      const toUser = user?.map((storedata) => {
        if (data.message.receiver === storedata.message.sender) {
          return storedata.message.socket_id;
        }
      });
      io.to(toUser).emit("receive_message", data.message);
    }

    console.log(user);
  });

  socket.on(["createGroup"], async (groupdata) => {
    const groupID = await groupdata.groupID;
    socket.join(groupID);
    console.log(groupdata.profilename, "create group", groupdata.groupName);
  });

  socket.on("joinGroup", async (groupdata) => {
    const groupID = await groupdata.groupID;
    await socket.join(groupID);
    console.log(groupdata.profilename, "join group", groupdata.groupName);
  });

  socket.on("sendGroupMessage", async (groupMessage) => {
    const groupID = await groupMessage.groupID;
    socket.to(groupID).emit("receiveGroupMessage", groupMessage);
    room.push(groupMessage);
    console.log(room);
  });

  socket.on("disconnect", () => {
    if (user) {
      const newarrary = user.filter((data) => {
        return data !== socket.id;
      });
      user = newarrary;
      console.log(user);
    }

    console.log(`user ${socket.id}  disconnected`);
  });
});
const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server Connected on Port ${PORT}`);
});
