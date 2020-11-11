import { RouteConfig, Route } from "vue-router";

export const prefixRoutes = (prefix: string, routes: RouteConfig[]) => {
  return routes.map((route) => {
    route.path = `${ prefix }/${ route.path }`;
    return route;
  });
};

export const composeFullRegionPath = (targetRegion: string, routeInfo: Route) => {
  const excludeRegionPath = routeInfo.fullPath.split("/").filter(item => item !== routeInfo.params.region).join("/");

  return `/${ targetRegion }${ excludeRegionPath }`;
};
