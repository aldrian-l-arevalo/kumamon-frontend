import { Avatar } from "antd";

const UploadIcon = () => {
  const uploadImg = "/upload.svg";

  return (
    <Avatar
      style={{
        backgroundColor: "#E7E7E7",
        color: "#E7E7E7",
      }}
      size={75}
      icon={
        <img
          alt="upload"
          src={uploadImg}
          className="!h-[28px] !w-[23px] object-contain"
        />
      }
    />
  );
};

export default UploadIcon;
