import type { RouteDetails } from "./RouteDetails";
import Layout from "../../pages/base/Layout";
import ForumAllCards from "../../pages/views/forum/ForumAllCards";
import GuideAllCards from "../../pages/views/guide/GuideAllCards";

export const routesConfig: RouteDetails[] = [
    {
        path: "/",
        element: (
            <Layout>
                <GuideAllCards/>
            </Layout>
        )
    },
];
