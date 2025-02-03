import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllLessons } from "../redux/actions/lessonAction";

export const useLessonData = () => {
  const dispatch = useDispatch();
  const lessons = useSelector((state) => state.lessons.data);

  useEffect(() => {
    dispatch(getAllLessons());
  }, [dispatch]);

  return { lessons };
};
