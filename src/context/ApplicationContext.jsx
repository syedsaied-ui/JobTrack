import { createContext, useEffect, useState } from "react";
import createApplication, {
  deleteApplication,
  getApplications,
  updateApplications,
} from "../services/applicationService";

const ApplicationContext = createContext();

export const ApplicationProvider = ({ children }) => {
  const [applications, setApplications] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const [loadingApplication, setLoadingApplication] = useState(false);

  const [actionError, setActionError] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState([]);
  const [deletingApplications, setDeletingApplications] = useState([]);

  useEffect(() => {
    const fetchJobApplications = async () => {
      setLoadingApplication(true);
      setLoadError(null);
      try {
        const application = await getApplications();
        setApplications(application);
        setLoadError(null);
      } catch (error) {
        setLoadError(error.message);
      } finally {
        setLoadingApplication(false);
      }
    };
    fetchJobApplications();
  }, []);

  const submitJobApplication = async (formData, selectedJob) => {
    setActionError(null);

    try {
      const newApplication = await createApplication(formData, selectedJob);

      setApplications((prevApplications) => [
        ...prevApplications,
        newApplication,
      ]);
      return newApplication;
    } catch (error) {
      setActionError(error.message);
      throw error;
    }
  };

  const updateJobApplication = async (applicationId, newStatus) => {
    if (!applications) return;

    const checkUpdatingStatus = updatingStatus.includes(applicationId);
    if (checkUpdatingStatus) return;
    setUpdatingStatus((prev) => [...prev, applicationId]);

    setActionError(null);

    try {
      const updatedApplicationStatus = await updateApplications(
        applicationId,
        newStatus,
      );

      setApplications((prevApplications) =>
        prevApplications.map((prevApplication) =>
          prevApplication.id === updatedApplicationStatus.id
            ? updatedApplicationStatus
            : prevApplication,
        ),
      );
      setActionError(null);
    } catch (error) {
      setActionError(error.message);
    } finally {
      setUpdatingStatus((prevUpdatingStatus) =>
        prevUpdatingStatus.filter((id) => id !== applicationId),
      );
    }
  };

  const deleteJobApplication = async (applicationId) => {
    if (!applications) return;

    const checkDeletingApplications =
      deletingApplications.includes(applicationId);
    if (checkDeletingApplications) return;
    setDeletingApplications((prev) => [...prev, applicationId]);

    setActionError(null);
    try {
      await deleteApplication(applicationId);

      setApplications((prevApplications) =>
        prevApplications.filter(
          (prevApplication) => prevApplication.id !== applicationId,
        ),
      );
    } catch (error) {
      setActionError(error.message);
    } finally {
      setDeletingApplications((prevDeletingApplications) =>
        prevDeletingApplications.filter((id) => id !== applicationId),
      );
    }
  };

  return (
    <ApplicationContext.Provider
      value={{
        applications,
        loadError,
        loadingApplication,
        submitJobApplication,
        updateJobApplication,
        updatingStatus,
        actionError,
        deleteJobApplication,
        deletingApplications,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationContext;
