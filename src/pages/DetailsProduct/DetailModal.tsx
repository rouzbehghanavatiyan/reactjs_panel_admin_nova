import { Box, Button, Grid } from "@mui/material";
import Input from "../../components/Input";
import { createDetail } from "../../services";

const DetailModal = ({ control, handleSubmit }) => {

  const handleConfirm = async (data) => {
    // try {
    //   const postData = { title: data?.detail };
    //   const res = await createDetail(postData);
    //   console.log(res);
    // } catch (err) {
    //   console.error(err);
    // }
  };

  return (
    <Grid container spacing={2}>
      <Input label="مشخصات" name="detail" control={control} />
      <Box display="flex" justifyContent="end" width="100%">
        <Button
          onClick={handleSubmit(handleConfirm)} 
          variant="contained"
          color="success"
        >
          تایید
        </Button>
      </Box>
    </Grid>
  );
};

export default DetailModal;
