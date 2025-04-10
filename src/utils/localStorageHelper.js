const LOCAL_STORAGE_KEY = "availableLearners";

export const getLocalLearners = () => {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveLocalLearners = (learners) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(learners));
};

export const resetLocalLearners = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
};
