import React, { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Box, Button, Avatar, Grid } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Btn from "../../components/Btn";
import Input from "../../components/Input";
import { useToast } from "../../components/Toastify";
import { addAttachment, createPopularProduct } from "../../services";

const AddPopularProduct = ({
  productItem,
  showPopularProduct,
  setShowPopularProduct,
}) => {
  const toast = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { control, handleSubmit } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data: any) => {
    const file: File = data.imagePopular;
    if (!file) {
      toast.error("عکسی انتخاب نشده است");
      return;
    }
    try {
      const postData = {
        name: data.name,
        code: data.code,
      };
      if (!productItem?.id) {
        const resProduct = await createPopularProduct(postData);
        if (resProduct?.data?.code === 0) {
          const ext = file.type.split("/")[1];
          const formData = new FormData();
          formData.append("fileName", file.name.split(".")[0]);
          formData.append("ext", `.${ext}`);
          formData.append("productId", null);
          formData.append("attachmentType", "pop");
          formData.append("attachmentFile", file);
          const resAttachment = await addAttachment(formData);
          if (resAttachment?.data?.code === 0) {
            toast.success(resAttachment.data.message);
            setShowPopularProduct(false);
          } else {
            toast.error("خطا در ثبت محصول");
          }
        } else {
          toast.error(resProduct?.data?.message);
        }
      } else {
        const postDataDes = { content: data?.description || null };
        // const resProductDes = await updateDes(productItem?.id, postDataDes);
        // console.log(resProductDes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Input label="نام محصول" name="name" control={control} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Input label="کد محصول" name="code" control={control} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="imagePopular"
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
                    sx={{ width: 100, height: 100 }}
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

export default AddPopularProduct;
