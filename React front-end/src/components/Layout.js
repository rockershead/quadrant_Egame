import {React,useState} from 'react'
import clsx from 'clsx';
import { makeStyles,useTheme,Drawer,Typography,List,ListItem,ListItemIcon,ListItemText,AppBar,Toolbar,IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useHistory, useLocation } from 'react-router-dom'




//import { AddCircleOutlineOutlined, SubjectOutlined } from '@material-ui/icons'

const drawerWidth = 240

const useStyles = makeStyles((theme)=> 
 { return{
  page: {
    //background: '#f9f9f9',
    width: '100%',
    
  },
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
  },
  active: {
    background: '#f4f4f4'
  },
  toolbar: theme.mixins.toolbar,
  appBar: {
    backgroundColor:"pink",
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
}
})

export default function Layout({ children }) {
  const classes = useStyles()
  const history = useHistory()
  const theme = useTheme();
  //const location = useLocation()
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("")
  

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  

  const menuItems = [
    { 
      text: 'My Notes', 
      //icon: <SubjectOutlined color="secondary" />, 
     // path: '/' 
    },
    { 
      text: 'Create Note', 
     // icon: <AddCircleOutlineOutlined color="secondary" />, 
      //path: '/create' 
    },
    { 
        text: 'Logout', 
        
      },
  ];

  return (
    <div >
      <AppBar 
        position="fixed" 
        className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        elevation={0}
        color="primary"
      >
        <Toolbar>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={open==false?handleDrawerOpen:handleDrawerClose}
            edge="start"
            className={clsx(classes.menuButton, open)}
          >
            <MenuIcon />

          </IconButton>
          
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        classes={{ paper: classes.drawerPaper }}
        anchor="left"
        open={open}
      >
          <div>
          <Typography variant="h5" align="center" >
            Menu
          </Typography>
        </div>
         
        

        {/* links/list section */}
        <List>
          {menuItems.map((item) => (
            <ListItem 
              button 
              key={item.text} 

             
              //className={location.pathname == item.path ? classes.active : null}
            >
              
              <ListItemText primary={item.text} align="center" />
            </ListItem>
          ))}
        </List>
        
      </Drawer>

      {/* main content */}
      <div >
      <div className={classes.toolbar}></div>
        { children }
      </div>
    </div>
  )
}