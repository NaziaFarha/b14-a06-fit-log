export const getPlan = () => {
  if (typeof window === "undefined") return [];

  const plan = localStorage.getItem("fitlog-plan");

  return plan ? JSON.parse(plan) : [];
};

export const savePlan = (plan: unknown[]) => {
  localStorage.setItem("fitlog-plan", JSON.stringify(plan));
};

export const getSaved = () => {
  if (typeof window === "undefined") return [];

  const saved = localStorage.getItem("fitlog-saved");

  return saved ? JSON.parse(saved) : [];
};

export const saveSaved = (saved: unknown[]) => {
  localStorage.setItem("fitlog-saved", JSON.stringify(saved));
};