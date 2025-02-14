import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllDeviceTypes } from "../redux/actions/deviceAction";

export const useDeviceTypeData = () => {
  const dispatch = useDispatch();
  const deviceTypes = useSelector((state) => state.devicetypes.data || {});

  useEffect(() => {
    dispatch(getAllDeviceTypes());
  }, [dispatch]);

  return { deviceTypes };
};
