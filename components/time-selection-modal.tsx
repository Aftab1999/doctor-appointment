"use client"

import { useState } from "react"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Slide,
} from "@mui/material"
import { Close, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material"
import type { TransitionProps } from "@mui/material/transitions"

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})

interface TimeSelectionModalProps {
  open: boolean
  onClose: () => void
  onConfirm: (time: string) => void
  selectedTime: string
}

export default function TimeSelectionModal({ open, onClose, onConfirm, selectedTime }: TimeSelectionModalProps) {
  const [currentTime, setCurrentTime] = useState(selectedTime)
  const [expandedPanel, setExpandedPanel] = useState<string | false>("morning")

  const timeSlots = {
    morning: ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM"],
    afternoon: ["12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM"],
    evening: ["04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM"],
    night: ["08:00 PM", "09:00 PM", "10:00 PM", "11:00 PM"],
  }

  const handleTimeSelect = (time: string) => {
    setCurrentTime(time)
  }

  const handleConfirm = () => {
    onConfirm(currentTime)
    onClose()
  }

  const handlePanelChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedPanel(isExpanded ? panel : false)
  }

  React.useEffect(() => {
    setCurrentTime(selectedTime)
  }, [selectedTime])

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      PaperProps={{
        sx: {
          position: "absolute",
          bottom: 0,
          margin: 0,
          width: "100%",
          maxWidth: "400px", // Match the max-width of the main container
          borderRadius: "16px 16px 0 0",
          boxShadow: "0 -8px 24px rgba(0,0,0,0.1)",
          maxHeight: "80vh",
          overflowY: "auto",
        },
      }}
    >
      <DialogContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography sx={{ fontSize: "18px", fontWeight: 600, color: "#000" }}>Select Session Time</Typography>
          <IconButton onClick={onClose} sx={{ color: "#666" }}>
            <Close />
          </IconButton>
        </Box>

        {Object.entries(timeSlots).map(([category, times]) => (
          <Accordion
            key={category}
            expanded={expandedPanel === category}
            onChange={handlePanelChange(category)}
            disableGutters
            elevation={0}
            sx={{
              bgcolor: "transparent",
              "&:before": { display: "none" }, // Remove default border
              borderBottom: "1px solid #F3F4F6", // Custom divider
              "&:last-child": { borderBottom: "none" },
            }}
          >
            <AccordionSummary
              expandIcon={
                expandedPanel === category ? (
                  <KeyboardArrowUp sx={{ color: "#666" }} />
                ) : (
                  <KeyboardArrowDown sx={{ color: "#666" }} />
                )
              }
              sx={{
                px: 0,
                minHeight: "48px",
                "& .MuiAccordionSummary-content": {
                  my: 1,
                },
              }}
            >
              <Typography sx={{ fontSize: "16px", fontWeight: 600, textTransform: "capitalize" }}>
                {category}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 0, pb: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
              {times.map((time) => (
                <Button
                  key={time}
                  variant="outlined"
                  onClick={() => handleTimeSelect(time)}
                  sx={{
                    minWidth: "80px",
                    height: "40px",
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontWeight: 500,
                    textTransform: "none",
                    borderColor: currentTime === time ? "#8B5CF6" : "#E5E7EB",
                    color: currentTime === time ? "#8B5CF6" : "#666",
                    bgcolor: currentTime === time ? "rgba(139, 92, 246, 0.1)" : "transparent",
                    "&:hover": {
                      borderColor: "#8B5CF6",
                      bgcolor: "rgba(139, 92, 246, 0.05)",
                    },
                    // Example of disabled times (adjust logic as needed)
                    ...(time === "06:00 PM" || time === "07:00 PM"
                      ? {
                          borderColor: "#F3F4F6",
                          color: "#D1D5DB",
                          cursor: "not-allowed",
                          "&:hover": {
                            borderColor: "#F3F4F6",
                            bgcolor: "transparent",
                          },
                        }
                      : {}),
                  }}
                  disabled={time === "06:00 PM" || time === "07:00 PM"} // Example disabled times
                >
                  {time}
                </Button>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}

        <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              flex: 1,
              borderColor: "#E5E7EB",
              color: "#666",
              borderRadius: "12px",
              py: 1.5,
              fontSize: "16px",
              fontWeight: 600,
              textTransform: "none",
              "&:hover": {
                borderColor: "#D1D5DB",
                bgcolor: "rgba(0,0,0,0.02)",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirm}
            sx={{
              flex: 1,
              bgcolor: "#E7A1A0", // Solid color as per new request
              borderRadius: "12px",
              py: 1.5,
              fontSize: "16px",
              fontWeight: 600,
              textTransform: "none",
              boxShadow: "0 4px 12px rgba(231, 161, 160, 0.3)", // Updated shadow color
              "&:hover": {
                bgcolor: "#DB908F", // Slightly darker on hover
                boxShadow: "0 6px 16px rgba(231, 161, 160, 0.4)",
              },
            }}
          >
            Confirm
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
