import type { RouteDetails } from "./RouteDetails";
import Layout from "../../pages/base/Layout";
import ForumAllCards from "../../pages/forum/ForumAllCards";

export const routesConfig: RouteDetails[] = [
    {
        path: "/",
        element: (
            <Layout>
                <ForumAllCards/>
            </Layout>
        )
    },
];
