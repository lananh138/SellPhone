import { SearchOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";
import ButtonComponent from "../ButtonComopnent/ButtonComponent";

const ButtonInputSearch = (props) => {
  const { size, placeholder, textButton } = props;

  return (
    <Space.Compact style={{ display: "flex", width: "100%" }}>
      <Input
        size={size}
        placeholder={placeholder}
        style={{ flex: 1 }}
        {...props}
      />
      <ButtonComponent
        style={{
          background: "rgb(36 112 164)",
          color: "#fff",
          border: "none",
        }}
        size={size}
        icon={<SearchOutlined />}
        type="primary"
        textButton={textButton}
      />
    </Space.Compact>
  );
};

export default ButtonInputSearch;
