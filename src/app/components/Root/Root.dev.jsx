import React from 'react';
import classNames from 'classnames/bind';
import { Provider } from 'react-redux';
import TopPanel from 'app/components/TopPanel';
import LeftPanel from 'app/components/LeftPanel';
import CanvasEditor from 'app/components/CanvasEditor';
import Explorer from 'app/components/Explorer';
import DevTools from 'app/components/DevTools';
import WebFontLoader from 'app/components/WebFontLoader';
import styles from './styles';

const Root = ({ store }) => (
  <Provider store={store}>
    <div
      className={classNames.bind(styles)({
        'root': true,
      })}
    >
      <TopPanel />
      <LeftPanel />
      <CanvasEditor />
      <Explorer />
      <WebFontLoader />
    </div>
  </Provider>
);

export default Root;
