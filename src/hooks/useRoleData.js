import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllRoles } from "../redux/actions/roleAction";

export const useRoleData = () => {
  const dispatch = useDispatch();
  const roles = useSelector((state) => state.roles.data || {});
  const loading = useSelector((state) => state.roles.loading);
  const error = useSelector((state) => state.roles.error || null);

  useEffect(() => {
    dispatch(getAllRoles());
  }, [dispatch]);

  return { roles, loading, error };
};
