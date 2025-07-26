"use client"

import type React from "react"

import { useState } from "react"
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  TextField,
  IconButton,
  MenuItem,
  Select,
  InputAdornment,
} from "@mui/material"
import { ArrowBack, CalendarToday, AccessTime, KeyboardArrowDown } from "@mui/icons-material"
import { useRouter } from "next/navigation"
import TimeSelectionModal from "@/components/time-selection-modal"

import Image from "next/image"

import Person6 from "../../assets/svg-6.svg";
import Person7 from "../../assets/svg-7.svg";



export default function ScheduleSession() {
  const router = useRouter()
  const [sessionMode, setSessionMode] = useState("in-person")
  const [sessionDate, setSessionDate] = useState("2024-12-19")
  const [sessionTime, setSessionTime] = useState("")
  const [sessionDetails, setSessionDetails] = useState("")
  const [onlineSessionLink, setOnlineSessionLink] = useState("")
  const [sessionType, setSessionType] = useState("counselling-1hr")
  const [sessionTypeOpen, setSessionTypeOpen] = useState(false)
  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false)

  const patient = {
    name: "Shubham Naik",
    phone: "+91 98765 43210",
    // avatar: "S",
    avatar: Person6,

  }

  const practitioner = {
    name: "Sana Dillon",
    phone: "+91 98765 43210",
    // avatar: "S",
    avatar: Person7,
  }

  const sessionTypes = [
    { value: "counselling-1hr", label: "Counselling ( 1 hour )" },
    { value: "counselling", label: "Counselling" },
    { value: "therapy-1hr", label: "Therapy ( 1 hour )" },
    { value: "consultation", label: "Consultation" },
  ]

  const handleSessionModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMode = event.target.value as string // Explicitly cast to string
    setSessionMode(newMode)

    // Update session type based on mode
    if (newMode === "online") {
      setSessionType("counselling")
    } else {
      setSessionType("counselling-1hr")
    }
  }

  const handleTimeConfirm = (time: string) => {
    setSessionTime(time)
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #B0A4F5 0%, #F9CCC5 30%, #EDA197 100%)",
        maxWidth: "400px",
        mx: "auto",
        position: "relative",
      }}
    >
      {/* Status Bar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 3,
          py: 1,
          fontSize: "16px",
          fontWeight: 600,
          color: "#000",
        }}
      >
        <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>9:41</Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Box sx={{ display: "flex", gap: "2px" }}>
            <Box sx={{ width: "4px", height: "4px", bgcolor: "#000", borderRadius: "50%" }} />
            <Box sx={{ width: "4px", height: "6px", bgcolor: "#000", borderRadius: "1px" }} />
            <Box sx={{ width: "4px", height: "8px", bgcolor: "#000", borderRadius: "1px" }} />
            <Box sx={{ width: "4px", height: "10px", bgcolor: "#000", borderRadius: "1px" }} />
          </Box>
          <Box sx={{ ml: 1, fontSize: "14px" }}>📶</Box>
          <Box sx={{ ml: 1, fontSize: "14px" }}>📶</Box>
          <Box
            sx={{
              width: "24px",
              height: "12px",
              border: "1px solid #000",
              borderRadius: "2px",
              ml: 1,
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                right: "-3px",
                top: "3px",
                width: "2px",
                height: "6px",
                bgcolor: "#000",
                borderRadius: "0 1px 1px 0",
              },
            }}
          >
            <Box
              sx={{
                width: "18px",
                height: "8px",
                bgcolor: "#4CAF50",
                borderRadius: "1px",
                m: "1px",
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Header */}
      <Box sx={{ px: 3, py: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <IconButton
            onClick={() => router.back()}
            sx={{
              color: "#000",
              mr: 2,
              p: 0.5,
              "&:hover": { bgcolor: "rgba(0,0,0,0.04)" },
            }}
          >
            <ArrowBack sx={{ fontSize: "24px" }} />
          </IconButton>
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: 600,
              color: "#000",
            }}
          >
            Schedule Session
          </Typography>
        </Box>
      </Box>

      {/* Content */}
      <Box sx={{ px: 3, pb: 3 }}>
        {/* Patient Section */}
        <Typography
          sx={{
            fontSize: "14px",
            color: "#999",
            mb: 1,
            fontWeight: 400,
          }}
        >
          Patient
        </Typography>
        <Card
          sx={{
            mb: 3,
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            bgcolor: "rgba(255,255,255,0.9)",
          }}
        >
          <CardContent sx={{ p: 2.5 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  fontSize: "18px",
                  fontWeight: 600,
                }}
              >
                <img
                  src={typeof patient.avatar === "string" ? patient.avatar : patient.avatar.src}
                  alt={patient.name}
                  width={40}
                  height={40}
                  style={{ objectFit: "contain", borderRadius: "50%" }}
                />
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#000",
                    mb: 0.5,
                  }}
                >
                  {patient.name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#666",
                  }}
                >
                  {patient.phone}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Assign Practitioner Section */}
        <Typography
          sx={{
            fontSize: "14px",
            color: "#999",
            mb: 1,
            fontWeight: 400,
          }}
        >
          Assign Practitioner
        </Typography>
        <Card
          sx={{
            mb: 3,
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            bgcolor: "rgba(255,255,255,0.9)",
          }}
        >
          <CardContent sx={{ p: 2.5 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  mr: 2,
                  bgcolor: "#FF9800",
                  fontSize: "16px",
                  fontWeight: 600,
                }}
              >
                <img
                  src={typeof practitioner.avatar === "string" ? practitioner.avatar : practitioner.avatar.src}
                  alt={practitioner.name}
                  width={32}
                  height={32}
                  style={{ objectFit: "contain", width: 32, height: 32 }}
                />
              </Avatar>
              <Box>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#000",
                    mb: 0.5,
                  }}
                >
                  {practitioner.name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#666",
                  }}
                >
                  {practitioner.phone}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Session Type Section */}
        <Typography
          sx={{
            fontSize: "14px",
            color: "#999",
            mb: 1,
            fontWeight: 400,
          }}
        >
          Session Type
        </Typography>
        <Card
          sx={{
            mb: 3,
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            bgcolor: "rgba(255,255,255,0.9)",
          }}
        >
          <CardContent sx={{ p: 2.5 }}>
            <FormControl fullWidth>
              <Select
                value={sessionType || ""} // Ensure value is always a string, even if sessionType is initially empty
                onChange={(e) => setSessionType(e.target.value as string)} // Explicitly cast to string
                open={sessionTypeOpen}
                onOpen={() => setSessionTypeOpen(true)}
                onClose={() => setSessionTypeOpen(false)}
                displayEmpty
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                  "& .MuiSelect-select": {
                    fontSize: "16px",
                    fontWeight: 500,
                    color: "#000",
                    padding: 0,
                  },
                }}
                IconComponent={() => (
                  <KeyboardArrowDown
                    sx={{
                      color: "#666",
                      fontSize: "20px",
                      transform: sessionTypeOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s ease",
                    }}
                  />
                )}
              >
                {sessionTypes.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </CardContent>
        </Card>

        {/* Session Mode Section */}
        <Typography
          sx={{
            fontSize: "14px",
            color: "#999",
            mb: 1,
            fontWeight: 400,
          }}
        >
          Session Mode
        </Typography>
        <Box
          sx={{
            bgcolor: "rgba(255,255,255,0.6)",
            borderRadius: "12px",
            p: 2.5,
            mb: 3,
          }}
        >
          <FormControl component="fieldset">
            <RadioGroup row value={sessionMode} onChange={handleSessionModeChange} sx={{ gap: 4 }}>
              <FormControlLabel
                value="in-person"
                control={
                  <Radio
                    sx={{
                      color: "#D1D5DB",
                      "&.Mui-checked": {
                        color: "#8B5CF6",
                      },
                      "& .MuiSvgIcon-root": {
                        fontSize: 20,
                      },
                    }}
                  />
                }
                label={
                  <Typography
                    sx={{
                      fontSize: "16px",
                      color: "#000",
                      fontWeight: 500,
                      ml: 0.5,
                    }}
                  >
                    In-Person
                  </Typography>
                }
              />
              <FormControlLabel
                value="online"
                control={
                  <Radio
                    sx={{
                      color: "#D1D5DB",
                      "&.Mui-checked": {
                        color: "#8B5CF6",
                      },
                      "& .MuiSvgIcon-root": {
                        fontSize: 20,
                      },
                    }}
                  />
                }
                label={
                  <Typography
                    sx={{
                      fontSize: "16px",
                      color: "#000",
                      fontWeight: 500,
                      ml: 0.5,
                    }}
                  >
                    Online
                  </Typography>
                }
              />
            </RadioGroup>
          </FormControl>
        </Box>

        {/* Date and Time Section */}
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#999",
                mb: 1,
                fontWeight: 400,
              }}
            >
              Session Date
            </Typography>
            <TextField
              fullWidth
              type="date"
              value={sessionDate}
              onChange={(e) => setSessionDate(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  bgcolor: "rgba(255,255,255,0.9)",
                  height: "48px",
                  "& fieldset": {
                    borderColor: "#E5E7EB",
                  },
                  "&:hover fieldset": {
                    borderColor: "#D1D5DB",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#8B5CF6",
                  },
                  "& input": {
                    fontSize: "16px",
                    color: "#000",
                    fontWeight: 500,
                  },
                },
              }}
            // InputProps={{
            //   endAdornment: (
            //     <InputAdornment position="end">
            //       <CalendarToday sx={{ color: "#999", fontSize: "20px" }} />
            //     </InputAdornment>
            //   ),
            // }}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#999",
                mb: 1,
                fontWeight: 400,
              }}
            >
              Session Time Slot
            </Typography>
            <TextField
              fullWidth
              value={sessionTime || "HH : MM"} // Display placeholder if sessionTime is empty
              placeholder="HH : MM"
              onClick={() => setIsTimeModalOpen(true)}
              // readOnly
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  bgcolor: "rgba(255,255,255,0.9)",
                  height: "48px",
                  cursor: "pointer",
                  "& fieldset": {
                    borderColor: "#E5E7EB",
                  },
                  "&:hover fieldset": {
                    borderColor: "#D1D5DB",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#8B5CF6",
                  },
                  "& input": {
                    fontSize: "16px",
                    color: sessionTime ? "#000" : "#999", // Change color based on whether time is selected
                    fontWeight: sessionTime ? 500 : 400,
                    cursor: "pointer",
                  },
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <AccessTime sx={{ color: "#999", fontSize: "20px" }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>

        {/* Conditional Online Session Link Section - Only show when Online is selected */}
        {sessionMode === "online" && (
          <Box sx={{ mb: 3 }}>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#999",
                mb: 1,
                fontWeight: 400,
              }}
            >
              Online Session Link
            </Typography>
            <Box
              sx={{
                bgcolor: "#FFF",
                borderRadius: "12px",
                // p: 2.5,
              }}
            >
              <TextField
                fullWidth
                placeholder="Add Online Session Link or WhatsApp Number"
                value={onlineSessionLink}
                onChange={(e) => setOnlineSessionLink(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "transparent",
                    height: "48px",
                    "& fieldset": {
                      border: "none",
                    },
                    "& input": {
                      fontSize: "16px",
                      color: "#000",
                      fontWeight: 400,
                    },
                    "& input::placeholder": {
                      color: "#999",
                      opacity: 1,
                    },
                  },
                }}
              />
            </Box>
          </Box>
        )}

        {/* Session Details Section */}
        <Typography
          sx={{
            fontSize: "14px",
            color: "#999",
            mb: 1,
            fontWeight: 400,
          }}
        >
          Session Details (Optional)
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          placeholder="Enter session details here"
          value={sessionDetails}
          onChange={(e) => setSessionDetails(e.target.value)}
          sx={{
            mb: 4,
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              bgcolor: "rgba(255,255,255,0.9)",
              "& fieldset": {
                borderColor: "#E5E7EB",
              },
              "&:hover fieldset": {
                borderColor: "#D1D5DB",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#8B5CF6",
              },
              "& textarea": {
                fontSize: "16px",
                color: "#000",
                fontWeight: 400,
              },
              "& textarea::placeholder": {
                color: "#999",
                opacity: 1,
              },
            },
          }}
        />

        {/* Action Buttons */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => router.back()}
            sx={{
              flex: 1,
              borderColor: "#CC627B", // Border color
              color: "#CC627B", // Text color
              borderRadius: "12px",
              py: 1.5,
              fontSize: "16px",
              fontWeight: 600,
              textTransform: "none",
              "&:hover": {
                borderColor: "#CC627B", // Keep border color on hover
                bgcolor: "rgba(204, 98, 123, 0.05)", // Subtle background on hover
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              console.log("Form Data:", {
                sessionMode,
                sessionType,
                sessionDate,
                sessionTime,
                onlineSessionLink,
                sessionDetails,
              })
            }}
            sx={{
              flex: 1,
              // bgcolor: "#F0C8C7",
               background: "linear-gradient(90deg, #BBA3E4 0%, #E7A1A0 100%)",
              borderRadius: "12px",
              py: 1.5,
              fontSize: "16px",
              fontWeight: 600,
              textTransform: "none",
              boxShadow: "0 4px 12px rgba(240, 200, 199, 0.3)", // Updated shadow color
              // "&:hover": {
              //   bgcolor: "#E7A1A0", 
              //   boxShadow: "0 6px 16px rgba(240, 200, 199, 0.4)",
              // },
               "&:hover": {
      background: "linear-gradient(90deg, #A992D0 0%, #DB908F 100%)", // Darker gradient on hover
    },
            }}
          >
            Confirm
          </Button>
        </Box>
      </Box>

      {/* Time Selection Modal */}
      <TimeSelectionModal
        open={isTimeModalOpen}
        onClose={() => setIsTimeModalOpen(false)}
        onConfirm={handleTimeConfirm}
        selectedTime={sessionTime}
      />
    </Box>
  )
}
