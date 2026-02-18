import React, { useEffect, useRef, useState } from "react";
import Input from "../../components/Input";
import Btn from "../../components/Btn";
import { useForm, Controller } from "react-hook-form";
import { Box, Button, Typography, Avatar, Grid } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useToast } from "../../components/Toastify";
import {
  addAttachment,
  createCover,
  createProduct,
  getAllCategories,
  getAllSubCategories,
} from "../../services";
import { ComboBox } from "../../components/ComboBox";

const AddCover = ({ productItem, setShowAddCover, showAddCover }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    mode: "onChange",
  });

  const toast = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const [category, setCategory] = useState<any>(null);
  const [subCategories, setSubCategories] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [allCategories, setAllCategories] = useState<any>([]);
  const [allSubCategories, setAllSubCategories] = useState<any>([]);
  const [preview, setPreview] = useState<string | null>(null);

  console.log(subCategories, category);

  const onSubmit = async (data: any) => {
    const file: File = data.imageProductCover;
    if (!file) {
      toast.error("عکسی انتخاب نشده است");
      return;
    }

    try {
      const postDataProduct = {
        subcategoryId: subCategories || null,
        categoryId: category || null,
        code: data?.productModel || null,
        title: `${data?.headTitle}n/${data?.subTitle}` || null,
        redirect: data?.redirect || null,
      };
      if (!productItem?.id) {
        const resProduct = await createCover(postDataProduct);
        console.log("resProduct", resProduct);
        if (resProduct?.data?.code === 0) {
          const ext = file.type.split("/")[1];
          const formData = new FormData();
          console.log(file);
          formData.append("fileName", file.name.split(".")[0]);
          formData.append("ext", `.${ext}`);
          formData.append("productId", resProduct?.data?.data?.id);
          formData.append("attachmentType", "cov");
          formData.append("attachmentFile", file);
          const resAttachment = await addAttachment(formData);
          if (resAttachment?.data?.code === 0) {
            toast.success(resAttachment.data.message);
            setShowAddCover(false);
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

  const handleGetAllSubCategories = async () => {
    const res = await getAllSubCategories(category);
    setAllSubCategories(res?.data?.data);
  };

  const handleGetAllCategories = async () => {
    const res = await getAllCategories();
    setAllCategories(res?.data?.data);
  };

  useEffect(() => {
    handleGetAllCategories();
  }, []);

  useEffect(() => {
    handleGetAllSubCategories();
  }, [category]);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Input label="مدل" name="productModel" control={control} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Input label="متن سربرگ" name="headTitle" control={control} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Input label="موضوع" name="subTitle" control={control} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Input label="انتقال به" name="redirect" control={control} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <ComboBox
            // defaultValue={productItem?.id && productItem?.categoryId}
            label="دسته"
            value={category}
            onChange={(e: any) => setCategory(e)}
            options={allCategories}
            optionLabel="title_per"
            optionValue="id"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <ComboBox
            // defaultValue={productItem?.id && productItem?.subcategoryId}
            label="زیر دسته"
            value={subCategories}
            onChange={(e: any) => setSubCategories(e)}
            options={allSubCategories}
            optionLabel="title"
            optionValue="id"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="imageProductCover"
            control={control}
            rules={{
              validate: (value) => (value ? true : "انتخاب تصویر الزامی است"),
            }}
            defaultValue={null}
            render={({ field: { onChange } }) => (
              <Box display="flex" alignItems="center" gap={2}>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileRef}
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
                  onClick={() => fileRef.current?.click()}
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
          <Button
            type="submit"
            variant="contained"
            color="success"
            sx={{ minWidth: 160 }}
          >
            ثبت نهایی
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddCover;
