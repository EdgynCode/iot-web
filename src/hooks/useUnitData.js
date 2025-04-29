import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllUnits } from "../redux/actions/unitAction";

export const useUnitData = () => {
  const dispatch = useDispatch();
  const units = useSelector((state) => state.units.data || []);
  const loading = useSelector((state) => state.units.loading);
  const error = useSelector((state) => state.units.error);

  useEffect(() => {
    dispatch(getAllUnits());
  }, [dispatch]);

  return { units, loading, error };
};
