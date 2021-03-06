import React, { PureComponent } from 'react'
import cx from 'classnames'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import * as actions from '~/actions'
import * as T from '~/types/time'
import Root from '~/components/Root'
import OAuthCallbackPage from '~/components/OAuthCallbackPage'

import styles from './index.css'

class App extends PureComponent {
  static defaultProps = {
    className: '',
  }

  async componentDidMount() {
    const { store } = this.props
    try {
      await actions.hashtag.getHashtags(store)()
    } catch (err) {
      // retry once
      console.error(err)
      await T.delay(1000)()
      await actions.hashtag.getHashtags(store)()
    }
  }

  render() {
    const { id, className, store } = this.props

    return (
      <Provider store={store}>
        <Router>
          <div id={id} className={cx(styles.main, className)}>
            <Route exact path="/callback" component={OAuthCallbackPage} />
            <Route path="/" component={Root} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

