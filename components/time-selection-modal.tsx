"use client"

import { useState, useEffect } from "react"
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

interface TimeSlotCategory {
  name: string
  slots: string[]
  disabledSlots?: string[]
}

interface TimeSelectionModalProps {
  open: boolean
  onClose: () => void
  onConfirm: (time: string) => void
  selectedTime: string
  timeSlotCategories?: TimeSlotCategory[]
  defaultExpandedCategory?: string
  disabledTimes?: string[]
}

export default function TimeSelectionModal({
  open,
  onClose,
  onConfirm,
  selectedTime,
  timeSlotCategories,
  defaultExpandedCategory = "morning",
  disabledTimes = [],
}: TimeSelectionModalProps) {
  const [currentTime, setCurrentTime] = useState(selectedTime)
  const [expandedPanel, setExpandedPanel] = useState<string | false>(defaultExpandedCategory)

  // Default time slots with all four categories
  const defaultTimeSlots: TimeSlotCategory[] = [
    {
      name: "morning",
      slots: ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM"],
    },
    {
      name: "afternoon", 
      slots: ["12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM"],
    },
    {
      name: "evening",
      slots: ["04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM"],
    },
    {
      name: "night",
      slots: ["08:00 PM", "09:00 PM", "10:00 PM", "11:00 PM"],
    },
  ]

  const categories = timeSlotCategories || defaultTimeSlots

  const handleTimeSelect = (time: string) => {
    setCurrentTime(time)
  }

  const handleConfirm = () => {
    if (currentTime) {
      onConfirm(currentTime)
      onClose()
    }
  }

  const handlePanelChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedPanel(isExpanded ? panel : false)
  }

  const isTimeDisabled = (time: string) => {
    return disabledTimes.includes(time)
  }

  useEffect(() => {
    setCurrentTime(selectedTime)
  }, [selectedTime, open])

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
          maxWidth: "400px",
          borderRadius: "16px 16px 0 0",
          boxShadow: "0 -8px 24px rgba(0,0,0,0.1)",
          maxHeight: "80vh",
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

        {/* Time slot categories accordion */}
        <Box sx={{ maxHeight: '60vh', overflowY: 'auto', mb: 2 }}>
          {/* Morning */}
          <Accordion
            expanded={expandedPanel === "morning"}
            onChange={handlePanelChange("morning")}
            disableGutters
            elevation={0}
            sx={{
              bgcolor: "transparent",
              "&:before": { display: "none" },
              borderBottom: "1px solid #F3F4F6",
            }}
          >
            <AccordionSummary
              expandIcon={
                expandedPanel === "morning" ? (
                  <KeyboardArrowUp sx={{ color: "#666" }} />
                ) : (
                  <KeyboardArrowDown sx={{ color: "#666" }} />
                )
              }
              sx={{
                px: 0,
                minHeight: "48px",
                "& .MuiAccordionSummary-content": { my: 1 },
              }}
            >
              <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>Morning</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 0, pb: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
              {defaultTimeSlots[0].slots.map((time) => (
                <TimeSlotButton 
                  key={time}
                  time={time}
                  isSelected={currentTime === time}
                  isDisabled={isTimeDisabled(time)}
                  onClick={() => handleTimeSelect(time)}
                />
              ))}
            </AccordionDetails>
          </Accordion>

          {/* Afternoon */}
          <Accordion
            expanded={expandedPanel === "afternoon"}
            onChange={handlePanelChange("afternoon")}
            disableGutters
            elevation={0}
            sx={{
              bgcolor: "transparent",
              "&:before": { display: "none" },
              borderBottom: "1px solid #F3F4F6",
            }}
          >
            <AccordionSummary
              expandIcon={
                expandedPanel === "afternoon" ? (
                  <KeyboardArrowUp sx={{ color: "#666" }} />
                ) : (
                  <KeyboardArrowDown sx={{ color: "#666" }} />
                )
              }
              sx={{
                px: 0,
                minHeight: "48px",
                "& .MuiAccordionSummary-content": { my: 1 },
              }}
            >
              <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>Afternoon</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 0, pb: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
              {defaultTimeSlots[1].slots.map((time) => (
                <TimeSlotButton 
                  key={time}
                  time={time}
                  isSelected={currentTime === time}
                  isDisabled={isTimeDisabled(time)}
                  onClick={() => handleTimeSelect(time)}
                />
              ))}
            </AccordionDetails>
          </Accordion>

          {/* Evening */}
          <Accordion
            expanded={expandedPanel === "evening"}
            onChange={handlePanelChange("evening")}
            disableGutters
            elevation={0}
            sx={{
              bgcolor: "transparent",
              "&:before": { display: "none" },
              borderBottom: "1px solid #F3F4F6",
            }}
          >
            <AccordionSummary
              expandIcon={
                expandedPanel === "evening" ? (
                  <KeyboardArrowUp sx={{ color: "#666" }} />
                ) : (
                  <KeyboardArrowDown sx={{ color: "#666" }} />
                )
              }
              sx={{
                px: 0,
                minHeight: "48px",
                "& .MuiAccordionSummary-content": { my: 1 },
              }}
            >
              <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>Evening</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 0, pb: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
              {defaultTimeSlots[2].slots.map((time) => (
                <TimeSlotButton 
                  key={time}
                  time={time}
                  isSelected={currentTime === time}
                  isDisabled={isTimeDisabled(time)}
                  onClick={() => handleTimeSelect(time)}
                />
              ))}
            </AccordionDetails>
          </Accordion>

          {/* Night */}
          <Accordion
            expanded={expandedPanel === "night"}
            onChange={handlePanelChange("night")}
            disableGutters
            elevation={0}
            sx={{
              bgcolor: "transparent",
              "&:before": { display: "none" },
              borderBottom: "1px solid #F3F4F6",
              "&:last-child": { borderBottom: "none" },
            }}
          >
            <AccordionSummary
              expandIcon={
                expandedPanel === "night" ? (
                  <KeyboardArrowUp sx={{ color: "#666" }} />
                ) : (
                  <KeyboardArrowDown sx={{ color: "#666" }} />
                )
              }
              sx={{
                px: 0,
                minHeight: "48px",
                "& .MuiAccordionSummary-content": { my: 1 },
              }}
            >
              <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>Night</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 0, pb: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
              {defaultTimeSlots[3].slots.map((time) => (
                <TimeSlotButton 
                  key={time}
                  time={time}
                  isSelected={currentTime === time}
                  isDisabled={isTimeDisabled(time)}
                  onClick={() => handleTimeSelect(time)}
                />
              ))}
            </AccordionDetails>
          </Accordion>
        </Box>

        {/* Action buttons */}
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
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
            disabled={!currentTime}
            sx={{
              flex: 1,
              bgcolor: "#CC627B",
              borderRadius: "12px",
              py: 1.5,
              fontSize: "16px",
              fontWeight: 600,
              textTransform: "none",
              boxShadow: "0 4px 12px rgba(204, 98, 123, 0.3)",
              "&:hover": {
                bgcolor: "#B5576A",
                boxShadow: "0 6px 16px rgba(204, 98, 123, 0.4)",
              },
              "&.Mui-disabled": {
                bgcolor: "#F3F4F6",
                color: "#D1D5DB",
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

// Reusable Time Slot Button Component
function TimeSlotButton({
  time,
  isSelected,
  isDisabled,
  onClick,
}: {
  time: string
  isSelected: boolean
  isDisabled: boolean
  onClick: () => void
}) {
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      disabled={isDisabled}
      sx={{
        minWidth: "80px",
        height: "40px",
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: 500,
        textTransform: "none",
        borderColor: isSelected ? "#CC627B" : "#E5E7EB",
        color: isSelected ? "#FFFFFF" : isDisabled ? "#D1D5DB" : "#000000",
        bgcolor: isSelected ? "#CC627B" : isDisabled ? "#F3F4F6" : "transparent",
        ...(!isDisabled && {
          "&:hover": {
            borderColor: "#CC627B",
            bgcolor: "rgba(204, 98, 123, 0.1)",
          },
        }),
        pointerEvents: isDisabled ? "none" : "auto",
      }}
    >
      {time}
    </Button>
  )
}