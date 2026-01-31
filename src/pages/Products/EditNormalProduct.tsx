import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Box, Button, Avatar, Grid } from "@mui/material";
import Input from "../../components/Input";
import { useToast } from "../../components/Toastify";
import {
  addAttachment,
  getDescription,
  updateDes,
  updateProduct,
} from "../../services";
import StringHelpers from "../../utils/StringHelper";
import { useFieldArray } from "react-hook-form";

const EditNormalProduct = ({ productItem, setShowEditNormalProduct }) => {
  const toast = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const { control, handleSubmit, formState, setValue } = useForm<any>({
    mode: "onChange",
    defaultValues: {
      features: productItem?.features || [],
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "features",
  });

  const onSubmit = async (data: any) => {
    const file: File = data.image;
    console.log(productItem);

    if (!file) {
      toast.error("فایلی انتخاب نشده است");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("fileName", file.name.split(".")[0]);
      formData.append("attachmentType", "img");
      formData.append("productId", productItem?.product_id);
      formData.append("attachmentFile", file);
      const res = await addAttachment(formData);

      res?.data?.code === 0
        ? toast.success(res.data.message)
        : toast.error("خطا در ثبت محصول");
    } catch {
      toast.error("خطا در ارتباط با سرور");
    }

    const postDataProduct = {
      subcategoryId: data?.subCategory || null,
      categoryId: data?.category || null,
      code: data?.productModel || null,
      name: data?.productName || null,
      en_name: data?.englishName || null,
      title: data?.productTitle || null,
    };
    const resProduct = await updateProduct(productItem?.id, postDataProduct);
    console.log(resProduct);
    if (resProduct?.data?.code === 0) {
      toast.success(resProduct?.data?.message);
      setShowEditNormalProduct(false);
    } else {
      toast.error(resProduct?.data?.message);
    }
    const postDataDes = { content: data?.description || null };
    const resProductDes = await updateDes(productItem?.id, postDataDes);
    console.log(resProductDes);
  };

  const handleAllNormalProduct = async () => {
    try {
      const res = await getDescription(productItem?.id);

      if (!res?.data?.data?.content) {
        toast.error("توضیحات یافت نشد");
        return;
      }

      setDescription(res.data.data);

      // ⬅️ ست کردن مقدار فرم
      setValue("description", res.data.data.content, {
        shouldValidate: true,
      });
    } catch (e) {
      toast.error("خطا در دریافت توضیحات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productItem?.id) {
      handleAllNormalProduct();
    }
  }, [productItem?.id]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Input
            defaultValue={productItem?.name}
            label="نام محصول"
            name="productName"
            control={control}
            rules={{
              required: "نام محصول الزامی است",
              minLength: {
                value: 3,
                message: "حداقل ۳ کاراکتر",
              },
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Input
            defaultValue={productItem?.en_name}
            label="نام لاتین"
            name="englishName"
            control={control}
            rules={{
              required: "نام محصول الزامی است",
              minLength: {
                value: 3,
                message: "حداقل ۳ کاراکتر",
              },
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Input
            defaultValue={productItem?.code}
            label="مدل"
            name="productModel"
            control={control}
            rules={{
              required: "مدل محصول الزامی است",
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Input
            defaultValue={productItem?.title}
            label="متن اضافی"
            name="productTitle"
            control={control}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Input
            defaultValue={productItem?.categoryId}
            label="دسته"
            name="category"
            control={control}
            rules={{
              required: "دسته الزامی است",
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Input
            defaultValue={productItem?.subcategoryId}
            label="زیر دسته"
            name="subCategory"
            control={control}
            rules={{
              required: "زیر دسته الزامی است",
            }}
          />
        </Grid>
        <Grid size={12}>
          <Input
            name="description"
            label="توضیحات"
            control={control}
            defaultValue={description?.content}
            textArea={{ minRows: 3 }}
            rules={{
              required: "توضیحات الزامی است",
              minLength: {
                value: 10,
                message: "حداقل ۱۰ کاراکتر",
              },
            }}
            size={12}
          />
        </Grid>
        <Grid container spacing={3}>
          {fields.map((field, index) => (
            <Grid key={field.id} size={{ xs: 12, sm: 6 }}>
              <Input
                name={`features.${index}.title`}
                label={`ویژگی ${index + 1}`}
                control={control}
                defaultValue={field.title}
              />
            </Grid>
          ))}
        </Grid>
        <Grid size={12}>
          <Controller
            name="image"
            control={control}
            rules={{
              validate: (value) =>
                value || productItem?.attachments?.length
                  ? true
                  : "انتخاب تصویر الزامی است",
            }}
            render={({ field: { onChange } }) => (
              <Box display="flex" alignItems="center" gap={3}>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileRef}
                  hidden
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    onChange(file);
                    setPreview(URL.createObjectURL(file));
                  }}
                />
                <Avatar
                  variant="rounded"
                  src={
                    preview
                      ? preview
                      : StringHelpers.getProfile(
                          productItem?.attachments?.[0],
                          productItem?.code
                        )
                  }
                  sx={{ width: 200, height: 200 }}
                />

                <Button
                  variant="outlined"
                  onClick={() => fileRef.current?.click()}
                >
                  تغییر تصویر
                </Button>
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

export default EditNormalProduct;
