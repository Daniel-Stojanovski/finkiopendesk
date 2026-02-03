import type { RouteDetails } from "./RouteDetails";
import Layout from "../../pages/base/Layout";
import GuideProfessionCards from "../../pages/views/guide/GuideProfessionCards";
import ForumSubjectCards from "../../pages/views/forum/ForumSubjectCards";
import GuideProfessionSubjectCards from "../../pages/views/guide/GuideProfessionSubjectCards";
import ForumDiscussionCards from "../../pages/views/forum/ForumDiscussionCards";
import ProfessionDiscussion from "../../pages/views/discussion/ProfessionDiscussion";
import SubjectDiscussion from "../../pages/views/discussion/SubjectDiscussion";
import RegisterPage from "../../pages/login/RegisterPage";
import RegisterStudentPage from "../../pages/login/RegisterStudentPage";
import LoginPage from "../../pages/login/LoginPage";

export const routesConfig: RouteDetails[] = [
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "", element: <GuideProfessionCards /> },
            { path: "professions", element: <GuideProfessionCards /> },
            { path: "subjects", element: <ForumSubjectCards /> },
            { path: "discussions", element: <ForumDiscussionCards /> },
            { path: "subjects/pid/:pid", element: <GuideProfessionSubjectCards /> },
            { path: "discussion/pid/:id", element: <ProfessionDiscussion /> },
            { path: "discussion/sid/:id", element: <SubjectDiscussion /> },
        ]
    },
    {
        path: "/register",
        element: <RegisterPage/>
    },
    {
        path: "/register/activate",
        element: <RegisterStudentPage />
    },
    {
        path: "/login",
        element: <LoginPage/>
    }
];
