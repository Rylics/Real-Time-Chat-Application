import { useContext } from "react";
import { ChatOpen } from "../../app";

export default function ConvertImage() {
  const { baseImage } = useContext(ChatOpen);
  const base64string = btoa(
    new Uint8Array(baseImage?.profileImage?.data.data).reduce(function (
      data,
      byte
    ) {
      return data + String.fromCharCode(byte);
    },
    "")
  );

  return base64string;
}

export function Base64string(index) {
  const { baseImage } = useContext(ChatOpen);
  const base64string = btoa(
    new Uint8Array(baseImage?.contact[index]?.profileImage?.data.data).reduce(
      function (data, byte) {
        return data + String.fromCharCode(byte);
      },
      ""
    )
  );
  return base64string;
}
