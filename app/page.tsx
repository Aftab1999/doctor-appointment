"use client"

import { useState, useEffect } from "react"
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
import { Search, FilterList, KeyboardArrowDown, AccessTime, LocationOn } from "@mui/icons-material"
import { useRouter } from "next/navigation"

import doctorPortrait from "../assets/sgv-1.svg"
import CallIcon from "../assets/caller.svg"
import ProfileIcon from "../assets/profile.svg"

interface Session {
  sessionMode: string
  sessionDate: string
  sessionTime: string
  sessionDetails?: string
  onlineSessionLink?: string
  sessionType: string
  patient: {
    name: string
    phone: string
    avatar: string
  }
  practitioner: {
    name: string
    phone: string
    avatar: string
  }
  createdAt: string
}

export default function Dashboard() {


 const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [upcomingSession, setUpcomingSession] = useState<Session | null>(null)
  const [pastSessions, setPastSessions] = useState<any[]>([]) // You can define proper type for past sessions

  useEffect(() => {
    // Load sessions from localStorage
    const sessions = JSON.parse(localStorage.getItem("scheduledSessions") || "[]")
    
    if (sessions.length > 0) {
      // Find the most recent upcoming session (simplified logic - you might want to filter by date)
      const mostRecentSession = sessions[sessions.length - 1]
      setUpcomingSession(mostRecentSession)

      // For demo purposes, using the same session as past session
      // In a real app, you would filter by date and separate upcoming/past
      setPastSessions(sessions.slice(0, -1).reverse()) // Exclude the most recent and reverse to show newest first
    }
  }, [])

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        // background: "linear-gradient(180deg, #E8D5FF 0%, #F5E6FF 50%, #FFE4E6 100%)",
         background: "linear-gradient(135deg, #B0A4F5 0%, #F9CCC5 30%, #EDA197 100%)",
        maxWidth: "420px",
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
          color: "#FFF",
            // mb: 0.5,
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
              color: "#FFF",
            }}
          >
            Manjunath Naik
          </Typography>

          {/* <Avatar
            sx={{
              width: 40,
              height: 40,
              bgcolor: "#8B5CF6",
            }}
          >
          
          </Avatar> */}

          <Avatar
                sx={{
                  width: 48,
                  height: 48,
                  mr: 1.5,
                  marginBottom: "10px",
                  bgcolor: "#8B5CF6",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                 alt="Doctor Portrait"
                 src={ProfileIcon.src} 
              />


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

        {upcomingSession ? (
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
                      fontSize: "20px",
                      fontWeight: 600,
                      color: "#000",
                      lineHeight: 1,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {upcomingSession.sessionTime}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#6D6A5D",
                      mt: 0.5,
                    }}
                  >
                    {upcomingSession.sessionMode === 'in-person' ? 'Clinic Location' : 'Online Session'}
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
                    marginBottom: "10px",
                    bgcolor: "#E5E7EB",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  alt="Doctor Portrait"
                  src={doctorPortrait.src} 
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "#000",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {upcomingSession.practitioner.name}
                    </Typography>
                    <IconButton size="small" sx={{ color: "#666" }}>
                      <KeyboardArrowDown sx={{ fontSize: "20px" }} />
                    </IconButton>
                  </Box>

                  <img src={CallIcon.src} alt="Call Icon" style={{ width: "25px", height: "25px" }} />
                </Box>
              </Box>

              {/* Session Duration and Mode */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                  <AccessTime sx={{ fontSize: "14px", color: "#666", mr: 0.5 }} />
                  <Typography sx={{ fontSize: "12px", color: "#666" }}>
                    Session Type: {upcomingSession.sessionType}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <LocationOn sx={{ fontSize: "14px", color: "#666", mr: 0.5 }} />
                  <Typography sx={{ fontSize: "12px", color: "#666" }}>
                    Session Mode: {upcomingSession.sessionMode}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Button
                  variant="contained"
                  sx={{
                    height: "43px",
                    width: "197px",
                    whiteSpace: "nowrap",
                    background: "linear-gradient(90deg, #BBA3E4 0%, #E7A1A0 100%)",
                    borderRadius: "12px",
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "14px",
                    py: 1.5,
                    px: 3,
                    color: "white",
                    "&:hover": {
                      background: "linear-gradient(90deg, #A992D0 0%, #DB908F 100%)",
                    },
                    boxShadow: "none",
                  }}
                >
                  Mark as Completed
                </Button>

                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "#666",
                    pl: 1,
                  }}
                >
                  Scheduled for: <br/>
                  <span style={{ whiteSpace: "nowrap" }}>
                    {formatDate(upcomingSession.sessionDate)}
                  </span>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ) : (
          <Typography sx={{ mb: 3, color: "#666" }}>
            No upcoming sessions scheduled.
          </Typography>
        )}

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

        {pastSessions.length > 0 ? (
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
                      {session.sessionTime}
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
                        {session.practitioner.name}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "12px",
                          color: "#666",
                          mb: 0.5,
                        }}
                      >
                        {session.sessionType}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "12px",
                          color: "#666",
                        }}
                      >
                        {formatDate(session.sessionDate)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        ) : (
          <Typography sx={{ mb: 3, color: "#666" }}>
            No past sessions found.
          </Typography>
        )}

        {/* Schedule Now Button */}
        <Button
          fullWidth
          variant="contained"
          onClick={() => router.push("/doctors")}
          sx={{
            height: "43px",
            background: "linear-gradient(90deg, #BBA3E4 0%, #E7A1A0 100%)",
            borderRadius: "12px",
            py: 2,
            fontSize: "16px",
            fontWeight: 600,
            textTransform: "none",
            boxShadow: "0 4px 20px rgba(231, 161, 160, 0.3)",
            mb: 3,
            "&:hover": {
              background: "linear-gradient(90deg, #A992D0 0%, #DB908F 100%)",
            },
          }}
        >
          Schedule Now
        </Button>
      </Box>

     
    </Box>
  )
}
