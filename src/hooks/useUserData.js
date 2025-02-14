import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCurrentUser } from "../redux/actions/authAction";

export const useUserData = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return { user };
};
