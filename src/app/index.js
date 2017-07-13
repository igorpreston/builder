import render, { store } from 'client';
import * as Records from 'app/records';
import * as BlocsDuck from 'app/ducks/blocs';
import * as BreakpointsDuck from 'app/ducks/breakpoints';
import * as PagesDuck from 'app/ducks/pages';
import * as SnapDuck from 'app/ducks/snap';

export default {
  render,
  Records,
  store,
  BlocsDuck,
  BreakpointsDuck,
  PagesDuck,
  SnapDuck,
};