// components/DoctorCard.tsx
import {
  Box,
  Card,
  CardContent,
  Collapse,
  Typography,
  IconButton,
  Button,
} from "@mui/material"
import Image from "next/image"
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material"

export interface Doctor {
  id: number
  name: string
  phone: string
  expertise: string
  gender: string
  sessionMode: string
  fee: string
  avatar: string
}

interface DoctorCardProps {
  doctor: Doctor
  expandedCard: number | null
  handleCardToggle: (id: number) => void
  onBook: (id: number) => void
}

const DoctorCard = ({
  doctor,
  expandedCard,
  handleCardToggle,
  onBook,
}: DoctorCardProps) => {
  return (
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
          <Box sx={{ width: 48, height: 48 }}>
            <Image src={doctor.avatar} alt={doctor.name} width={40} height={40} />
          </Box>
          <Box sx={{ flex: 1, ml: 2 }}>
            <Typography sx={{ fontSize: "16px", fontWeight: 600, color: "#000", mb: 0.5 }}>
              {doctor.name}
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "#666" }}>
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
                <Typography sx={{ fontSize: "12px", color: "#666", mb: 0.5 }}>Expertise</Typography>
                <Typography sx={{ fontSize: "14px", fontWeight: 500, color: "#000" }}>
                  {doctor.expertise}
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: "12px", color: "#666", mb: 0.5 }}>Gender</Typography>
                <Typography sx={{ fontSize: "14px", fontWeight: 500, color: "#000" }}>
                  {doctor.gender}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
              <Box>
                <Typography sx={{ fontSize: "12px", color: "#666", mb: 0.5 }}>
                  Session mode
                </Typography>
                <Typography sx={{ fontSize: "14px", fontWeight: 500, color: "#000" }}>
                  {doctor.sessionMode}
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: "12px", color: "#666", mb: 0.5 }}>
                  Session Fee
                </Typography>
                <Typography sx={{ fontSize: "14px", fontWeight: 500, color: "#000" }}>
                  {doctor.fee}
                </Typography>
              </Box>
            </Box>

            <Button
              fullWidth
              variant="contained"
              onClick={() => onBook(doctor.id)}
              sx={{
                height: "43px",
                background: "linear-gradient(90deg, #BBA3E4 0%, #E7A1A0 100%)",
                borderRadius: "12px",
                py: 1.5,
                fontSize: "16px",
                fontWeight: 600,
                textTransform: "none",
                "&:hover": {
                  background: "linear-gradient(90deg, #A992D0 0%, #DB908F 100%)",
                },
              }}
            >
              Book Now
            </Button>
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  )
}

export default DoctorCard
