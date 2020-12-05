const { useLocation } = require('react-router-dom');

export const useRouterQuery = () => {
  const routerQuery = new URLSearchParams(useLocation().search);
  return routerQuery;
};
