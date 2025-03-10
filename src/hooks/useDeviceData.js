import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getDevicesByTypeId } from "../redux/actions/deviceAction";

export const useDeviceData = (id) => {
  const dispatch = useDispatch();
  const devices = useSelector((state) => state.devices.data || {});
  const loading = useSelector((state) => state.devices.loading);

  useEffect(() => {
    dispatch(getDevicesByTypeId(id));
  }, [dispatch, id]);

  return { devices, loading };
};
