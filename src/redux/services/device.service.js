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

const DeviceService = {
  addNewDeviceType,
  getAllDeviceTypes,
  removeDeviceType,
};

export default DeviceService;
