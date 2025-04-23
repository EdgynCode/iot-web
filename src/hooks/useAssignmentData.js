import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllAssignments } from "../redux/actions/assignmentAction";

export const useAssignmentData = () => {
  const dispatch = useDispatch();
  const assignments = useSelector((state) => state.assignments.data || {});
  const loading = useSelector((state) => state.assignments.loading || false);
  const error = useSelector((state) => state.assignments.error || null);

  useEffect(() => {
    dispatch(getAllAssignments());
  }, [dispatch]);

  return { assignments, loading, error };
};
