import { routesConfig } from './config/routes/RoutesConfig.tsx';
import { Route, Routes } from 'react-router-dom';
import type { RouteDetails } from './config/routes/RouteDetails';


function App() {
    const generateRoute = (route: RouteDetails) => (
        <Route key={route.path} path={route.path} element={route.element}>
            {route.children?.map((childRoute, index) => (
                <Route key={index} path={childRoute.path} element={childRoute.element} />
            ))}
        </Route>
    );

    return (
        <Routes>
            {routesConfig.map((route) => generateRoute(route))}
        </Routes>
    );
}

export default App;
