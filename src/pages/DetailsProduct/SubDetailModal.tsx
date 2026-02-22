import React from "react";
import { Box, Button, Grid } from "@mui/material";
import Input from "../../components/Input";
import { createSubDetails } from "../../services";

const SubDetailModal: React.FC<any> = ({ control, handleSubmit, details }) => {
  console.log();

  const handleConfirm = async (data) => {
    // try {
    //   const postData = { title: data?.subDetail , detailId:details?.id };
    //   const res = await createSubDetails(postData);
    //   console.log(res);
    // } catch (err) {
    //   console.error(err);
    // }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Input label="زیر مشخصه" name="subDetail" control={control} />
        <Box display={"flex"} justifyContent={"end"} width={"100%"}>
          <Button
            onClick={handleSubmit(handleConfirm)}
            type="submit"
            variant="contained"
            color="success"
          >
            تایید
          </Button>
        </Box>
      </Grid>
    </>
  );
};

export default SubDetailModal;
