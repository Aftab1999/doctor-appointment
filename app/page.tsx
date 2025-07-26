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
  Stack,
} from "@mui/material"
import { Search, FilterList, Person, KeyboardArrowDown, AccessTime, VideoCall } from "@mui/icons-material"
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
            <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
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
              <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
                <Avatar sx={{ width: 32, height: 32, mr: 1, bgcolor: "#E5E7EB" }}>
                  <Person sx={{ fontSize: "18px", color: "#666" }} />
                </Avatar>
                <Avatar sx={{ width: 32, height: 32, bgcolor: "#8B5CF6" }}>
                  <Person sx={{ fontSize: "18px", color: "white" }} />
                </Avatar>
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#000",
                  mr: 1,
                }}
              >
                {upcomingSession.doctor}
              </Typography>
              <KeyboardArrowDown sx={{ color: "#666", fontSize: "20px" }} />
            </Box>

            <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  bgcolor: "#F3F4F6",
                  px: 2,
                  py: 0.5,
                  borderRadius: "8px",
                }}
              >
                <AccessTime sx={{ fontSize: "14px", color: "#666", mr: 0.5 }} />
                <Typography sx={{ fontSize: "12px", color: "#666" }}>
                  Session Duration: {upcomingSession.duration}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  bgcolor: "#F3F4F6",
                  px: 2,
                  py: 0.5,
                  borderRadius: "8px",
                }}
              >
                <VideoCall sx={{ fontSize: "14px", color: "#666", mr: 0.5 }} />
                <Typography sx={{ fontSize: "12px", color: "#666" }}>Session Mode: {upcomingSession.mode}</Typography>
              </Box>
            </Stack>

            <Button
              variant="contained"
              sx={{
                bgcolor: "#8B5CF6",
                borderRadius: "12px",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "14px",
                py: 1.5,
                px: 3,
                mb: 2,
                "&:hover": { bgcolor: "#7C3AED" },
              }}
            >
              Mark as Completed
            </Button>

            <Typography
              sx={{
                fontSize: "12px",
                color: "#666",
              }}
            >
              Previous Session: {upcomingSession.previousDate}
            </Typography>
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
            background: "linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)",
            borderRadius: "16px",
            py: 2,
            fontSize: "16px",
            fontWeight: 600,
            textTransform: "none",
            boxShadow: "0 4px 20px rgba(139, 92, 246, 0.3)",
            mb: 3,
            "&:hover": {
              background: "linear-gradient(135deg, #7C3AED 0%, #DB2777 100%)",
            },
          }}
        >
          Schedule Now
        </Button>
      </Box>
    </Box>
  )
}
