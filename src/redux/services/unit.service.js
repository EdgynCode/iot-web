import axiosInstance from "./axiosInstance";

const addNewUnit = async (
  id,
  tenDonVi,
  moTa,
  ghiChu,
  phoneDonVi,
  emailDonVi,
  addressDonVi,
  quanHuyen,
  thanhPho
) => {
  try {
    const response = await axiosInstance.post(`Unit/AddNewUnit`, {
      id,
      tenDonVi,
      moTa,
      ghiChu,
      phoneDonVi,
      emailDonVi,
      addressDonVi,
      quanHuyen,
      thanhPho,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error adding new unit:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const getAllUnits = async () => {
  try {
    const response = await axiosInstance.get(`Unit/GetAllUnits`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching unit data:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const updateUnit = async (
  id,
  tenDonVi,
  moTa,
  ghiChu,
  phoneDonVi,
  emailDonVi,
  addressDonVi,
  quanHuyen,
  thanhPho
) => {
  try {
    const response = await axiosInstance.patch(`Unit/UpdateUnit`, {
      id,
      tenDonVi,
      moTa,
      ghiChu,
      phoneDonVi,
      emailDonVi,
      addressDonVi,
      quanHuyen,
      thanhPho,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error updating role:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const UnitService = {
  addNewUnit,
  getAllUnits,
  updateUnit,
};

export default UnitService;
