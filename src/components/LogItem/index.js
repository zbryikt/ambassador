import React, { PureComponent } from 'react'
import cx from 'classnames'
import { Item, Dropdown } from 'semantic-ui-react'
import styles from './index.css'
import { compose, uniq, filter } from 'ramda'

const cleanup = compose(uniq, filter(h => typeof h === 'number'))

class LogItem extends PureComponent {
  static defaultProps = {
    className: '',
    options: []
  }

  render() {
    const { id, className, data, options, onAddItem, onChange } = this.props
    const { nick = '...', msg = '...', hashtags } = data

    return (
      <Item id={id} className={cx(styles.main, className)} >
        <Item.Content>
          <Item.Header>{ `${data.date}#${data.index}` }</Item.Header>
          <Item.Description>
            { `${nick}> ` }
            <span dangerouslySetInnerHTML={{ __html: msg }} />
          </Item.Description>
          <Item.Extra>
            <Dropdown
              fluid multiple search selection allowAdditions
              placeholder="#hashtag"
              options={options}
              value={cleanup(hashtags)}
              onAddItem={onAddItem}
              onChange={onChange}
            />
          </Item.Extra>
        </Item.Content>
      </Item>
    )
  }
}

export default LogItem
