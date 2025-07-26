"use client"

import { useState } from "react"
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  Avatar,
  Button,
  IconButton,
} from "@mui/material"
import { Search, FilterList, Person, KeyboardArrowDown, AccessTime, Call, LocationOn } from "@mui/icons-material"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const upcomingSession = {
    time: "11:00 AM",
    location: "Bandra",
    doctor: "Dr. Kiran Rathi",
    duration: "01:00 HR",
    mode: "Online",
    previousDate: "Tuesday, March 5, 2023",
  }

  const pastSessions = [
    {
      time: "12:00 AM",
      doctor: "Dr. Ramesh Naik",
      type: "Previous Session",
      date: "Tuesday, March 21, 2023",
    },
    {
      time: "10:30 AM",
      doctor: "Dr. Suresh Sawant",
      type: "Previous Session",
      date: "Tuesday, March 19, 2023",
    },
    {
      time: "09:30 AM",
      doctor: "Dr. Neeta Singh",
      type: "Previous Session",
      date: "Tuesday, Feb 29, 2023",
    },
  ]

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #E8D5FF 0%, #F5E6FF 50%, #FFE4E6 100%)",
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
        <Typography
          sx={{
            fontSize: "14px",
            color: "#666",
            mb: 0.5,
            fontWeight: 400,
          }}
        >
          Good morning
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: 600,
              color: "#000",
            }}
          >
            Manjunath Naik
          </Typography>
          <Avatar
            sx={{
              width: 40,
              height: 40,
              bgcolor: "#8B5CF6",
            }}
          >
            <Person sx={{ color: "white" }} />
          </Avatar>
        </Box>

        {/* Search Bar */}
        <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Search Psychologists"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                bgcolor: "rgba(255,255,255,0.8)",
                borderRadius: "12px",
                height: "48px",
                "& fieldset": { border: "none" },
                "& input": {
                  fontSize: "14px",
                  color: "#666",
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: "#999", fontSize: "20px" }} />
                </InputAdornment>
              ),
            }}
          />
          <IconButton
            sx={{
              bgcolor: "rgba(255,255,255,0.8)",
              borderRadius: "12px",
              width: 48,
              height: 48,
            }}
          >
            <FilterList sx={{ color: "#999", fontSize: "20px" }} />
          </IconButton>
        </Box>
      </Box>

      {/* Content */}
      <Box sx={{ px: 3 }}>
        {/* Upcoming Session */}
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 600,
            color: "#000",
            mb: 2,
          }}
        >
          Upcoming Session
        </Typography>

        <Card
          sx={{
            mb: 3,
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            bgcolor: "rgba(255,255,255,0.9)",
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Box sx={{ mr: 2 }}>
                <Typography
                  sx={{
                    fontSize: "28px",
                    fontWeight: 700,
                    color: "#000",
                    lineHeight: 1,
                  }}
                >
                  {upcomingSession.time}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#666",
                    mt: 0.5,
                  }}
                >
                  {upcomingSession.location}
                </Typography>
              </Box>
              {/* Vertical divider */}
              <Box
                sx={{
                  width: "1px",
                  height: "60px",
                  bgcolor: "#E5E7EB",
                  mx: 2,
                }}
              />
              <Avatar
                sx={{
                  width: 48,
                  height: 48,
                  mr: 1.5,
                  bgcolor: "#E5E7EB",
                  // Placeholder image for the doctor
                  backgroundImage: `url(/placeholder.jpg?height=48&width=48&query=male doctor portrait)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <Box sx={{ flexGrow: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "#000",
                    }}
                  >
                    {upcomingSession.doctor}
                  </Typography>
                  <IconButton size="small" sx={{ color: "#666" }}>
                    <KeyboardArrowDown sx={{ fontSize: "20px" }} />
                  </IconButton>
                </Box>
                <IconButton
                  sx={{
                    bgcolor: "#8B5CF6",
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    mt: 0.5,
                    "&:hover": { bgcolor: "#7C3AED" },
                  }}
                >
                  <Call sx={{ fontSize: "16px", color: "white" }} />
                </IconButton>
              </Box>
            </Box>

            {/* Session Duration and Mode - now stacked and without background */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                <AccessTime sx={{ fontSize: "14px", color: "#666", mr: 0.5 }} />
                <Typography sx={{ fontSize: "12px", color: "#666" }}>
                  Session Duration: {upcomingSession.duration}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <LocationOn sx={{ fontSize: "14px", color: "#666", mr: 0.5 }} />
                <Typography sx={{ fontSize: "12px", color: "#666" }}>Session Mode: {upcomingSession.mode}</Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#E7A1A0", // Solid color as per new request
                  borderRadius: "12px",
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "14px",
                  py: 1.5,
                  px: 3,
                  "&:hover": {
                    bgcolor: "#DB908F", // Slightly darker on hover
                  },
                }}
              >
                Mark as Completed
              </Button>

              <Typography
                sx={{
                  fontSize: "12px",
                  color: "#666",
                  textAlign: "right",
                }}
              >
                Previous Session: {upcomingSession.previousDate}
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Past Sessions */}
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 600,
            color: "#000",
            mb: 2,
          }}
        >
          Past Sessions
        </Typography>

        <Card
          sx={{
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            bgcolor: "rgba(255,255,255,0.9)",
            mb: 3,
          }}
        >
          <CardContent sx={{ p: 0 }}>
            {pastSessions.map((session, index) => (
              <Box
                key={index}
                sx={{
                  p: 3,
                  borderBottom: index < pastSessions.length - 1 ? "1px solid #F3F4F6" : "none",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "#000",
                      mr: 3,
                      minWidth: "70px",
                    }}
                  >
                    {session.time}
                  </Typography>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#000",
                        mb: 0.5,
                      }}
                    >
                      {session.doctor}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "#666",
                        mb: 0.5,
                      }}
                    >
                      {session.type}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "#666",
                      }}
                    >
                      {session.date}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </CardContent>
        </Card>

        {/* Schedule Now Button */}
        <Button
          fullWidth
          variant="contained"
          onClick={() => router.push("/doctors")}
          sx={{
            bgcolor: "#E7A1A0", // Solid color as per new request
            borderRadius: "16px",
            py: 2,
            fontSize: "16px",
            fontWeight: 600,
            textTransform: "none",
            boxShadow: "0 4px 20px rgba(231, 161, 160, 0.3)", // Updated shadow color
            mb: 3,
            "&:hover": {
              bgcolor: "#DB908F", // Slightly darker on hover
            },
          }}
        >
          Schedule Now
        </Button>
      </Box>
    </Box>
  )
}
