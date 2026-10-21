import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./Layout.jsx";
import Home from "./pages/Home.jsx";
import JobApplication from "./pages/JobApplication.jsx";
import ApplicationSubmitted from "./pages/ApplicationSubmitted.jsx";
import MyApplications from "./pages/MyApplications.jsx";
import { ApplicationProvider } from "./context/ApplicationContext.jsx";
import ApplyPageMessage from "./components/Applications/ApplyPageMessage.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "applications",
        element: <MyApplications />,
      },
      {
        path: "apply",
        element: <ApplyPageMessage />,
      },
      {
        path: "apply/:jobId",
        element: <JobApplication />,
      },
      {
        path: "application-submitted",
        element: <ApplicationSubmitted />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApplicationProvider>
      <RouterProvider router={router} />
    </ApplicationProvider>
  </StrictMode>,
);
