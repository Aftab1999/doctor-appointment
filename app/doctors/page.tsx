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
  Collapse,
} from "@mui/material"
import { Search, ArrowBack, GridView, FilterList, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material"
import { useRouter } from "next/navigation"

export default function Doctors() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedCard, setExpandedCard] = useState<number | null>(0) // First card expanded by default

  const doctors = [
    {
      id: 0,
      name: "Dr. Tejas Sharma",
      phone: "+91 98765 43210",
      expertise: "Gynaecology",
      gender: "Male",
      sessionMode: "In-Person & Online",
      fee: "₹1,500/-",
      avatar: "T",
    },
    {
      id: 1,
      name: "Dr. Priya Kapoor",
      phone: "+91 98765 43210",
      expertise: "IVF Specialist",
      gender: "Female",
      sessionMode: "Online",
      fee: "₹2,000/-",
      avatar: "P",
    },
    {
      id: 2,
      name: "Dr. Pranav Saxena",
      phone: "+91 98765 43210",
      expertise: "Gynaecology",
      gender: "Male",
      sessionMode: "In-Person",
      fee: "₹1,800/-",
      avatar: "P",
    },
    {
      id: 3,
      name: "Dr. Toshib Bagde",
      phone: "+91 98765 43210",
      expertise: "Psychologist",
      gender: "Male",
      sessionMode: "Online",
      fee: "₹1,200/-",
      avatar: "T",
    },
  ]

  const handleCardToggle = (cardId: number) => {
    setExpandedCard(expandedCard === cardId ? null : cardId)
  }

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
            Available Doctors
          </Typography>
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
            <GridView sx={{ color: "#999", fontSize: "20px" }} />
          </IconButton>
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

      {/* Doctors List */}
      <Box sx={{ px: 3, pb: 3 }}>
        {doctors.map((doctor) => (
          <Card
            key={doctor.id}
            sx={{
              mb: 2,
              borderRadius: "16px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              bgcolor: "rgba(255,255,255,0.9)",
              overflow: "visible",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  mb: expandedCard === doctor.id ? 2 : 0,
                }}
                onClick={() => handleCardToggle(doctor.id)}
              >
                <Avatar
                  sx={{
                    width: 48,
                    height: 48,
                    mr: 2,
                    bgcolor: "#8B5CF6",
                    fontSize: "18px",
                    fontWeight: 600,
                  }}
                >
                  {doctor.avatar}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "#000",
                      mb: 0.5,
                    }}
                  >
                    {doctor.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#666",
                    }}
                  >
                    {doctor.phone}
                  </Typography>
                </Box>
                <IconButton sx={{ p: 0.5 }}>
                  {expandedCard === doctor.id ? (
                    <KeyboardArrowUp sx={{ color: "#666", fontSize: "24px" }} />
                  ) : (
                    <KeyboardArrowDown sx={{ color: "#666", fontSize: "24px" }} />
                  )}
                </IconButton>
              </Box>

              <Collapse in={expandedCard === doctor.id}>
                <Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "12px",
                          color: "#666",
                          mb: 0.5,
                        }}
                      >
                        Expertise
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "#000",
                        }}
                      >
                        {doctor.expertise}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "12px",
                          color: "#666",
                          mb: 0.5,
                        }}
                      >
                        Gender
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "#000",
                        }}
                      >
                        {doctor.gender}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "12px",
                          color: "#666",
                          mb: 0.5,
                        }}
                      >
                        Session mode
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "#000",
                        }}
                      >
                        {doctor.sessionMode}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "12px",
                          color: "#666",
                          mb: 0.5,
                        }}
                      >
                        Session Fee
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "#000",
                        }}
                      >
                        {doctor.fee}
                      </Typography>
                    </Box>
                  </Box>

                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => router.push("/schedule")}
                    sx={{
                      background: "linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)",
                      borderRadius: "12px",
                      py: 1.5,
                      fontSize: "16px",
                      fontWeight: 600,
                      textTransform: "none",
                      "&:hover": {
                        background: "linear-gradient(135deg, #7C3AED 0%, #DB2777 100%)",
                      },
                    }}
                  >
                    Book Now
                  </Button>
                </Box>
              </Collapse>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  )
}
