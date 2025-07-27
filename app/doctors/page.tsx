"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Search,
  ArrowBack,
  GridView,
  FilterList,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";

import Person2 from "../../assets/svg-2.svg";
import Person3 from "../../assets/svg-3.svg";
import Person4 from "../../assets/svg-4.svg";
import Person5 from "../../assets/svg-5.svg";

import DoctorCard from "../../components/DoctorCard";
import doctors from "../../data/doctorsData";

const Doctors = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCard, setExpandedCard] = useState<number | null>(0);

  const handleCardToggle = (id: number) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const handleBook = (id: number) => {
    const doctor = doctors.find((doc) => doc.id === id);
    if (doctor) {
      sessionStorage.setItem("selectedDoctor", JSON.stringify(doctor));
      router.push("/schedule");
    }
  };

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.expertise.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <Typography>9:41</Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          📶 📶 🔋
        </Box>
      </Box>

      {/* Header */}
      <Box sx={{ px: 3, py: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <IconButton onClick={() => router.back()} sx={{ mr: 2 }}>
            <ArrowBack />
          </IconButton>
          <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: "#999" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                bgcolor: "rgba(255,255,255,0.8)",
                borderRadius: "12px",
                height: "48px",
                "& fieldset": { border: "none" },
              },
            }}
          />
          <IconButton
            sx={{ bgcolor: "rgba(255,255,255,0.8)", borderRadius: "12px" }}
          >
            <GridView />
          </IconButton>
          <IconButton
            sx={{ bgcolor: "rgba(255,255,255,0.8)", borderRadius: "12px" }}
          >
            <FilterList />
          </IconButton>
        </Box>
      </Box>

      {/* Doctor Cards */}
      <Box sx={{ px: 3, pb: 3 }}>
        {filteredDoctors.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            doctor={doctor}
            expandedCard={expandedCard}
            handleCardToggle={handleCardToggle}
            onBook={handleBook}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Doctors;
