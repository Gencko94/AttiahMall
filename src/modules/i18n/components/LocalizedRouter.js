import React from 'react';
import { IntlProvider } from 'react-intl';
import { Route, Redirect } from 'react-router-dom';
import { appLanguages } from '../../const/appLanguages';

export const LocalizedRouter = ({
  children,
  RouterComponent,
  appStrings,
  defaultLanguage = 'en',
}) => {
  return (
    <RouterComponent>
      <Route path="/:lang([a-z]{2})">
        {({ match, location }) => {
          /**
           * Get current language
           * Set default locale to en if base path is used without a language
           */
          const params = match ? match.params : {};
          const { lang = defaultLanguage || appLanguages.English } = params;

          /**
           * If language is not in route path, redirect to language root
           */
          const { pathname } = location;
          if (!pathname.includes(`/${lang}/`)) {
            return <Redirect to={`/${lang}/`} />;
          }

          /**
           * Return Intl provider with default language set
           */
          return (
            <IntlProvider locale={lang} messages={appStrings[lang]}>
              <div
                className={`${lang === 'ar' ? 'rtl font-cairo' : 'font-body'}`}
              >
                {children}
              </div>
            </IntlProvider>
          );
        }}
      </Route>
    </RouterComponent>
  );
};
