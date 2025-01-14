import axiosInstance from "./axiosInstance";

const addNewDeviceType = async (
  tenLoaiThietBi,
  serialNumber,
  maQR,
  moTa,
  ghiChu
) => {
  try {
    const response = await axiosInstance.post("DeviceType/AddNewDeviceType", {
      tenLoaiThietBi,
      serialNumber,
      maQR,
      moTa,
      ghiChu,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error adding new device type:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const getAllDeviceTypes = async () => {
  try {
    const response = await axiosInstance.get("DeviceType/GetAllDeviceTypes");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching device types:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const removeDeviceType = async (deviceTypeId) => {
  try {
    const response = await axiosInstance.delete(
      `DeviceType/RemoveDeviceType?id=${deviceTypeId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting device type:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const addNewDevice = async (
  tenThietBi,
  donViId,
  serialNumber,
  maQR,
  moTa,
  ghiChu,
  isTrangThai,
  loaiThietBiID,
  thoiGianBaoHanh
) => {
  try {
    const response = await axiosInstance.post("Device/AddNewDevice", {
      tenThietBi,
      donViId,
      serialNumber,
      maQR,
      moTa,
      ghiChu,
      isTrangThai,
      loaiThietBiID,
      thoiGianBaoHanh,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error adding new device:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const removeDevice = async (deviceId) => {
  try {
    const response = await axiosInstance.delete(
      `Device/RemoveDevice?id=${deviceId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting device:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const updateDevice = async (id, tenThietBi, moTa, ghiChu) => {
  try {
    const response = await axiosInstance.patch("Device/UpdateDeviceType", {
      id,
      tenThietBi,
      moTa,
      ghiChu,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error updating device:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const getAllDevices = async () => {
  try {
    const response = await axiosInstance.get("Device/GetAllDevices");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching devices:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const getDevicesByTypeId = async (deviceTypeId) => {
  try {
    const response = await axiosInstance.get(
      `Device/GetDevicesByTypeId?deviceTypeId=${deviceTypeId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching devices by type id:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};
const DeviceService = {
  addNewDeviceType,
  getAllDeviceTypes,
  removeDeviceType,
  addNewDevice,
  removeDevice,
  updateDevice,
  getAllDevices,
  getDevicesByTypeId,
};

export default DeviceService;
