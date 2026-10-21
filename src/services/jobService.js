import api from "./api";

const getJobs = async () => {
  const response = await api.get("/jobs");
  return response.data;
};

export const getJobById = async (jobId) => {
  const response = await api.get(`/jobs/${jobId}`);
  return response.data;
};

export default getJobs;
