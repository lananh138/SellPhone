import React, { useEffect, useRef, useState } from "react";
import { WapperUploadFile, WrapperHeader } from "./style";
import { Button, Form, Space } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import Loading from "../LoadingComponent/Loading";
import ModalComponent from "../ModalComponent/ModalComponent";
import { useSelector } from "react-redux";
import { useMutationHooks } from "../../hooks/useMutationHook";
import { useQuery } from "@tanstack/react-query";
import * as message from "../../components/Messages/Message";
import { getBase64 } from "../../utils";
import * as UserService from "../../services/UserServices";
import { themeConstant } from "../../pages/AdminPage/AdminPage";

const AdminUser = ({ theme, setTheme }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [rowSelected, setRowSelected] = useState("");

  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);

  const user = useSelector((state) => state?.user);

  const [stateUserDetails, setStateUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    isAdmin: false,
    createdAt: "",
    avatar: "",
    address: "",
    role: "",
  });

  const [form] = Form.useForm();

  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    const res = UserService.updateUser(id, { ...rests }, token);
    return res;
  });

  const mutationDelete = useMutationHooks((data) => {
    const { id, token } = data;
    const res = UserService.deleteUser(id, token);
    return res;
  });

  const getAllUser = async () => {
    const token = user?.access_token;
    const res = await UserService.getAllUser(token);
    return res;
  };

  const {
    data: dataUpdated,
    isPending: isLoadingUpdated,
    isSuccess: isSuccessUpdated,
    isError: isErrorUpdated,
  } = mutationUpdate;
  const {
    data: dataDeleted,
    isPending: isLoadingDeleted,
    isSuccess: isSuccessDeleted,
    isError: isErrorDeleted,
  } = mutationDelete;

  const queryUser = useQuery({ queryKey: ["user"], queryFn: getAllUser });
  const { isPending: isLoadingUsers, data: users } = queryUser;

  const dataTable = users?.data?.length
    ? users.data.map((user) => ({
        ...user,
        key: user._id,
        isAdmin: user.isAdmin ? "TRUE" : "FALSE",
      }))
    : [];

  useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status === "OK") {
      message.success(dataDeleted?.message);
      handleCancelDelete();
    } else if (dataDeleted?.status === "ERR") {
      message.error(dataDeleted?.message);
    }
  }, [isSuccessDeleted]);

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === "OK") {
      message.success(dataUpdated?.message);
      handleCancelDrawer();
    } else if (dataUpdated?.status === "ERR") {
      message.error(dataUpdated?.message);
    }
  }, [isSuccessUpdated]);

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };
  const handleDeleteUser = () => {
    mutationDelete.mutate(
      { id: rowSelected, token: user?.access_token },
      {
        onSettled: () => {
          queryUser.refetch();
        },
      }
    );
  };

  const handleCancelDrawer = () => {
    setIsOpenDrawer(false);
    setStateUserDetails({
      name: "",
      email: "",
      phone: "",
      isAdmin: false,
      createdAt: "",
      avatar: "",
      address: "",
      role: "",
    });
    form.resetFields();
  };

  const handleOnchangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnchangeAvatarDetails = async ({ fileList }) => {
    const file = fileList[0];
    try {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      setStateUserDetails({
        ...stateUserDetails,
        avatar: file.preview,
      });
    } catch (error) {
      console.error("Error converting file to base64: ", error);
    }
  };

  const fetchDetailsUSer = async (rowSelected) => {
    if (rowSelected) {
      const token = user?.access_token;
      const res = await UserService.getDetailsUser(rowSelected, token);
      if (res?.data) {
        setStateUserDetails({
          name: res?.data?.name,
          email: res?.data?.email,
          isAdmin: res?.data?.isAdmin,
          address: res?.data?.address,
          phone: res?.data?.phone,
          avatar: res?.data?.avatar,
          city: res?.data?.city,
          role: res.data?.role,
        });
      }
      setIsLoadingUpdate(false);
    }
  };

  useEffect(() => {
    form.setFieldsValue(stateUserDetails);
  }, [form, stateUserDetails]);

  useEffect(() => {
    if (rowSelected) {
      setIsLoadingUpdate(true);
      fetchDetailsUSer(rowSelected);
    }
  }, [rowSelected]);

  const handleDetailsUser = () => {
    setIsOpenDrawer(true);
  };
  const headers = [
    { label: "Tên Người dùng", key: "name" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
  ];

  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined
          style={{ color: "red", fontSize: "25px", cursor: "pointer" }}
          onClick={() => setIsModalOpenDelete(true)}
        />
        <EditOutlined
          style={{ color: "#4588B5", fontSize: "25px", cursor: "pointer" }}
          onClick={handleDetailsUser}
        />
      </div>
    );
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    // render: (text) =>
    //   searchedColumn === dataIndex ? (
    //     <Highlighter
    //       highlightStyle={{
    //         backgroundColor: '#ffc069',
    //         padding: 0,
    //       }}
    //       searchWords={[searchText]}
    //       autoEscape
    //       textToHighlight={text ? text.toString() : ''}
    //     />
    //   ) : (
    //     text
    //   ),
  });

  const columns = [
    {
      title: "Tên người dùng",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.length - b.email.length,
      ...getColumnSearchProps("email"),
    },
    {
      title: "Admin",
      dataIndex: "isAdmin",
      ...getColumnSearchProps("isAdmin"),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      sorter: (a, b) => a.phone - b.phone,
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      sorter: (a, b) => a.address - b.address,
      ...getColumnSearchProps("address"),
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      sorter: (a, b) => a.role.length - b.role.length,
    },
    {
      title: "Hành động",
      dataIndex: "action",
      render: renderAction,
    },
  ];
  const onUpdateUser = () => {
    mutationUpdate.mutate(
      { id: rowSelected, token: user?.access_token, ...stateUserDetails },
      {
        onSettled: () => {
          queryUser.refetch();
        },
      }
    );
  };
  // background: themeConstant[theme].background,
  return (
    <div>
      <WrapperHeader style={{ color: themeConstant[theme].color }}>
        {" "}
        Quản lý người dùng{" "}
      </WrapperHeader>
      <div style={{ marginTop: "30px" }}>
        <TableComponent
          title={() => (
            <div
              style={{
                fontSize: "18px",
                color: "rgb(77 164 210)",
                fontWeight: "bold",
              }}
            >
              Tổng số lượng tài khoản: {users?.data.length}
            </div>
          )}
          borderColor={"red"}
          filename={"User"}
          headers={headers}
          columns={columns}
          isLoading={isLoadingUsers}
          data={dataTable}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setRowSelected(record._id);
              },
            };
          }}
        />
      </div>
      <DrawerComponent
        title={
          <span style={{ paddingBottom: "20px" }}>Chi tiết người dùng</span>
        } // Thêm padding cho tiêu đề
        isOpen={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
        width="50%"
      >
        <Loading isPending={isLoadingUpdate || isLoadingUpdated}>
          <Form
            name="basic"
            labelCol={{
              span: 6, // Điều chỉnh labelCol và wrapperCol để căn chỉnh form hợp lý
            }}
            wrapperCol={{
              span: 18,
            }}
            style={{
              maxWidth: 600,
              paddingTop: "20px", // Thêm khoảng cách phía trên form để không bị dính vào tiêu đề
            }}
            onFinish={onUpdateUser}
            autoComplete="off"
            form={form}
          >
            <Form.Item
              label="Họ và tên"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input name user!",
                },
              ]}
            >
              <InputComponent
                value={stateUserDetails.name}
                onChange={handleOnchangeDetails}
                name="name"
              />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input Email!",
                },
              ]}
            >
              <InputComponent
                value={stateUserDetails.email}
                onChange={handleOnchangeDetails}
                name="email"
              />
            </Form.Item>

            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <InputComponent
                value={stateUserDetails.phone}
                onChange={handleOnchangeDetails}
                name="phone"
              />
            </Form.Item>

            <Form.Item
              label="Địa chỉ"
              name="address"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <InputComponent
                value={stateUserDetails.address}
                onChange={handleOnchangeDetails}
                name="address"
              />
            </Form.Item>

            <Form.Item
              label="Vai trò"
              name="role"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <InputComponent
                value={stateUserDetails.role}
                onChange={handleOnchangeDetails}
                name="role"
              />
            </Form.Item>

            <Form.Item
              label="IsAdmin"
              name="isAdmin"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <InputComponent
                value={stateUserDetails.isAdmin}
                onChange={handleOnchangeDetails}
                name="isAdmin"
              />
            </Form.Item>

            <Form.Item
              label="Ảnh đại diện"
              name="avatar"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <WapperUploadFile
                onChange={handleOnchangeAvatarDetails}
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Select File</Button>
              </WapperUploadFile>
              {stateUserDetails?.avatar && (
                <img
                  src={stateUserDetails?.avatar}
                  style={{
                    height: "60px",
                    width: "60px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginLeft: "10px",
                    display: "flex",
                  }}
                  alt="avatar"
                />
              )}
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 20,
                span: 16,
              }}
            >
              <div>
                {dataUpdated?.status === "ERR" && (
                  <span style={{ color: "red" }}>{dataUpdated?.message}</span>
                )}
              </div>

              <Button type="primary" htmlType="submit">
                Xác nhận
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </DrawerComponent>

      <ModalComponent
        forceRender
        title="Xóa Người dùng"
        open={isModalOpenDelete}
        onCancel={handleCancelDelete}
        onOk={handleDeleteUser}
      >
        <Loading isPending={isLoadingDeleted}>
          <div>Bạn có muốn xóa người dùng này không</div>
        </Loading>
      </ModalComponent>
    </div>
  );
};

export default AdminUser;
