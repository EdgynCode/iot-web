const getLocalStorageKey = (sessionId) =>
  `availableLearners_${sessionId || "default"}`;

export const getLocalLearners = (sessionId) => {
  const stored = localStorage.getItem(getLocalStorageKey(sessionId));
  return stored ? JSON.parse(stored) : [];
};
export const saveLocalLearners = (learners, sessionId) => {
  console.log("Lưu vào localStorage:", learners, "cho sessionId:", sessionId);
  localStorage.setItem(getLocalStorageKey(sessionId), JSON.stringify(learners));
};
export const resetLocalLearners = (sessionId) => {
  console.log("Reset localStorage cho key:", getLocalStorageKey(sessionId));
  localStorage.removeItem(getLocalStorageKey(sessionId));
};
