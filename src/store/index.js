/* @flow */

import type { Store as ReduxStore } from 'redux'
import type { PlainAction } from '~/types/action'
import type { State } from '~/reducers'

import { createStore, compose, applyMiddleware } from 'redux'
import app from './app'
import reducer from '~/reducers'

export type Store = ReduxStore<State, PlainAction>

const configureStore = (initialStore: State): Store => {
  const middlewares = [app]

  const store = compose(
    applyMiddleware.apply(null, middlewares)
  )(createStore)(reducer, initialStore)

  return store
}
export default configureStore
