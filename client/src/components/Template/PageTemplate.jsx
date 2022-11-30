import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import styles from "./PageTemplate.module.css";
import clsx from "clsx";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  List,
  Typography,
} from "@material-ui/core";
import Navbar from "../Template/Navbar";
import Dashboard from "../Dashboard/Dashboard";
import Search from "../Search/Search";
import SettingsModal from "./SettingsModal";
import Axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
}));

const PageTemplate = () => {
  const history = useHistory();
  const classes = useStyles();
  const { userData, setUserData } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [purchasedStocks, setPurchasedStocks] = useState([]);

  if (!userData.user) {
    history.push("/login");
  }

  useEffect(() => {
    const getPurchasedStocks = async () => {
      const url = `/api/stock/${userData.user.id}`;
      const headers = {
        "x-auth-token": userData.token,
      };
  
      const response = await Axios.get(url, {
        headers,
      });
      if (response.data.status === "success") {
        setPurchasedStocks(response.data.stocks);
      }
    };
    getPurchasedStocks();
  }, []);

  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
    history.push("/login");
  };

  const openSettings = () => {
    setSettingsOpen(true);
  };

  return (
    <div className={styles.root}>
      <CssBaseline />
        <AppBar
          position="absolute"
          style={{ background: '#3d3865'}}
          className={clsx(
            styles.appBarBackground,
            classes.appBar,
            open && classes.appBarShift
          )}
          
        >
          <Toolbar className={styles.toolbar}>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={styles.title}
            >
              {currentPage === "dashboard" && "Dashboard"}
              {currentPage === "search" && "Search"}
            </Typography>
            <List>
              <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} logout={logout} openSettings={openSettings}/>
            </List>
            <Typography color="inherit">
              Hello,{" "}
              {userData.user.username
                ? userData.user.username.charAt(0).toUpperCase() +
                  userData.user.username.slice(1)
                : ""}
            </Typography>
          </Toolbar>
        </AppBar>
      <main className={styles.content}>
        <div className={classes.appBarSpacer} />
        {currentPage === "dashboard" && (
          <Dashboard purchasedStocks={purchasedStocks} />
        )}
        {currentPage === "search" && (
          <Search
            setPurchasedStocks={setPurchasedStocks}
            purchasedStocks={purchasedStocks}
          />
        )}
        {settingsOpen && <SettingsModal setSettingsOpen={setSettingsOpen} />}
      </main>
    </div>
  );
};

export default PageTemplate;
