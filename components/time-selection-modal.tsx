"use client"

import React from "react"

import type { ReactElement } from "react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Slide,
} from "@mui/material"
import type { TransitionProps } from "@mui/material/transitions"
import { Close, KeyboardArrowDown } from "@mui/icons-material"

interface TimeSelectionModalProps {
  open: boolean
  onClose: () => void
  onConfirm: (time: string) => void
  selectedTime: string
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})

const timeSlots = {
  Morning: ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM"],
  Afternoon: ["12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM"],
  Evening: ["04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM"],
  Night: ["08:00 PM", "09:00 PM", "10:00 PM", "11:00 PM"],
}

// Example of disabled times (you can make this dynamic based on availability)
const disabledTimes = ["06:00 PM", "07:00 PM", "11:00 PM"]

export default function TimeSelectionModal({
  open,
  onClose,
  onConfirm,
  selectedTime: initialSelectedTime,
}: TimeSelectionModalProps): ReactElement {
  const [selectedTime, setSelectedTime] = useState(initialSelectedTime)
  const [expanded, setExpanded] = useState<string | false>("Morning") // Default to Morning expanded

  const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handleConfirm = () => {
    onConfirm(selectedTime)
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition} // Apply the slide-up transition
      keepMounted // Keep mounted for smoother transition
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          position: "absolute", // Position absolutely
          bottom: 0, // Stick to the bottom
          margin: 0, // Remove default margins
          borderRadius: "16px 16px 0 0", // Rounded top corners, sharp bottom
          bgcolor: "#f8f4ff",
          boxShadow: "0 -8px 24px rgba(0,0,0,0.1)", // Shadow on top
          maxHeight: "80vh", // Limit height to prevent overflow
          width: "100%", // Take full width
        },
      }}
    >
      <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: "#000" }}>
          Select Session Time
        </Typography>
        <IconButton onClick={onClose} sx={{ color: "#666" }}>
          <Close />
        </IconButton>
      </Box>
      <DialogContent dividers sx={{ p: 0, borderTop: "none", borderBottom: "none" }}>
        {Object.entries(timeSlots).map(([category, times]) => (
          <Accordion
            key={category}
            expanded={expanded === category}
            onChange={handleAccordionChange(category)}
            disableGutters
            sx={{
              bgcolor: "transparent",
              boxShadow: "none",
              "&:before": { display: "none" },
              "&.Mui-expanded": { margin: 0 },
            }}
          >
            <AccordionSummary
              expandIcon={<KeyboardArrowDown sx={{ color: "#666" }} />}
              sx={{
                bgcolor: "rgba(255,255,255,0.8)",
                borderRadius: "12px",
                mx: 2,
                mb: 1,
                "&.Mui-expanded": { minHeight: "48px" },
                "& .MuiAccordionSummary-content": {
                  margin: "12px 0",
                  "&.Mui-expanded": { margin: "12px 0" },
                },
              }}
            >
              <Typography sx={{ fontWeight: 600, color: "#000" }}>{category}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 2, pb: 2, pt: 0 }}>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {times.map((time) => {
                  const isDisabled = disabledTimes.includes(time)
                  const isSelected = selectedTime === time
                  return (
                    <Button
                      key={time}
                      variant={isSelected ? "contained" : "outlined"}
                      onClick={() => handleTimeSelect(time)}
                      disabled={isDisabled}
                      sx={{
                        minWidth: "80px",
                        height: "40px",
                        borderRadius: "8px",
                        fontWeight: 500,
                        fontSize: "14px",
                        textTransform: "none",
                        borderColor: isSelected ? "#8B5CF6" : "#E5E7EB",
                        color: isSelected ? "white" : isDisabled ? "#B0B0B0" : "#000",
                        bgcolor: isSelected ? "#8B5CF6" : isDisabled ? "#F3F4F6" : "rgba(255,255,255,0.9)",
                        "&:hover": {
                          borderColor: isSelected ? "#7C3AED" : "#D1D5DB",
                          bgcolor: isSelected ? "#7C3AED" : isDisabled ? "#F3F4F6" : "rgba(255,255,255,0.7)",
                        },
                        "&.Mui-disabled": {
                          color: "#B0B0B0",
                          borderColor: "#E5E7EB",
                          bgcolor: "#F3F4F6",
                        },
                      }}
                    >
                      {time}
                    </Button>
                  )
                })}
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </DialogContent>
      <DialogActions sx={{ p: 2, display: "flex", gap: 2 }}>
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
            background: "linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)",
            borderRadius: "12px",
            py: 1.5,
            fontSize: "16px",
            fontWeight: 600,
            textTransform: "none",
            boxShadow: "0 4px 12px rgba(139, 92, 246, 0.3)",
            "&:hover": {
              background: "linear-gradient(135deg, #7C3AED 0%, #DB2777 100%)",
              boxShadow: "0 6px 16px rgba(139, 92, 246, 0.4)",
            },
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}
