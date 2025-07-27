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


import { useFormik } from "formik"
import * as Yup from "yup"

const validationSchema = Yup.object().shape({
  sessionMode: Yup.string().required("Session mode is required"),
  sessionDate: Yup.date().required("Session date is required"),
  sessionTime: Yup.string().required("Session time is required"),
  sessionDetails: Yup.string(),
  onlineSessionLink: Yup.string().when("sessionMode", (sessionMode, schema) => 
    sessionMode && sessionMode[0] === "online"
      ? schema.required("Online session link is required for online sessions")
      : schema.notRequired()
  ),
  sessionType: Yup.string().required("Session type is required"),
})



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

const getTodayDate = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const formik = useFormik({
  initialValues: {
    sessionMode: "in-person",
    sessionDate: getTodayDate(), // This will set today's date as default
    sessionTime: "",
    sessionDetails: "",
    onlineSessionLink: "",
    sessionType: "counselling-1hr",
  },
  validationSchema,
  onSubmit: (values) => {
    // Save to local storage
    const sessions = JSON.parse(localStorage.getItem("scheduledSessions") || "[]")
    const newSession = {
      ...values,
      patient,
      practitioner,
      createdAt: new Date().toISOString(),
    }
    sessions.push(newSession)
    localStorage.setItem("scheduledSessions", JSON.stringify(sessions))
    
    // Log and navigate (navigation will be added in next phase)
    console.log("Form submitted:", values)
    // router.push('/dashboard') - will be added in next phase
  },
})


// const handleSessionModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//   const newMode = event.target.value as string 
//   setSessionMode(newMode)

//   // Update session type based on mode
//   if (newMode === "online") {
//     setSessionType("counselling")
//   } else {
//     setSessionType("counselling-1hr")
//   }
// }

const handleSessionModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const newMode = event.target.value;
  formik.setFieldValue("sessionMode", newMode);
  
  // Update session type based on mode if needed
  if (newMode === "online") {
    formik.setFieldValue("sessionType", "counselling");
  } else {
    formik.setFieldValue("sessionType", "counselling-1hr");
  }
};

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

            <Box component="form" onSubmit={formik.handleSubmit} sx={{ px: 3, pb: 3 }}>


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
                name="sessionType"
                value={formik.values.sessionType}
                onChange={formik.handleChange}
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

{/* // Session Mode Section */}


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
  <FormControl component="fieldset" error={formik.touched.sessionMode && Boolean(formik.errors.sessionMode)}>
    <RadioGroup
      row
      name="sessionMode"
      value={formik.values.sessionMode}
      onChange={formik.handleChange} // Use Formik's handleChange directly
      sx={{ gap: 4 }}
    >
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
    {formik.touched.sessionMode && formik.errors.sessionMode && (
      <Typography variant="caption" color="error" sx={{ display: 'block', mt: 1 }}>
        {formik.errors.sessionMode}
      </Typography>
    )}
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
    name="sessionDate"
    value={formik.values.sessionDate}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    error={formik.touched.sessionDate && Boolean(formik.errors.sessionDate)}
    helperText={formik.touched.sessionDate && formik.errors.sessionDate}
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
    InputProps={{
      inputProps: {
        min: getTodayDate() // Optional: prevents selecting dates in the past
      }
    }}
  />
</Box>

  <Box sx={{ flex: 1 }}>
    <Typography
      sx={{
        fontSize: "14px",
        color: "#999",
        mb: 1,
        fontWeight: 400,
        whiteSpace: "nowrap",
      }}
    >
      Session Time Slot
    </Typography>
    <TextField
      fullWidth
      name="sessionTime"
      value={formik.values.sessionTime || "HH : MM"}
      placeholder="HH : MM"
      onClick={() => setIsTimeModalOpen(true)}
      error={formik.touched.sessionTime && Boolean(formik.errors.sessionTime)}
      helperText={formik.touched.sessionTime && formik.errors.sessionTime}
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
            color: formik.values.sessionTime ? "#000" : "#999",
            fontWeight: formik.values.sessionTime ? 500 : 400,
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
{formik.values.sessionMode === "online" && (
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
      }}
    >
      <TextField
        fullWidth
        name="onlineSessionLink"
        placeholder="Add Online Session Link or WhatsApp Number"
        value={formik.values.onlineSessionLink}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.onlineSessionLink && Boolean(formik.errors.onlineSessionLink)}
        helperText={formik.touched.onlineSessionLink && formik.errors.onlineSessionLink}
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
  name="sessionDetails"
  placeholder="Enter session details here"
  value={formik.values.sessionDetails}
  onChange={formik.handleChange}
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
      borderColor: "#CC627B",
      color: "#CC627B",
      borderRadius: "12px",
      py: 1.5,
      fontSize: "16px",
      fontWeight: 600,
      textTransform: "none",
      "&:hover": {
        borderColor: "#CC627B",
        bgcolor: "rgba(204, 98, 123, 0.05)",
      },
    }}
  >
    Cancel
  </Button>
  <Button
  onClick={() => router.push("/")}
    type="submit"
    variant="contained"
    sx={{
      flex: 1,
      background: "linear-gradient(90deg, #BBA3E4 0%, #E7A1A0 100%)",
      borderRadius: "12px",
      py: 1.5,
      fontSize: "16px",
      fontWeight: 600,
      textTransform: "none",
      boxShadow: "0 4px 12px rgba(240, 200, 199, 0.3)",
      "&:hover": {
        background: "linear-gradient(90deg, #A992D0 0%, #DB908F 100%)",
      },
    }}
  >
    Confirm
  </Button>
</Box>

{/* Time Selection Modal */}


{/* <TimeSelectionModal
  open={isTimeModalOpen}
  onClose={() => setIsTimeModalOpen(false)}
  onConfirm={handleTimeConfirm}
  selectedTime={formik.values.sessionTime}
/> */}

<TimeSelectionModal
  open={isTimeModalOpen}
  onClose={() => setIsTimeModalOpen(false)}
  onConfirm={(time) => formik.setFieldValue("sessionTime", time)}
  selectedTime={formik.values.sessionTime}
  disabledTimes={["06:00 PM", "07:00 PM"]} // Example disabled times
  timeSlotCategories={[
    {
      name: "morning",
      slots: ["08:00 AM", "09:00 AM", "10:00 AM"],
    },
    {
      name: "afternoon",
      slots: ["12:00 PM", "01:00 PM", "02:00 PM"],
    },
    // Add more custom time slots as needed
  ]}
/>

       
    </Box>
    </Box>

    </Box>
  )
}
