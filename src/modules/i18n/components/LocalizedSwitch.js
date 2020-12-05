import React from 'react';
import { Switch } from 'react-router-dom';
import { useIntl } from 'react-intl';
export const LocalizedSwitch = ({ children }) => {
  const { formatMessage, locale } = useIntl();
  return (
    <Switch>
      {React.Children.map(children, child =>
        React.isValidElement(child)
          ? React.cloneElement(child, {
              ...child.props,
              path: localizeRoutePath(child.props.path),
            })
          : child
      )}
    </Switch>
  );
  function localizeRoutePath(path) {
    switch (typeof path) {
      case 'undefined':
        return undefined;
      case 'object':
        return path.map(key => `/${locale}` + formatMessage({ id: key }));
      default:
        const isFallbackRoute = path === '*';
        return isFallbackRoute ? path : `/${locale}` + path;
    }
  }
};
