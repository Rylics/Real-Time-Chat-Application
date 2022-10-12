import { ChatOpen } from "../../app";
import { useContext } from "react";

export function LogOut() {
  const { settoken, setSelectUser, setprofilename } = useContext(ChatOpen);
  function Log() {
    settoken("");
    setSelectUser("");
    setprofilename("");
  }
  return (
    <>
      <p
        onClick={Log}
        style={{
          cursor: "pointer",
          textAlign: "right",
          color: "red",
          fontWeight: 900,
          marginRight: "20px",
        }}
      >
        LogOut
      </p>
    </>
  );
}
