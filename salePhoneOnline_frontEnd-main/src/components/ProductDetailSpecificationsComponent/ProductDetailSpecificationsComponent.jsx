import React, { useState } from "react";
import { Modal, Button } from "antd";
import {
  Container,
  Title,
  Table,
  TableRow,
  TableCell,
  ButtonContainer,
  DetailButton,
} from "./style";

const ProductDetailSpecificationsComponent = ({
  screenSize,
  chipset,
  ram,
  storage,
  battery,
  screenResolution,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  // Nội dung hiển thị trong Modal
  const detailContent = (
    <div style={{ maxWidth: "500px" }}>
      <Title style={{ fontWeight: "bold" }}>Thông số kỹ thuật</Title>
      <Table>
        <tbody>
          <TableRow>
            <TableCell>Kích thước màn hình</TableCell>
            <TableCell>{screenSize || " "}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Công nghệ màn hình</TableCell>
            <TableCell>{""}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Độ phân giải màn hình</TableCell>
            <TableCell>{screenResolution || ""}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tính năng màn hình</TableCell>
            <TableCell>{""}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Camera sau</TableCell>
            <TableCell>{""}</TableCell>
          </TableRow>
        </tbody>
      </Table>
    </div>
  );

  // Hàm mở Modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Hàm đóng Modal
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Container>
      <Title style={{ fontWeight: "bold" }}>Thông số kỹ thuật</Title>
      <Table>
        <tbody>
          <TableRow>
            <TableCell>Kích thước màn hình</TableCell>
            <TableCell>{screenSize || " "}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Chipset</TableCell>
            <TableCell>{chipset || ""}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Dung lượng RAM</TableCell>
            <TableCell>{ram || ""}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Bộ nhớ trong</TableCell>
            <TableCell>{storage || ""}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Pin</TableCell>
            <TableCell>{battery || ""}</TableCell>
          </TableRow>
        </tbody>
      </Table>

      <ButtonContainer>
        <DetailButton onClick={showModal}>Xem cấu hình chi tiết</DetailButton>
      </ButtonContainer>

      {/* Modal hiển thị chi tiết thông số kỹ thuật */}
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        centered // Căn giữa modal
        footer={null} // Không có footer, nếu cần bạn có thể thêm các nút khác
        width={600} // Cài đặt chiều rộng của Modal
        bodyStyle={{
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        {detailContent}
      </Modal>
    </Container>
  );
};

export default ProductDetailSpecificationsComponent;
