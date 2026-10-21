import api from "./api";
import { nanoid } from "nanoid";

const createApplication = async (formData, selectedJob) => {
  const application = {
    id: nanoid(),
    jobId: selectedJob.id,

    company: selectedJob.company,
    jobTitle: selectedJob.jobTitle,
    location: selectedJob.location,
    jobType: selectedJob.jobType,
    salary: selectedJob.salary,
    jobUrl: selectedJob.jobUrl,

    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    coverLetter: formData.coverLetter,
    resumeUrl: formData.resumeUrl,

    status: "Applied",
    applicationDate: new Date().toISOString(),
  };

  const response = await api.post("/applications", application);
  return response.data;
};

export const getApplications = async () => {
  const response = await api.get("/applications");
  return response.data;
};

export default createApplication;

export const updateApplications = async (id, newStatus) => {
  const response = await api.patch(`/applications/${id}`, {
    status: newStatus,
  });

  return response.data;
};

export const deleteApplication = async (id) => {
  const response = await api.delete(`/applications/${id}`);
  return response.data;
};
