import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getExperimentsByLabId } from "../redux/actions/experimentAction";

export const useExperimentData = (labId) => {
  const dispatch = useDispatch();
  const experiments = useSelector((state) => state.experiments.data || {});
  const loading = useSelector((state) => state.experiments.loading || false);
  const error = useSelector((state) => state.experiments.error || null);

  useEffect(() => {
    dispatch(getExperimentsByLabId(labId));
  }, [dispatch, labId]);

  return { experiments, loading, error };
};
