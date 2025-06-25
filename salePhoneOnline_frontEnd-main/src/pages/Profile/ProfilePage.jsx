import React, { useEffect, useState } from "react";
import {
  WapperUploadFile,
  WappperLabel,
  WrapperContentProfile,
  WrapperHeader,
  WrapperInput,
} from "./style";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComopnent/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/UserServices";
import Loading from "../../components/LoadingComponent/Loading";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as message from "../../components/Messages/Message";
import { updateUser } from "../../redux/slices/userSlide";
import { Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getBase64 } from "../../utils";

const ProfilePage = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("");
// Đảm bảo trả về dữ liệu trong mutation
const mutation = useMutationHooks(async (data) => {
  const { id, access_token, ...rests } = data;
  try {
    const result = await UserService.updateUser(id, rests, access_token);
    return result; // Trả về dữ liệu kết quả từ API
  } catch (error) {
    console.error("Error in mutation:", error);
    throw error;
  }
});

  const { data, isPending, isSuccess, isError } = mutation;

  useEffect(() => {
    setEmail(user?.email);
    setName(user?.name);
    setPhone(user?.phone);
    setAddress(user?.address);
    setAvatar(user?.avatar);
  }, [user]);

  useEffect(() => {
    if (data?.status === 'OK') {
      message.success(data?.message);
      handleGetDetailsUser(user?.id, user?.access_token);
    } else if (data?.status === 'ERR') {
      message.error(data?.message);
    }
  }, [data]);
  console.log("data", data)

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  const handleOnchangeEmail = (value) => {
    setEmail(value);
  };
  const handleOnchangeName = (value) => {
    setName(value);
  };
  const handleOnchangePhone = (value) => {
    setPhone(value);
  };
  const handleOnchangeAddress = (value) => {
    setAddress(value);
  };
  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setAvatar(file.preview);
  };
  const handleUpdate = () => {
    mutation.mutate({
      id: user?.id,
      email,
      name,
      phone,
      address,
      avatar,
      access_token: user?.access_token,
    });
  };
  return (
    <div style={{ width: "1300px", margin: "0 auto", height: "500px" }}>
      <WrapperHeader>Thông tin người dùng</WrapperHeader>
      <Loading isPending={isPending}>
        <WrapperContentProfile>
          <WrapperInput>
            <div style={{ width: "50px", height: "fit-content" }}>
              <WappperLabel htmlFor="name">Tên: </WappperLabel>
            </div>
            <InputForm
              style={{ width: "300px" }}
              placeholder="Họ và tên"
              value={name}
              onChange={handleOnchangeName}
              id="name"
            />
          </WrapperInput>
          <WrapperInput>
            <div style={{ width: "50px", height: "fit-content" }}>
              <WappperLabel htmlFor="email">Email: </WappperLabel>
            </div>
            <InputForm
              style={{ width: "300px" }}
              placeholder="Email"
              value={email}
              onChange={handleOnchangeEmail}
              id="email"
              disabled />
          </WrapperInput>
          <WrapperInput>
            <div style={{ width: "50px", height: "fit-content" }}>
              <WappperLabel htmlFor="phone">Điện thoại: </WappperLabel>
            </div>
            <InputForm
              style={{ width: "300px" }}
              placeholder="Số điện thoại"
              value={`0${phone}`}
              onChange={handleOnchangePhone}
              id="phone"
            />
          </WrapperInput>
          <WrapperInput>
            <div style={{ width: "50px", height: "fit-content" }}>
              <WappperLabel htmlFor="address">Địa chỉ: </WappperLabel>
            </div>
            <InputForm
              style={{ width: "300px" }}
              placeholder="Địa chỉ"
              value={address}
              onChange={handleOnchangeAddress}
              id="address"
            />
          </WrapperInput>
          <WrapperInput>
            <div style={{ width: "50px", height: "fit-content" }}>
              <WappperLabel htmlFor="avatar">Ảnh đại diện: </WappperLabel>
            </div>
            <WapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
              <Button icon={<UploadOutlined />}>Select File</Button>
            </WapperUploadFile>
            {avatar && (
              <img
                src={avatar}
                style={{
                  height: "60px",
                  width: "60px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                alt="avatar"
              />
            )}
            <ButtonComponent
              onClick={handleUpdate}
              textButton="Cập nhật"
              type="primary"
              style={{
                width: "150px",
                height: "34px",
                background: "rgb(69, 136, 181)",
              }}
            />
          </WrapperInput>
        </WrapperContentProfile>
      </Loading>
    </div>
  );
};

export default ProfilePage;
