import React, { useState } from "react";
import { Box, IconButton, Collapse, Stack, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

interface DropDownMenuProps {
  /** Title shown in the header */
  title?: string;
  /** If provided, these items will be rendered (strings). Otherwise use children. */
  items?: string[];
  /** How many items to show when collapsed as a preview */
  previewCount?: number;
  /** Gap between items (MUI spacing units) */
  itemGap?: number;
  /** Initial open state */
  initialOpen?: boolean;
  /** Optional children rendered when expanded instead of `items` */
  children?: React.ReactNode;
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({
  title = "Options",
  items = [],
  previewCount = 1,
  itemGap = 1,
  initialOpen = false,
  children,
}) => {
  const [open, setOpen] = useState<boolean>(initialOpen);

  const previewItems = items.slice(0, previewCount);

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#f5f7fb",
          borderRadius: 2,
          paddingX: 1,
          paddingY: 0.75,
          cursor: "pointer",
        }}
        onClick={() => setOpen((s) => !s)}
      >
        <Typography sx={{ fontWeight: 700 }}>{title}</Typography>
        <IconButton size="small" aria-label={open ? "collapse" : "expand"}>
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </Box>

      {/* Preview area when closed (shows few items spaced) */}
      {!open && (items.length > 0 ? (
        <Stack spacing={itemGap} sx={{ mt: 1, px: 1 }}>
          {previewItems.map((it, idx) => (
            <Box
              key={idx}
              sx={{
                py: 0.5,
                px: 1,
                borderRadius: 1,
                background: "rgba(25,118,210,0.04)",
                color: "#0f172a",
                fontSize: 14,
              }}
            >
              {it}
            </Box>
          ))}
        </Stack>
      ) : (
        // if no `items` provided, but children exist, show a very small preview slot
        <Box sx={{ mt: 1, height: 8 }} />
      ))}

      {/* Expanded area with smooth collapse animation */}
      <Collapse in={open} timeout={300} unmountOnExit>
        <Box sx={{ mt: 1, px: 1 }}>
          <Box
            sx={{
              background: "#fff",
              borderRadius: 2,
              boxShadow: 1,
              p: 2,
              overflow: "hidden",
            }}
          >
            {items.length > 0 ? (
              <Stack spacing={itemGap}>
                {items.map((it, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      py: 1,
                      px: 1,
                      borderRadius: 1,
                      background: "transparent",
                      color: "#0f172a",
                      transition: "background-color 200ms ease, transform 200ms ease, opacity 200ms ease",
                      '&:hover': { background: 'rgba(25,118,210,0.06)', transform: 'translateX(4px)' },
                    }}
                  >
                    {it}
                  </Box>
                ))}
              </Stack>
            ) : (
              // Render children if provided
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: `${itemGap * 8}px` }}>
                {children}
              </Box>
            )}
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
};

export default DropDownMenu;
