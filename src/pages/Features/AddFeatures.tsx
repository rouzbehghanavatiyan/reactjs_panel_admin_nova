import { Box, Button } from "@mui/material";
import Input from "../../components/Input";
import { useForm } from "react-hook-form";
import { createFeature } from "../../services";

type FormValues = {
  featureTitle: string;
};

const AddFeatures = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onChange",
  });

  const handleAcceptFeatures = async (data: FormValues) => {
    try {
      const postData = {
        title: data.featureTitle,
      };
      const res = await createFeature(postData);
      if (res?.data?.code === 0) {
        reset();
        alert(res.data.data.title);
      } else {
        alert("خطا در ثبت ویژگی");
      }
    } catch (error) {
      console.error(error);
      alert("خطا در ارتباط با سرور");
    }
  };

  return (
    <form onSubmit={handleSubmit(handleAcceptFeatures)}>
      <Box display={"flex"} gap={5}>
        <Input
          name="featureTitle"
          control={control}
          label="عنوان ویژگی"
          errors={errors}
          validation={{
            required: "عنوان ویژگی الزامی است",
            minLength: {
              value: 2,
              message: "حداقل ۲ کاراکتر",
            },
          }}
        />
        <Button type="submit" variant="contained">
          تایید
        </Button>
      </Box>
    </form>
  );
};

export default AddFeatures;
