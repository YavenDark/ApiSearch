import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import FiberNewIcon from "@material-ui/icons/FiberNew";
import HistoryIcon from "@material-ui/icons/History";
import { Link } from "react-router-dom";

const Listas = (props) => {
  
  return (
    <div>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button >
          <ListItemIcon>
            <AcUnitIcon />
          </ListItemIcon>
          <ListItemText primary="Clima" />
        </ListItem>

         {/* <Link button to ="/Noticias" onClick={props.noticias}> */}
        <ListItem button> 
          <ListItemIcon>
            <FiberNewIcon />
          </ListItemIcon>
          <ListItemText primary="Noticias" />
        </ListItem>
        {/* </Link> */}
      </List>
      <Divider />
      <List component="nav" aria-label="secondary mailbox folders">
        <Link button to ="/Historial">
          <ListItem button onClick={props.historial}>
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText primary="Historial" />
        </ListItem>
        </Link>
      </List>
    </div>
  
  );
};

export default Listas;
