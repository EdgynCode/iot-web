import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getDevicesByTypeId } from "../redux/actions/deviceAction";
import { connectToBroker } from "../redux/actions/mqttAction";
import { message } from "antd";

export const useDeviceData = (id) => {
  const dispatch = useDispatch();
  const devices = useSelector((state) => state.devices.data || {});
  const loading = useSelector((state) => state.devices.loading);
  const error = useSelector((state) => state.devices.error || null);

  const handleBrokerConnect = () => {
    const deviceData = {
      brokerIp: "192.168.0.30",
      port: 1883,
      username: "iot",
      password: "iot@123456",
    };
    dispatch(connectToBroker(deviceData))
      .unwrap()
      .then(() => {
        message.success("Kết nối đến broker thành công!");
      })
      .catch((error) => {
        message.error("Kết nối đến broker thất bại.");
        console.error("Error connecting to broker:", error);
      });
  };

  useEffect(() => {
    dispatch(getDevicesByTypeId(id)).then((response) => {
      if (response.payload && Array.isArray(response.payload)) {
        response.payload.forEach((device) => {
          handleBrokerConnect(device);
        });
      }
    });
  }, [dispatch, id]);

  return { devices, loading, error };
};
