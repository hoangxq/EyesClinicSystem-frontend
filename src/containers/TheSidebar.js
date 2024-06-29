import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { withNamespaces } from 'react-i18next'

const TheSidebar = ({navigation, t, tReady}) => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.changeState.sidebarShow);

  for (let i = 0; i < navigation.length; i++) {
    if (navigation[i]._children) {
      if (navigation[i].name) {
        navigation[i].name = t(navigation[i].name);
      }

      for (let j = 0; j < navigation[i]._children.length; j++) {
        if (navigation[i]._children[j].name) {
          navigation[i]._children[j].name = t(navigation[i]._children[j].name);
        } else {
          navigation[i]._children[j] = t(navigation[i]._children[j]);
        }
      }
    } else {
      navigation[i].name = t(navigation[i].name);
    }
  }

  return (
    <CSidebar
      show={show}
      placement='end'
      onShowChange={(val) => dispatch({type: 'set', sidebarShow: val })}
      // style={{ backgroundColor: '#BFEFFF' }}
    >
      <div>
        <a style={{ display: 'inline-block', width: '100%', display: 'flex', alignItems: 'center', padding: '10px 20px' }} href="/">
          <CIcon
            className="c-sidebar-brand-full"
            name="logo-negative"
            height={35}
            src={window.location.origin + '/images/logo.png'}
          />
          <p
          style={{
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: '16px',
            color: 'rgba(255, 255, 255, 0.9)',
            paddingLeft: '8px',
            margin: 0,
            padding: '0px 8px',
          }}
          >
            Eyesclinic
          </p>
        </a>
      </div>
      <CSidebarNav 
      style={{
        // backgroundColor: 'rgba(204, 255, 255, 0.9)'
      }}
      >

        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none"/>
    </CSidebar>
  )
}

export default withNamespaces() (React.memo(TheSidebar))
