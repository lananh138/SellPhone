import React, { useEffect, useState } from "react";
import { WrapperHeader } from "./style";
import TableComponent from "../TableComponent/TableComponent";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import * as OrderService from "../../services/OrderServices";
import { orderContant } from "../../contant";
import { useMutationHooks } from "../../hooks/useMutationHook";
import { Card, Dropdown, Flex, Menu } from "antd";
import BarChartComponent from "./BarChartComponent";
import { convertPrice, convertPriceDataChart } from "../../utils";
import InfoCard from "../InfoCard/InfoCard";

const AdminOrder = () => {
  const [rowSelected, setRowSelected] = useState("");
  const [dataTable, setDataTable] = useState([]);
  const user = useSelector((state) => state?.user);

  //tong doanh thu
  const totalRevenue = async () => {
    const res = await OrderService.totalRevenue(user?.access_token);
    return res;
  };
  const queryRevenue = useQuery({
    queryKey: ["totalRevenue"],
    queryFn: totalRevenue,
  });
  const { isPending: isLoadingtotal, data: dataTotal } = queryRevenue;

  //doanh thu theo thang
  const monthlyRevenue = async () => {
    const res = await OrderService.monthlyRevenue(user?.access_token, 2024);
    return res;
  };
  const queryMonthlyRevenue = useQuery({
    queryKey: ["monthlyRevenue"],
    queryFn: monthlyRevenue,
  });
  const { isPending: isLoadingMonthly, data: dataMonthly } =
    queryMonthlyRevenue;

  const chartData = Array.from({ length: 12 }, (_, index) => {
    const month = index + 1;

    // Kiểm tra nếu dataMonthly tồn tại và có dữ liệu
    const item =
      dataMonthly && dataMonthly.length > 0
        ? dataMonthly.find((item) => item._id.month === month)
        : null;

    return {
      name: `Tháng ${month}`, // Tên tháng
      doanhthu: item ? item.monthlyRevenue : 0, // Doanh thu hoặc 0 nếu không có
      pv: 0, // Giá trị mặc định
      amt: 0, // Giá trị mặc định
    };
  });

  // Lấy doanh thu tháng này từ dataMonthly
  const currentMonthRevenue = () => {
    if (dataMonthly && dataMonthly.length > 0) {
      const currentMonth = new Date().getMonth() + 1; // Lấy tháng hiện tại (1 - 12)
      const currentMonthData = dataMonthly.find(
        (item) => item._id.month === currentMonth
      );
      return currentMonthData ? currentMonthData.monthlyRevenue : 0;
    }
    return 0;
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Tiêu đề */}
      <WrapperHeader>Quản lý doanh thu</WrapperHeader>

      {/* 3 InfoCards trong 1 hàng */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <InfoCard
          text="Tổng doanh thu"
          value={dataTotal?.totalRevenue}
          color="#008bd4"
        />
        <InfoCard
          text="Doanh thu tháng này"
          value={currentMonthRevenue()}
          color="#008bd4"
        />
        {/* <InfoCard text="Lợi nhuận" value={dataTotal?.profit} /> */}
      </div>

      <Card
        title="Doanh thu theo tháng"
        bordered={false}
        style={{
          marginTop: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 5px rgba(0, 0, 0, 0.1)",
          padding: "20px",
          backgroundColor: "#ffffff",
        }}
      >
        <div style={{ marginTop: "10px" }}>
          <BarChartComponent data={chartData} />
        </div>
      </Card>
    </div>
  );
};

export default AdminOrder;
