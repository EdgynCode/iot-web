import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllClassrooms } from "../redux/actions/classroomAction";

export const useClassroomData = () => {
  const dispatch = useDispatch();
  const classrooms = useSelector((state) => state.classrooms.data || {});

  useEffect(() => {
    dispatch(getAllClassrooms());
  }, [dispatch]);

  return { classrooms };
};
