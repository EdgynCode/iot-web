import React, { useEffect } from "react";
import { ListDetail } from "../components/list-detail/ListDetail";
import {
  deviceListAction,
  deviceListColumns,
  deviceFilter,
} from "../datas/device.d";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import { getAllDeviceTypes } from "../redux/actions/deviceAction";

const DeviceTypes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deviceListState = useSelector((state) => state.devicetypes || {});
  const {
    data: deviceData = [],
    loading = false,
    error = null,
  } = deviceListState;

  useEffect(() => {
    dispatch(getAllDeviceTypes());
  }, [dispatch]);

  return (
    <>
      <ListDetail
        title="Danh sách loại thiết bị"
        actions={deviceListAction}
        filters={deviceFilter}
        data={loading ? [] : deviceData}
        column={deviceListColumns(navigate)}
      />
      {loading && <Spin size="large" />}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </>
  );
};

export default DeviceTypes;
