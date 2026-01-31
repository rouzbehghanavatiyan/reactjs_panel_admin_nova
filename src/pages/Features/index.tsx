import React, { useState } from "react";
import { Box, Button, Container } from "@mui/material";
import AddFeatures from "./AddFeatures";
import Modal from "../../components/Modal";
import SelectBox from "../../SelectBox";

const Features: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mb: 3,
        }}
      >
        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          sx={{ minWidth: 140 }}
        >
          افزودن ویژگی
        </Button>
      </Box>
      <SelectBox />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="افزودن ویژگی جدید"
        maxWidth="sm"
      >
        <AddFeatures />
      </Modal>
    </Container>
  );
};

export default Features;
