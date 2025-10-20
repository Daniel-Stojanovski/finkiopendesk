import React from "react";

export interface RouteDetails {
    path: string;
    element: React.ReactNode;
    children?: RouteDetails[];
}
