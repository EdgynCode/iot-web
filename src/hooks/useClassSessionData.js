import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllClassSessions } from "../redux/actions/lessonAction";

export const useClassSessionData = () => {
  const dispatch = useDispatch();
  const sessions = useSelector((state) => state.lessons.data);

  useEffect(() => {
    dispatch(getAllClassSessions());
  }, [dispatch]);

  return { sessions };
};
