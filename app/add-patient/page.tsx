"use client"

import { useState } from "react"
import { Box, Typography, TextField, Button, Container, IconButton, FormControlLabel, Checkbox } from "@mui/material"
import { ArrowBack } from "@mui/icons-material"
import { useRouter } from "next/navigation"

export default function AddPatient() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    whatsapp: "",
    email: "",
    address: "",
    sameAsWhatsApp: false,
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "mobile" && prev.sameAsWhatsApp ? { whatsapp: value as string } : {}),
    }))
  }

  const handleWhatsAppCheckbox = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      sameAsWhatsApp: checked,
      whatsapp: checked ? prev.mobile : "",
    }))
  }

  const handleSubmit = () => {
    // Validate and save patient data
    console.log("Patient data:", formData)
    router.push("/schedule")
  }

  return (
    <Container maxWidth="sm" sx={{ p: 0, minHeight: "100vh", bgcolor: "#f8f4ff" }}>
      {/* Header */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #b794f6 0%, #9f7aea 100%)",
          p: 3,
          color: "white",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={() => router.back()} sx={{ color: "white", mr: 2 }}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Add New Patient
          </Typography>
        </Box>
      </Box>

      {/* Form */}
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: "#4a5568" }}>
          Patient Information
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <TextField
            fullWidth
            label="Full Name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />

          <TextField
            fullWidth
            label="Mobile Number"
            type="tel"
            value={formData.mobile}
            onChange={(e) => handleInputChange("mobile", e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />

          <Box>
            <TextField
              fullWidth
              label="WhatsApp Number"
              type="tel"
              value={formData.whatsapp}
              onChange={(e) => handleInputChange("whatsapp", e.target.value)}
              disabled={formData.sameAsWhatsApp}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.sameAsWhatsApp}
                  onChange={(e) => handleWhatsAppCheckbox(e.target.checked)}
                  sx={{
                    color: "#b794f6",
                    "&.Mui-checked": { color: "#b794f6" },
                  }}
                />
              }
              label="Same as Mobile Number"
              sx={{ mt: 1 }}
            />
          </Box>

          <TextField
            fullWidth
            label="Email ID"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />

          <TextField
            fullWidth
            label="Address"
            multiline
            rows={3}
            value={formData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
          <Button
            variant="outlined"
            onClick={() => router.back()}
            sx={{
              flex: 1,
              borderColor: "#b794f6",
              color: "#b794f6",
              borderRadius: 2,
              py: 1.5,
              fontWeight: 600,
              textTransform: "none",
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              flex: 1,
              bgcolor: "#b794f6",
              borderRadius: 2,
              py: 1.5,
              fontWeight: 600,
              textTransform: "none",
              "&:hover": { bgcolor: "#9f7aea" },
            }}
          >
            Save & Continue
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
