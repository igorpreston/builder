import React from 'react';
import { render } from 'react-dom';
import Root from 'app/components/Root';
import { AppContainer } from 'react-hot-loader';
import configureStore from 'app/store';

const docRoot = document.getElementById('docroot');

export const store = configureStore({});

function renderClient (NextRoot, store) {
  return render(
    <AppContainer>
      <NextRoot
        store={store}
      />
    </AppContainer>,
    docRoot,
  );
};

export default renderClient(Root, store);

if (module.hot) {
  module.hot.accept('app/components/Root', () => renderClient(Root, store));
}
