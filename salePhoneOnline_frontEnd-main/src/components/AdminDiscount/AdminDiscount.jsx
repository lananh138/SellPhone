import React, { useEffect, useRef, useState } from "react";
import { WrapperHeader } from "./style";
import { Button, Form, Space } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusSquareTwoTone,
  SearchOutlined,
} from "@ant-design/icons";
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../LoadingComponent/Loading";
import * as message from "../../components/Messages/Message";
import { useQuery } from "@tanstack/react-query";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { useSelector } from "react-redux";
import ModalComponent from "../ModalComponent/ModalComponent";
import * as DiscountService from "../../services/DiscountServices";
import { convertDateISO } from "../../utils";

const AdminDiscount = () => {
  const searchInput = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [rowSelected, setRowSelected] = useState("");

  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);

  const inittial = () => ({
    code: "",
    discountPercentage: "",
    maxUses: "",
  });

  const [stateDiscount, setStateDiscount] = useState(inittial());

  const user = useSelector((state) => state?.user);

  const [stateDiscountDetails, setStateDiscountDetails] = useState(inittial());

  const [form] = Form.useForm();

  const mutation = useMutationHooks((data) => {
    const { code, discountPercentage, maxUses } = data;
    const res = DiscountService.createDiscount({
      code,
      discountPercentage,
      maxUses,
    });
    return res;
  });

  const mutationUpdate = useMutationHooks((data) => {
    const { code, token, ...rests } = data;
    const res = DiscountService.updateDiscount(code, token, { ...rests });
    return res;
  });

  const mutationDelete = useMutationHooks((data) => {
    const { code, token } = data;
    const res = DiscountService.deleteDiscount(code, token);
    return res;
  });

  const getAllDiscount = async () => {
    const res = await DiscountService.getAllDiscount();
    return res;
  };

  const { data, isPending, isSuccess, isError } = mutation;
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

  const queryDiscount = useQuery({
    queryKey: ["discounts"],
    queryFn: getAllDiscount,
  });

  const { isPending: isLoadingDiscount, data: discounts } = queryDiscount;
  const dataTable = discounts?.data?.length
    ? discounts.data.map((discount) => ({
        ...discount,
        key: discount._id,
        code: discount.code,
        usedCount: discount.usedCount,
        createdAt: convertDateISO(discount.createdAt),
        updatedAt: convertDateISO(discount.updatedAt),
      }))
    : [];
  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      message.success(data?.message);
      setIsModalOpen(false);
      handleCancel();
    } else if (data?.status === "ERR") {
      message.error(data?.message);
    }
  }, [isSuccess]);

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

  const onFinish = () => {
    const params = {
      code: stateDiscount?.code,
      discountPercentage: stateDiscount?.discountPercentage,
      maxUses: stateDiscount?.maxUses,
    };
    mutation.mutate(params, {
      onSettled: () => {
        queryDiscount.refetch();
      },
    });
  };

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };

  const handleDeleteDiscount = () => {
    mutationDelete.mutate(
      { code: rowSelected, token: user?.access_token },
      {
        onSettled: () => {
          queryDiscount.refetch();
        },
      }
    );
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setStateDiscount({
      code: "",
      discountPercentage: "",
      maxUses: "",
    });
    form.resetFields();
  };

  const handleCancelDrawer = () => {
    setIsOpenDrawer(false);
    setStateDiscountDetails({
      code: "",
      discountPercentage: "",
      maxUses: "",
    });
    form.resetFields();
  };

  const handleOnchange = (e) => {
    setStateDiscount({
      ...stateDiscount,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnchangeDetails = (e) => {
    setStateDiscountDetails({
      ...stateDiscountDetails,
      [e.target.name]: e.target.value,
    });
  };

  const fetchDetailsDiscount = async (rowSelected) => {
    if (rowSelected) {
      const res = await DiscountService.getDetailDiscount(rowSelected);
      if (res?.data) {
        setStateDiscountDetails({
          code: res?.data?.code,
          discountPercentage: res?.data?.discountPercentage,
          maxUses: res?.data?.maxUses,
        });
      }
      setIsLoadingUpdate(false);
    }
  };

  useEffect(() => {
    if (!isModalOpen) {
      form.setFieldsValue(stateDiscountDetails);
    } else {
      form.setFieldsValue(inittial());
    }
  }, [form, stateDiscountDetails, isModalOpen]);

  useEffect(() => {
    if (rowSelected) {
      setIsLoadingUpdate(true);
      fetchDetailsDiscount(rowSelected);
    }
  }, [rowSelected]);

  const handleDetailsDiscount = () => {
    setIsOpenDrawer(true);
  };
  const headers = [
    { label: "Code Discount", key: "code" },
    { label: "Percentage", key: "discountPercentage" },
    { label: "maxUses", key: "maxUses" },
    { label: "usedCount", key: "usedCount" },
    { label: "createdAt", key: "createdAt" },
    { label: "updatedAt", key: "updatedAt" },
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
          onClick={handleDetailsDiscount}
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
      title: "Mã Giảm Giá",
      dataIndex: "code",
      sorter: (a, b) => a.code.length - b.code.length,
      ...getColumnSearchProps("code"),
    },
    {
      title: "Phần Trăm Giảm",
      dataIndex: "discountPercentage",
      sorter: (a, b) =>
        parseFloat(a.discountPercentage) - parseFloat(b.discountPercentage),
    },
    {
      title: "Số lần sử dụng",
      dataIndex: "maxUses",
      sorter: (a, b) => a.maxUses - b.maxUses,
    },
    {
      title: "Đã dùng",
      dataIndex: "usedCount",
      sorter: (a, b) => a.usedCount - b.usedCount,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      sorter: (a, b) => a.createdAt - b.createdAt,
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updatedAt",
      sorter: (a, b) => a.updatedAt - b.updatedAt,
    },
    {
      title: "Hành động",
      dataIndex: "action",
      render: renderAction,
    },
  ];
  const onUpdateDiscount = () => {
    mutationUpdate.mutate(
      { code: rowSelected, token: user?.access_token, ...stateDiscountDetails },
      {
        onSettled: () => {
          queryDiscount.refetch();
        },
      }
    );
  };

  const handleChangeSelect = (value) => {
    setStateDiscount({
      ...stateDiscount,
      type: value,
    });
  };

  return (
    <div>
      <WrapperHeader>Quản lý Mã Giảm Giá</WrapperHeader>
      <div style={{ marginTop: "10px" }}>
        <Button
          style={{
            height: "150px",
            width: "150px",
            borderRadius: "6px",
            borderStyle: "dashed",
          }}
          onClick={() => setIsModalOpen(true)}
        >
          <PlusSquareTwoTone style={{ fontSize: "70px" }} />
        </Button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <TableComponent
          filename={"Discount"}
          headers={headers}
          columns={columns}
          isLoading={isLoadingDiscount}
          data={dataTable}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setRowSelected(record.code);
              },
            };
          }}
        />
      </div>
      <ModalComponent
        forceRender
        title="Tạo mã giảm giá"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Loading isPending={isLoadingDiscount}>
          <Form
            name="basic"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 18,
            }}
            style={{
              maxWidth: 600,
            }}
            onFinish={onFinish}
            autoComplete="off"
            form={form}
          >
            <Form.Item
              label="Mã"
              name="code"
              rules={[
                {
                  required: true,
                  message: "Please input name code!",
                },
              ]}
            >
              <InputComponent
                value={stateDiscount.code}
                onChange={handleOnchange}
                name="code"
              />
            </Form.Item>
            <Form.Item
              label="Phần Trăm"
              name="discountPercentage"
              rules={[
                {
                  required: true,
                  message: "Please input discountPercentage!",
                },
              ]}
            >
              <InputComponent
                value={stateDiscount.discountPercentage}
                onChange={handleOnchange}
                name="discountPercentage"
              />
            </Form.Item>
            <Form.Item
              label="Số lần sử dụng"
              name="maxUses"
              rules={[
                {
                  required: true,
                  message: "Please input maxUses!",
                },
              ]}
            >
              <InputComponent
                value={stateDiscount.maxUses}
                onChange={handleOnchange}
                name="maxUses"
              />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 20,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </ModalComponent>
      <DrawerComponent
  title={<span style={{ paddingBottom: '20px' }}>Chi tiết mã giảm giá</span>}  // Thêm padding cho tiêu đề
  isOpen={isOpenDrawer}
  onClose={() => setIsOpenDrawer(false)}
  width="50%"
>
  <Loading isPending={isLoadingUpdate || isLoadingUpdated}>
    <Form
      name="basic"
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 18,
      }}
      style={{
        maxWidth: 600,
        paddingTop: '20px',
      }}
      onFinish={onUpdateDiscount}
      autoComplete="off"
      form={form}
    >
      <Form.Item
        label="Mã"
        name="code"
        rules={[
          {
            required: true,
            message: "Please input name code!",
          },
        ]}
      >
        <InputComponent
          value={stateDiscount.code}
          onChange={handleOnchangeDetails}
          name="code"
          disabled
        />
      </Form.Item>

      <Form.Item
        label="Phần Trăm"
        name="discountPercentage"
        rules={[
          {
            required: true,
            message: "Please input discountPercentage!",
          },
        ]}
      >
        <InputComponent
          value={stateDiscount.discountPercentage}
          onChange={handleOnchangeDetails}
          name="discountPercentage"
        />
      </Form.Item>

      <Form.Item
        label="Số lần sử dụng"
        name="maxUses"
        rules={[
          {
            required: true,
            message: "Please input maxUses!",
          },
        ]}
      >
        <InputComponent
          value={stateDiscount.maxUses}
          onChange={handleOnchangeDetails}
          name="maxUses"
        />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 20,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Xác nhận
        </Button>
      </Form.Item>
    </Form>
  </Loading>
</DrawerComponent>


      <ModalComponent
        forceRender
        title="Xóa mã giảm giá?"
        open={isModalOpenDelete}
        onCancel={handleCancelDelete}
        onOk={handleDeleteDiscount}
      >
        <Loading isPending={isLoadingDeleted}>
          <div>Bạn có chắc xóa mã giảm giá này không?</div>
        </Loading>
      </ModalComponent>
    </div>
  );
};

export default AdminDiscount;
