// function Upload(formData,config) {
//     axios
//     .put("http://localhost:4195/uploads", formData, config)
//     .then((res) => {
//       alert("success uploaded");
//       setFileStore("");
//     })
//     .catch((error) => {
//       console.log(error);
//     });
//   }

//   function updateAllprofilePic(formData,config){
//     axios
//     .put("http://localhost:4195/updateAllprofilePic", formData, config)
//     .then((res) => {
//       setupdatPic(updatPic + 1);
//       socket.emit("SendUpdatedProfile", profilename);
//       alert("All contact updated");
//     })
//     .catch((error) => {
//       console.log(error);
//     });
//   }

//   function UpdateUserInterfaec(){
//     axios
//     .post("http://localhost:4195/updateprofile:Image", {
//       username: profilename,
//     })
//     .then((res) => {
//       setlistContact(res.data.contact);
//       setbaseImage(res.data);
//     })
//     .then(() => {
//       setupdateChangeContactProfile([...updateChangeContactProfile, data]);
//     })
//     .catch((err) => console.log(err.message));
//   }
