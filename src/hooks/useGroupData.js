import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getGroupsByClassSession } from "../redux/actions/groupAction";

export const useGroupData = (sessionId) => {
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.groups.data || {});
  const loading = useSelector((state) => state.groups.loading);
  const error = useSelector((state) => state.groups.error || null);

  useEffect(() => {
    dispatch(getGroupsByClassSession(sessionId));
  }, [dispatch, sessionId]);

  return { groups, loading, error };
};
