import * as React from "react";
import styled from "@mui/system/styled";
import Grid from "@mui/system/Unstable_Grid";
import Box from "@mui/system/Box";
import { ImageList, ImageListItem } from "@mui/material";

const Item = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  border: "1px solid",
  borderColor: theme.palette.mode === "dark" ? "#444d58" : "#ced7e0",
  padding: theme.spacing(1),
  borderRadius: "4px",
  textAlign: "center",
  width: "400px",
}));

// Main component
export default function RowAndColumnSpacing() {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid container rowSpacing={1} spacing={1}>
        <Grid xs={12} sx={{ justifyContent: "center", alignItems: "center" }}>
          <Box
            sx={{
              width: "auto",
              height: "auto",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <Box sx={{ border: "1px solid", p: 0.5, borderRadius: "4px" }}>
              <ImageList sx={{ width: 300, height: 300 }} cols={2}>
                {itemData.map((item) => (
                  <ImageListItem key={item.img}>
                    <img
                      srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                      alt={item.title}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Box>
          </Box>
        </Grid>

        <Grid xs={6} sx={{ justifyContent: "right", display: "grid" }}>
          <Item>ชื่อ:</Item>
        </Grid>
        <Grid xs={6}>
          <Item sx={{ textAlign: "left" }}>Kornthiwa Wirata</Item>
        </Grid>
        <Grid xs={6} sx={{ justifyContent: "right", display: "grid" }}>
          <Item>ที่อยู่:</Item>
        </Grid>
        <Grid xs={6}>
          <Item sx={{ textAlign: "left" }}>PEN UDONTHANI</Item>
        </Grid>
        <Grid xs={6} sx={{ justifyContent: "right", display: "grid" }}>
          <Item>เรียนที่:</Item>
        </Grid>
        <Grid xs={6}>
          <Item sx={{ textAlign: "left" }}>UDON THANI RAJABHAT UNIVERSITY</Item>
        </Grid>
        <Grid xs={6} sx={{ justifyContent: "right", display: "grid" }}>
          <Item>เบอร์โทร:</Item>
        </Grid>
        <Grid xs={6}>
          <Item sx={{ textAlign: "left" }}>0958705098</Item>
        </Grid>
      </Grid>
    </Box>
  );
}

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
  },

  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
  },
];
