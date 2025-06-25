import { Button, ConfigProvider, Table } from "antd";
import React, { useRef } from "react";
import Loading from "../LoadingComponent/Loading";
import { CSVLink } from "react-csv";

const TableComponent = (props) => {
  const {
    selectionType = "none",
    data = [],
    isLoading = false,
    columns = [],
    headers = [],
    filename = "EXEL",
  } = props;

  const rowSelection =
    selectionType !== "none"
      ? {
          type: selectionType,
          onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRows}`);
          },
        }
      : undefined;

  return (
    <Loading isPending={isLoading}>
      {/* XuatFile */}
      {/* <div style={{ padding: "10px" }}>
        <Button type="primary">
          <CSVLink
            style={{ textDecoration: "none" }}
            filename={filename}
            headers={headers}
            data={data}
          >
            Xuất file
          </CSVLink>
        </Button>
      </div> */}
      <Table
        rowSelection={rowSelection} // rowSelection bị loại bỏ nếu selectionType là "none"
        columns={columns}
        dataSource={data}
        {...props}
      />
    </Loading>
  );
};

export default TableComponent;
