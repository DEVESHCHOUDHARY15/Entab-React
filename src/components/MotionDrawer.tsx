import { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Collapse,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoIcon from "@mui/icons-material/Info";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DropDownMenu from "./DropDownMenu";

interface DrawerSubItem {
  id: string;
  label: string;
}

interface DrawerItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  subItems?: DrawerSubItem[];
}

interface MotionDrawerProps {
  items?: DrawerItem[];
  title?: string;
}

const MotionDrawer = ({
  items = [
    {
      id: "1",
      label: "Dashboard",
      icon: <DashboardIcon />,
      subItems: [
        { id: "1-1", label: "Analytics" },
        { id: "1-2", label: "Reports" },
      ],
    },
    {
      id: "2",
      label: "Settings",
      icon: <SettingsIcon />,
      subItems: [
        { id: "2-1", label: "Profile" },
        { id: "2-2", label: "Preferences" },
        { id: "2-3", label: "Account" },
      ],
    },
    {
      id: "3",
      label: "About",
      icon: <InfoIcon />,
    },
  ],
  title = "Menu",
}: MotionDrawerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setIsOpen(open);
    };

  const toggleExpand = (itemId: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const drawerContent = (
    <Box
      sx={{
        width: "70vw",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      role="presentation"
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 2,
          backgroundColor: "#1976d2",
          color: "white",
        }}
      >
        <span>{title}</span>
        <IconButton onClick={toggleDrawer(false)} sx={{ color: "white" }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider />

      {/* Example collapsible container */}
      <Box sx={{ p: 2 }}>
        <DropDownMenu
          title="Options"
          items={["Custom item A", "Custom item B", "Custom item C"]}
          previewCount={1}
          itemGap={1}
        />
      </Box>

      {/* Menu Items */}
      <List sx={{ flex: 1 }}>
        {items.map((item) => (
          <Box key={item.id}>
            <ListItem
              onClick={() => {
                if (item.subItems && item.subItems.length > 0) {
                  toggleExpand(item.id);
                } else {
                  item.onClick?.();
                  setIsOpen(false);
                }
              }}
              sx={{
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
              {item.subItems && item.subItems.length > 0 && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "auto",
                  }}
                >
                  {expandedItems[item.id] ? (
                    <ExpandLessIcon />
                  ) : (
                    <ExpandMoreIcon />
                  )}
                </Box>
              )}
            </ListItem>

            {/* Dropdown Items */}
            {item.subItems && (
              <Collapse
                in={expandedItems[item.id]}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {item.subItems.map((subItem) => (
                    <ListItem
                      key={subItem.id}
                      onClick={() => {
                        setIsOpen(false);
                      }}
                      sx={{
                        paddingLeft: 4,
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: "#e3f2fd",
                        },
                        transition: "background-color 0.3s ease",
                      }}
                    >
                      <ListItemText primary={subItem.label} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </Box>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {/* Toggle Button - Full Height Menu Bar */}
      <Box
        onClick={toggleDrawer(true)}
        sx={{
          position: "fixed",
          left: "14px",
          top: "50%",
          transform: "translateY(-50%)",
          height: "55vh",
          zIndex: 1200,
          backgroundColor: "#1976d2",
          width: "69px",
          borderRadius: "24px",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: "16px",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: "#1565c0",
          },
        }}
      >
        <MenuIcon sx={{ color: "white", fontSize: "40px" }} />
      </Box>

      {/* Drawer Component */}
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            width: "70vw",
          },
        }}
        transitionDuration={{
          enter: 500,
          exit: 500,
        }}
        ModalProps={{
          BackdropProps: {
            sx: {
              transition: "background-color 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            },
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default MotionDrawer;
