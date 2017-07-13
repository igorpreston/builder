import React from 'react';
import { render } from 'react-dom';
import Root from 'app/components/Root';
import configureStore from 'app/store';

const docRoot = document.getElementById('docroot');

export const store = configureStore({});

function renderClient (NextRoot, store) {
  return render(
    <NextRoot
      store={store}
    />,
    docRoot,
  );
};

export default renderClient(Root, store);
