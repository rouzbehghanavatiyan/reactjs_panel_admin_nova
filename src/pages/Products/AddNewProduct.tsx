import React, { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Box, Button, Avatar, Grid } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Btn from "../../components/Btn";
import Input from "../../components/Input";
import { useToast } from "../../components/Toastify";
import { addAttachment } from "../../services";

const AddNewProduct = () => {
  const toast = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { control, handleSubmit, getValues } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data: any) => {
    console.log(data);
    try {
      
      
      const file: File = data.newProduct;
      if (!file) {
        toast.error("فایلی انتخاب نشده است");
        return;
      }      
      const ext = file.type.split("/")[1];
      const formData = new FormData();
      formData.append("fileName", file.name.split(".")[0]);
      formData.append("ext", `.${ext}`);
      formData.append("productId", null);
      formData.append("attachmentType", "new");
      formData.append("attachmentFile", file);
      const res = await addAttachment(formData);
      if (res?.data?.code === 0) {
        toast.success(res?.data?.message);
      } else {
        toast.error("خطا در ثبت محصول");
      }
    } catch (err) {
      toast.error("خطا در ارتباط با سرور");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Input label="نام محصول" name="title" control={control} />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Input label="توضیحات" name="desc" control={control} />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="newProduct"
            control={control}
            defaultValue={null}
            render={({ field: { onChange } }) => (
              <Box display="flex" alignItems="center" gap={2}>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  hidden
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      onChange(file);
                      setPreview(URL.createObjectURL(file));
                    }
                  }}
                />

                <Btn
                  title="انتخاب تصویر"
                  variant="contained"
                  icon={<AttachFileIcon />}
                  onClick={() => fileInputRef.current?.click()}
                />

                {preview && (
                  <Avatar
                    src={preview}
                    variant="rounded"
                    sx={{ width: 48, height: 48 }}
                  />
                )}
              </Box>
            )}
          />
        </Grid>

        <Grid size={12}>
          <Button fullWidth type="submit" variant="contained" color="success">
            ثبت نهایی
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddNewProduct;
