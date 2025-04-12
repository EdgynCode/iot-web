import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllClassrooms } from "../redux/actions/classroomAction";

export const useClassroomData = () => {
  const dispatch = useDispatch();
  const classrooms = useSelector((state) => state.classrooms.data || {});
  const loading = useSelector((state) => state.classrooms.loading);
  const error = useSelector((state) => state.classrooms.error);

  useEffect(() => {
    dispatch(getAllClassrooms());
  }, [dispatch]);

  return { classrooms, loading, error };
};
