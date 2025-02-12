import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllLabs } from "../redux/actions/labAction";

export const useLabData = () => {
  const dispatch = useDispatch();
  const labs = useSelector((state) => state.labs.data || {});

  useEffect(() => {
    dispatch(getAllLabs());
  }, [dispatch]);

  return { labs };
};
