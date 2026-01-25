import type { RouteDetails } from "./RouteDetails";
import Layout from "../../pages/base/Layout";
import GuideProfessionCards from "../../pages/views/guide/GuideProfessionCards";
import ForumSubjectCards from "../../pages/views/forum/ForumSubjectCards";
import GuideProfessionSubjectCards from "../../pages/views/guide/GuideProfessionSubjectCards";
import ForumDiscussionCards from "../../pages/views/forum/ForumDiscussionCards";

export const routesConfig: RouteDetails[] = [
    {
        path: "/",
        element: (
            <Layout>
                <GuideProfessionCards/>
            </Layout>
        )
    },
    {
        path: "/professions",
        element: (
            <Layout>
                <GuideProfessionCards/>
            </Layout>
        )
    },
    {
        path: "/subjects",
        element: (
            <Layout>
                <ForumSubjectCards/>
            </Layout>
        )
    },
    {
        path: "/discussions",
        element: (
            <Layout>
                <ForumDiscussionCards/>
            </Layout>
        )
    },
    {
        path: "/subjects/pid/:pid",
        element: (
            <Layout>
                <GuideProfessionSubjectCards />
            </Layout>
        )
    },
];
