import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllPermissions } from "../redux/actions/permissionAction";

export const usePermissionData = () => {
  const dispatch = useDispatch();
  const permissions = useSelector((state) => state.permissions.data || {});
  const loading = useSelector((state) => state.permissions.loading);
  const error = useSelector((state) => state.permissions.error || null);

  useEffect(() => {
    dispatch(getAllPermissions());
  }, [dispatch]);

  return { permissions, loading, error };
};
