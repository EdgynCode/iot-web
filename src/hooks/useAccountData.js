import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listAllUsersByType } from "../redux/actions/userAction";

export const useAccountData = (selectedAccountType, form) => {
  const dispatch = useDispatch();

  const accounts = useSelector((state) => state.students.data || {});
  const loading = useSelector((state) => state.students.loading || false);
  const error = useSelector((state) => state.students.error || null);

  useEffect(() => {
    dispatch(listAllUsersByType(selectedAccountType));
  }, [dispatch, selectedAccountType, form]);

  return { accounts, loading, error };
};
