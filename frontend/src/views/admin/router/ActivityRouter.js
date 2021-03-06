import React, { Fragment } from 'react';

import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import StarBorder from '@mui/icons-material/StarBorder';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

import { Link } from 'react-router-dom';

const ActivityRouter = ({ toggleDrawer }) => {
    const [openActivity, setOpenActivity] = React.useState(false);

    const handleActivityListOpen = () => {
        setOpenActivity(!openActivity);
    };

    return (
        <Fragment>
            <List>
                <ListItemButton onClick={handleActivityListOpen}>
                    <ListItemIcon>
                        <AutoAwesomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Activity" />
                    {openActivity ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openActivity} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton
                            component={Link}
                            to="review"
                            sx={{ pl: 4 }}
                            onClick={toggleDrawer(false)}
                            onKeyDown={toggleDrawer(false)}
                        >
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="νλ νκΈ°" />
                        </ListItemButton>
                    </List>
                </Collapse>
                <Collapse in={openActivity} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton
                            component={Link}
                            to="pictures"
                            sx={{ pl: 4 }}
                            onClick={toggleDrawer(false)}
                            onKeyDown={toggleDrawer(false)}
                        >
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="νλ μ¬μ§" />
                        </ListItemButton>
                    </List>
                </Collapse>
            </List>
            <Divider />
        </Fragment>
    );
};

export default ActivityRouter;
