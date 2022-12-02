import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DashboardIcon from '@material-ui/icons/Dashboard'
import SearchIcon from '@material-ui/icons/Search'
import SettingsIcon from '@material-ui/icons/Settings'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import styles from './PageTemplate.module.css'
const Navbar = ({ currentPage, setCurrentPage, logout, openSettings }) => {
  const onDashboardButtonClick = (e) => {
    e.preventDefault()
    setCurrentPage('dashboard')
  }

  const onSearchButtonClick = (e) => {
    e.preventDefault()
    setCurrentPage('search')
  }

  return (
    <div className={styles.root}>
      <ListItem
        button
        selected={currentPage === 'dashboard'}
        onClick={onDashboardButtonClick}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem
        button
        selected={currentPage === 'search'}
        onClick={onSearchButtonClick}
      >
        <ListItemIcon>
          <SearchIcon />
        </ListItemIcon>
        <ListItemText primary="Search" />
      </ListItem>

      <ListItem button onClick={openSettings}>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItem>
      <ListItem button onClick={logout}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Log Out" />
      </ListItem>
    </div>
  )
}

export default Navbar
