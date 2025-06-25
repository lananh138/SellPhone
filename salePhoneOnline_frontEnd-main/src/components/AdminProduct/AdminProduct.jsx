import React, { useEffect, useRef, useState } from "react";
import { WrapperHeader } from "./style";
import {
  Button,
  Checkbox,
  Form,
  Image,
  Input,
  InputNumber,
  Select,
  Space,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
  PlusSquareTwoTone,
  SearchOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";
import { convertPrice, getBase64, renderOption } from "../../utils";
import { WapperUploadFile } from "./style";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as ProductService from "../../services/ProductServices";
import Loading from "../LoadingComponent/Loading";
import * as message from "../../components/Messages/Message";
import { useQuery } from "@tanstack/react-query";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { useSelector } from "react-redux";
import ModalComponent from "../ModalComponent/ModalComponent";
import InfoCard from "../InfoCard/InfoCard";

const AdminProduct = () => {
  const [isSpecEnabled, setIsSpecEnabled] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const { TextArea } = Input;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [rowSelected, setRowSelected] = useState("");

  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);

  const [typeSelect, setTypeSelect] = useState("");

  const inittial = () => ({
    name: "",
    image: "",
    type: "",
    price: "",
    countInStock: "",
    description: "",
    newType: "",
    screenSize: "",
    chipset: "",
    ram: "",
    storage: "",
    battery: "",
    screenResolution: "",
    isUpdating: false, // Thêm cờ xác định trạng thái
  });
  const [stateProduct, setStateProduct] = useState(inittial());

  const user = useSelector((state) => state?.user);

  const [stateProductDetails, setStateProductDetails] = useState(inittial());

  const [form] = Form.useForm();

  const mutation = useMutationHooks((data) => {
    const {
      name,
      image,
      type,
      price,
      countInStock,
      description,
      screenSize,
      chipset,
      ram,
      storage,
      battery,
      screenResolution,
    } = data;
    const res = ProductService.createProduct({
      name,
      image,
      type,
      price,
      countInStock,
      description,
      screenSize,
      chipset,
      ram,
      storage,
      battery,
      screenResolution,
    });
    return res;
  });
  const checkValueStateDetail =
    stateProductDetails?.screenSize ||
    stateProductDetails?.chipset ||
    stateProductDetails?.ram ||
    stateProductDetails?.storage ||
    stateProductDetails?.battery ||
    stateProductDetails?.screenResolution;
  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    const res = ProductService.updateProduct(id, token, { ...rests });
    return res;
  });

  const mutationDelete = useMutationHooks((data) => {
    const { id, token } = data;
    const res = ProductService.deleteProduct(id, token);
    return res;
  });

  const getAllProduct = async () => {
    const res = await ProductService.getAllProduct("", 1000);
    console.log(res);
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

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    return res;
  };

  const queryProduct = useQuery({
    queryKey: ["products"],
    queryFn: getAllProduct,
  });
  const typeProduct = useQuery({
    queryKey: ["type-product"],
    queryFn: fetchAllTypeProduct,
  });

  const { isPending: isLoadingProducts, data: products } = queryProduct;

  const dataTable = products?.data?.length
    ? products.data.map((product) => ({
        ...product,
        key: product._id,
        price: convertPrice(product.price),
      }))
    : [];

  useEffect(() => {
    if (data?.status === "OK") {
      message.success(data?.message);
      setIsModalOpen(false);
      handleCancel();
    } else if (data?.status === "ERR") {
      message.error(data?.message);
    }
  }, [data]);

  useEffect(() => {
    if (dataDeleted?.status === "OK") {
      message.success(dataDeleted?.message);
      handleCancelDelete();
    } else if (dataDeleted?.status === "ERR") {
      message.error(dataDeleted?.message);
    }
  }, [dataDeleted]);

  useEffect(() => {
    if (dataUpdated?.status === "OK") {
      message.success(dataUpdated?.message);
      handleCancelDrawer();
      setStateProduct({
        ...stateProductDetails,
        isUpdating: false,
      });
    } else if (dataUpdated?.status === "ERR") {
      message.error(dataUpdated?.message);
      setStateProduct({
        ...stateProductDetails,
        isUpdating: false,
      });
    }
  }, [dataUpdated]);

  const onFinish = () => {
    const params = {
      name: stateProduct?.name,
      image: stateProduct?.image,
      price: stateProduct?.price,
      countInStock: stateProduct?.countInStock,
      type:
        stateProduct?.type === "add_type"
          ? stateProduct.newType
          : stateProduct.type,
      description: stateProduct?.description,
      screenSize: stateProduct?.screenSize,
      chipset: stateProduct?.chipset,
      ram: stateProduct?.ram,
      storage: stateProduct?.storage,
      battery: stateProduct?.battery,
      screenResolution: stateProduct?.screenResolution,
    };
    console.log("params", params);

    if (stateProduct.isUpdating) {
      // Gọi API cập nhật
      mutationUpdate.mutate(
        { id: rowSelected, token: user?.access_token, ...params },
        {
          onSettled: () => {
            queryProduct.refetch();
          },
        }
      );
    } else {
      // Gọi API thêm mới
      mutation.mutate(params, {
        onSettled: () => {
          queryProduct.refetch();
        },
      });
    }
  };

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };
  const handleDeleteProduct = () => {
    mutationDelete.mutate(
      { id: rowSelected, token: user?.access_token },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
  };

  const handleCancel = () => {
    setStateProduct(inittial());
    setIsModalOpen(false);
  };
  const handleCancelDrawer = () => {
    setIsOpenDrawer(false);
    setStateProductDetails({
      name: "",
      image: "",
      type: "",
      price: "",
      countInStock: "",
      description: "",
      newType: "",
      screenSize: "",
      chipset: "",
      ram: "",
      storage: "",
      battery: "",
      screenResolution: "",
    });
    form.resetFields();
  };

  const handleOnchange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnchangeDetails = (e) => {
    setStateProductDetails({
      ...stateProductDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnchangeAvatar = async ({ fileList }) => {
    try {
      const imageUrls = [];
      for (let file of fileList) {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
        imageUrls.push(file.preview); // thêm URL của mỗi ảnh vào mảng
      }
      setStateProduct({
        ...stateProduct,
        image: imageUrls, // lưu mảng các URLs vào state
      });
    } catch (error) {
      console.error("Error converting file to base64: ", error);
    }
  };

  const handleOnchangeAvatarDetails = async ({ fileList }) => {
    try {
      const imageUrls = [];
      for (let file of fileList) {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
        imageUrls.push(file.preview); // thêm URL của mỗi ảnh vào mảng
      }
      setStateProductDetails({
        ...stateProductDetails,
        image: imageUrls, // lưu mảng các URLs vào state
      });
    } catch (error) {
      console.error("Error converting file to base64: ", error);
    }
  };

  const fetchDetailsProduct = async (rowSelected) => {
    if (rowSelected) {
      const res = await ProductService.getDetailsProduct(rowSelected);
      if (res?.data) {
        setStateProductDetails({
          name: res?.data?.name,
          image: res?.data?.image,
          type: res?.data?.type,
          price: res?.data?.price,
          countInStock: res?.data?.countInStock,
          description: res?.data?.description,
          screenSize: res?.data?.screenSize,
          chipset: res?.data?.chipset,
          ram: res?.data?.ram,
          storage: res?.data?.storage,
          battery: res?.data?.battery,
          screenResolution: res?.data?.screenResolution,
        });
      }
      setIsLoadingUpdate(false);
    }
  };

  useEffect(() => {
    if (!isModalOpen) {
      form.setFieldsValue(stateProductDetails);
    } else {
      form.setFieldsValue(inittial());
    }
  }, [form, stateProductDetails, isModalOpen]);

  useEffect(() => {
    if (rowSelected) {
      setIsLoadingUpdate(true);
      fetchDetailsProduct(rowSelected);
    }
  }, [rowSelected]);

  const handleDetailsProduct = () => {
    setStateProduct({
      ...stateProductDetails,
      isUpdating: true, // Chuyển sang trạng thái cập nhật
    });
    setIsOpenDrawer(true);
    fetchDetailsProduct(rowSelected);
  };
  const headers = [
    { label: "Id products", key: "key" },
    { label: "Name products", key: "name" },
    { label: "Price", key: "price" },
    { label: "Type", key: "type" },
    { label: "countInStock", key: "countInStock" },
    { label: "selled", key: "selled" },
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
          onClick={handleDetailsProduct}
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
      title: "Mã sản phẩm",
      dataIndex: "key",
      ...getColumnSearchProps("key"),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Giá",
      dataIndex: "price",
      sorter: (a, b) => parseFloat(a.price) - parseFloat(b.price),
      render: (text, record) => {
        const color = "red";
        return <span style={{ color: color }}>{text}</span>;
      },
    },
    {
      title: "Thể loại",
      dataIndex: "type",
      ...getColumnSearchProps("type"),
    },
    {
      title: "Tồn kho",
      dataIndex: "countInStock",
      sorter: (a, b) => a.countInStock - b.countInStock, // So sánh theo số
      width: 100,
    },
    {
      title: "Đã bán",
      dataIndex: "selled",
      sorter: (a, b) => a.selled - b.selled, // So sánh theo số
      width: 100,
    },
    {
      title: "Hành động",
      dataIndex: "action",
      render: renderAction,
    },
  ];
  const onUpdateProduct = () => {
    mutationUpdate.mutate(
      { id: rowSelected, token: user?.access_token, ...stateProductDetails },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
  };

  const handleChangeSelect = (value) => {
    setStateProduct({
      ...stateProduct,
      type: value,
    });
  };

  return (
    <div>
      <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
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
          title={() => (
            <div
              style={{
                fontSize: "18px",
                color: "rgb(77 164 210)",
                fontWeight: "bold",
              }}
            >
              Tổng số lượng sản phẩm: {products?.data.length}
            </div>
          )}
          filename={"Products"}
          headers={headers}
          columns={columns}
          isLoading={isLoadingProducts}
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
      <ModalComponent
        forceRender
        title="Tạo sản phẩm"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={700}
      >
        <Loading isPending={isLoadingProducts}>
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
              paddingTop: "20px",
            }}
            onFinish={onFinish}
            autoComplete="off"
            form={form}
          >
            <Form.Item
              label="Tên sản phẩm"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng không bỏ trống!",
                },
              ]}
            >
              <InputComponent
                value={stateProduct.name}
                onChange={handleOnchange}
                name="name"
              />
            </Form.Item>

            <Form.Item
              label="Hãng:"
              name="type"
              tooltip="nếu không có hãng bạn muốn, hãy thêm hãng mới"
              rules={[
                {
                  required: true,
                  message: "Vui lòng không bỏ trống!",
                },
              ]}
            >
              <Select
                name="type"
                value={stateProduct.type}
                onChange={handleChangeSelect}
                options={renderOption(typeProduct?.data?.data)}
              />
            </Form.Item>
            {stateProduct.type === "add_type" && (
              <Form.Item
                label="Hãng mới:"
                name="newType"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng không bỏ trống!",
                  },
                ]}
              >
                <div style={{ padding: "10px" }}>
                  <InputComponent
                    value={stateProduct.newType}
                    onChange={handleOnchange}
                    name="newType"
                  />
                </div>
              </Form.Item>
            )}

            <Form.Item
              label="Số lượng tồn kho:"
              name="countInStock"
              rules={[
                {
                  required: true,
                  message: "Vui lòng không bỏ trống!",
                },
              ]}
            >
              <InputComponent
                value={stateProduct.countInStock}
                onChange={handleOnchange}
                name="countInStock"
              />
            </Form.Item>
            <Form.Item
              label="Giá:"
              name="price"
              rules={[
                {
                  required: true,
                  message: "Vui lòng không bỏ trống!",
                },
              ]}
            >
              <InputComponent
                value={stateProduct.price}
                onChange={handleOnchange}
                name="price"
              />
            </Form.Item>
            <Form.Item
              label="Mô tả:"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Vui lòng không bỏ trống!",
                },
              ]}
            >
              <TextArea
                showCount
                maxLength={1500}
                value={stateProduct.description}
                onChange={handleOnchange}
                name="description"
              />
            </Form.Item>
            <Form.Item
              label="Hình ảnh:"
              tooltip="chọn tối đa 5 ảnh"
              name="image"
              rules={[
                {
                  required: false,
                  message: "Vui lòng không bỏ trống!",
                },
              ]}
            >
              <WapperUploadFile
                onChange={handleOnchangeAvatar}
                maxCount={5}
                multiple
              >
                {" "}
                {/* Bạn có thể cho phép tối đa 5 ảnh */}
                <Button icon={<UploadOutlined />}>Select Files</Button>
              </WapperUploadFile>
              {stateProduct?.image && stateProduct.image.length > 0 && (
                <div
                  style={{ display: "flex", gap: "10px", marginTop: "10px" }}
                >
                  {stateProduct.image.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      style={{
                        height: "60px",
                        width: "60px",
                        borderRadius: "10%",
                        objectFit: "cover",
                      }}
                      alt={`avatar-${index}`}
                    />
                  ))}
                </div>
              )}
            </Form.Item>
            <Checkbox
              checked={isSpecEnabled}
              onChange={(e) => setIsSpecEnabled(e.target.checked)}
            >
              Thêm thông số kỹ thuật
            </Checkbox>
            {isSpecEnabled && (
              <div>
                <h4>Thông số kỹ thuật:</h4>
                <Form.Item label="Kích thước màn hình:" name="screenSize">
                  <InputComponent
                    value={stateProduct?.screenSize}
                    onChange={handleOnchange}
                    name="screenSize"
                  />
                </Form.Item>
                <Form.Item label="Chipset:" name="chipset">
                  <InputComponent
                    value={stateProduct?.chipset}
                    onChange={handleOnchange}
                    name="chipset"
                  />
                </Form.Item>
                <Form.Item label="Dung lượng RAM:" name="ram">
                  <InputComponent
                    value={stateProduct?.ram}
                    onChange={handleOnchange}
                    name="ram"
                  />
                </Form.Item>
                <Form.Item label="Bộ nhớ trong:" name="storage">
                  <InputComponent
                    value={stateProduct?.storage}
                    onChange={handleOnchange}
                    name="storage"
                  />
                </Form.Item>

                <Form.Item label="Pin:" name="battery">
                  <InputComponent
                    value={stateProduct?.battery}
                    onChange={handleOnchange}
                    name="battery"
                  />
                </Form.Item>
                <Form.Item
                  label="Độ phân giải màn hình:"
                  name="screenResolution"
                >
                  <InputComponent
                    value={stateProduct?.screenResolution}
                    onChange={handleOnchange}
                    name="screenResolution"
                  />
                </Form.Item>
              </div>
            )}

            <Form.Item
              wrapperCol={{
                offset: 19,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Thêm sản phẩm
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </ModalComponent>
      <DrawerComponent
        title={<span style={{ paddingBottom: "20px" }}>Chi tiết sản phẩm</span>} // Thêm padding cho tiêu đề
        isOpen={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
        width="50%"
      >
        <Loading isPending={isLoadingUpdate || isLoadingUpdated}>
          <Form
            name="basic"
            labelCol={{
              span: 6, // Điều chỉnh labelCol và wrapperCol như ModalComponent
            }}
            wrapperCol={{
              span: 18,
            }}
            style={{
              maxWidth: 600,
              paddingTop: "20px", // Thêm khoảng cách phía trên form như Modal
            }}
            onFinish={onUpdateProduct}
            autoComplete="off"
            form={form}
          >
            <Form.Item
              label="Tên sản phẩm:"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng không bỏ trống!",
                },
              ]}
            >
              <InputComponent
                value={stateProductDetails.name}
                onChange={handleOnchangeDetails}
                name="name"
              />
            </Form.Item>

            <Form.Item
              label="Loại sản phẩm:"
              name="type"
              rules={[
                {
                  required: true,
                  message: "Vui lòng không bỏ trống!",
                },
              ]}
            >
              <InputComponent
                value={stateProductDetails.type}
                onChange={handleOnchangeDetails}
                name="type"
              />
            </Form.Item>

            <Form.Item
              label="Số lượng còn lại:"
              name="countInStock"
              rules={[
                {
                  required: true,
                  message: "Vui lòng không bỏ trống!",
                },
              ]}
            >
              <InputComponent
                value={stateProductDetails.countInStock}
                onChange={handleOnchangeDetails}
                name="countInStock"
              />
            </Form.Item>

            <Form.Item
              label="Giá:"
              name="price"
              rules={[
                {
                  required: true,
                  message: "Vui lòng không bỏ trống!",
                },
              ]}
            >
              <InputComponent
                value={stateProductDetails.price}
                onChange={handleOnchangeDetails}
                name="price"
              />
            </Form.Item>

            <Form.Item
              label="Mô tả:"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Vui lòng không bỏ trống!",
                },
              ]}
            >
              <TextArea
                showCount
                maxLength={1500}
                value={stateProductDetails.description}
                onChange={handleOnchangeDetails}
                name="description"
              />
            </Form.Item>
            <Form.Item
              label="Hình ảnh:"
              name="image"
              rules={[
                {
                  required: false,
                  message: "Vui lòng không bỏ trống!",
                },
              ]}
            >
              <WapperUploadFile
                onChange={handleOnchangeAvatarDetails}
                maxCount={5}
              >
                <Button icon={<UploadOutlined />}>Select Files</Button>
              </WapperUploadFile>
              {stateProductDetails?.image &&
                stateProductDetails.image.length > 0 && (
                  <div
                    style={{ display: "flex", gap: "10px", marginTop: "10px" }}
                  >
                    {stateProductDetails.image.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        style={{
                          height: "60px",
                          width: "60px",
                          borderRadius: "10%",
                          objectFit: "cover",
                        }}
                        alt={`avatar-${index}`}
                      />
                    ))}
                  </div>
                )}
            </Form.Item>
            {checkValueStateDetail && (
              <div>
                <h4>Thông số kỹ thuật:</h4>
                <Form.Item label="Kích thước màn hình:" name="screenSize">
                  <InputComponent
                    value={stateProductDetails?.screenSize}
                    onChange={handleOnchangeDetails}
                    name="screenSize"
                  />
                </Form.Item>
                <Form.Item label="Chipset:" name="chipset">
                  <InputComponent
                    value={stateProductDetails?.chipset}
                    onChange={handleOnchangeDetails}
                    name="chipset"
                  />
                </Form.Item>
                <Form.Item label="Dung lượng RAM:" name="ram">
                  <InputComponent
                    value={stateProductDetails?.ram}
                    onChange={handleOnchangeDetails}
                    name="ram"
                  />
                </Form.Item>
                <Form.Item label="Bộ nhớ trong:" name="storage">
                  <InputComponent
                    value={stateProductDetails?.storage}
                    onChange={handleOnchangeDetails}
                    name="storage"
                  />
                </Form.Item>

                <Form.Item label="Pin:" name="battery">
                  <InputComponent
                    value={stateProductDetails?.battery}
                    onChange={handleOnchangeDetails}
                    name="battery"
                  />
                </Form.Item>
                <Form.Item
                  label="Độ phân giải màn hình:"
                  name="screenResolution"
                >
                  <InputComponent
                    value={stateProductDetails?.screenResolution}
                    onChange={handleOnchangeDetails}
                    name="screenResolution"
                  />
                </Form.Item>
              </div>
            )}
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
        title="Xóa sản phẩm"
        open={isModalOpenDelete}
        onCancel={handleCancelDelete}
        onOk={handleDeleteProduct}
      >
        <Loading isPending={isLoadingDeleted}>
          <div>Bạn có chắc xóa sản phẩm này không?</div>
        </Loading>
      </ModalComponent>
    </div>
  );
};

export default AdminProduct;
