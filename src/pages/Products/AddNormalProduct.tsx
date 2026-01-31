import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import {
  Box,
  Button,
  Avatar,
  Grid,
  IconButton,
  Typography,
  TextField,
} from "@mui/material";
import Input from "../../components/Input";
import { useToast } from "../../components/Toastify";
import {
  addAttachment,
  createProduct,
  getAllCategories,
  getAllSubCategories,
  getDescription,
  updateDes,
} from "../../services";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";
import Btn from "../../components/Btn";
import { ComboBox } from "../../components/ComboBox";
import AddIcon from "@mui/icons-material/Add";

const AddNormalProduct: React.FC<any> = ({
  setShowNormalProduct,
  productItem,
  setProductItem,
}) => {
  const toast = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [allCategories, setAllCategories] = useState<any>([]);
  const [allSubCategories, setAllSubCategories] = useState<any>([]);
  const [category, setCategory] = useState<any>({});
  const [subCategories, setSubCategories] = useState<any>({});
  const [features, setFeatures] = useState<
    Array<{ id?: number; title: string }>
  >(
    productItem?.features?.map((f) => ({ id: f.id, title: f.title })) || [
      { title: "" },
    ]
  );
  const [description, setDescription] = useState<string>("");
  const { control, handleSubmit } = useForm<any>({
    mode: "onChange",
    defaultValues: {
      features: productItem?.features || [],
    },
  });
  const { fields } = useFieldArray({
    control,
    name: "features",
  });

  const handleAddFeature = () => {
    setFeatures([...features, { title: "" }]);
  };

  const handleRemoveFeature = (index: number) => {
    if (features.length > 1) {
      const newFeatures = [...features];
      newFeatures.splice(index, 1);
      setFeatures(newFeatures);
    }
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index].title = value;
    setFeatures(newFeatures);
  };

  const onSubmit = async (data: any) => {
    const file: File = data.normalProduct;
    if (!file) {
      toast.error("فایلی انتخاب نشده است");
      return;
    }
    try {
      const postDataProduct = {
        subcategoryId: subCategories || null,
        categoryId: category || null,
        code: data?.productModel || null,
        name: data?.productName || null,
        en_name: data?.englishName || null,
        title: data?.productTitle || null,
        des: {
          content: data?.description || null,
        },
        features: features.filter((f) => f.title.trim() !== ""),
      };
      console.log("Data to send:", postDataProduct);
      if (!productItem?.id) {
        const resProduct = await createProduct(postDataProduct);
        if (resProduct?.data?.code === 0) {
          const productId = resProduct?.data?.data?.id;
          const ext = file.type.split("/")[1];
          const formData = new FormData();
          console.log(file);
          formData.append("fileName", file.name.split(".")[0]);
          formData.append("ext", `.${ext}`);
          formData.append("productId", productId);
          formData.append("attachmentType", "img");
          formData.append("attachmentFile", file);
          const resAttachment = await addAttachment(formData);
          if (resAttachment?.data?.code === 0) {
            toast.success(resAttachment.data.message);
            setShowNormalProduct(false);
          } else {
            toast.error("خطا در ثبت محصول");
          }
        } else {
          toast.error(resProduct?.data?.message);
        }
      } else {
        const postDataDes = { content: data?.description || null };
        const resProductDes = await updateDes(productItem?.id, postDataDes);
        console.log(resProductDes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetAllCategories = async () => {
    const res = await getAllCategories();
    setAllCategories(res?.data?.data);
  };

  const handleGetAllSubCategories = async () => {
    const res = await getAllSubCategories(category);
    setAllSubCategories(res?.data?.data);
  };

  const handleDescription = async () => {
    try {
      const res = await getDescription(productItem?.id);
      const { code, data } = res?.data;
      if (code === 0) {
        setDescription(data.content);
      } else {
        toast.error("توضیحات یافت نشد");
      }
    } catch (e) {
      toast.error("خطا در دریافت توضیحات");
    }
  };

  useEffect(() => {
    handleGetAllCategories();
  }, []);

  useEffect(() => {
    handleGetAllSubCategories();
  }, [category]);

  useEffect(() => {
    if (productItem?.id) {
      handleDescription();
    }
  }, [productItem?.id]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Input
            label="نام محصول"
            defaultValue={productItem?.id && productItem?.name}
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
            label="نام لاتین"
            defaultValue={productItem?.id && productItem?.en_name}
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
            label="مدل"
            name="productModel"
            control={control}
            defaultValue={productItem?.id && productItem?.code}
            rules={{
              required: "مدل محصول الزامی است",
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Input
            defaultValue={productItem?.id && productItem?.title}
            label="متن اضافی"
            name="productTitle"
            control={control}
          />
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
        <Grid size={12}>
          <Input
            defaultValue={productItem?.id && description}
            name="description"
            label="توضیحات"
            control={control}
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
        {features.map((feature, index) => (
          <Grid bgcolor={"AppWorkspace"} key={index} size={{ xs: 12, sm: 6 }}>
            <Box display="flex" alignItems="center" gap={1}>
              <TextField
                name={`features[${index}].title`}
                label={`ویژگی ${index + 1}`}
                value={feature.title}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                fullWidth
              />
              {features.length > 1 && (
                <IconButton
                  onClick={() => handleRemoveFeature(index)}
                  size="small"
                  color="error"
                >
                  <ClearSharpIcon />
                </IconButton>
              )}
            </Box>
          </Grid>
        ))}
        <Grid size={{ xs: 12 }}>
          <Box
            display="flex"
            onClick={handleAddFeature}
            sx={{ cursor: "pointer", alignItems: "center", gap: 1 }}
            color="primary.main"
            marginTop={2}
          >
            <AddIcon />
            <Typography variant="body1">اضافه کردن ویژگی جدید</Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, sm: 12 }}>
          <Controller
            name="normalProduct"
            control={control}
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
          <Box display={"flex"} justifyContent={"end"}>
            <Button
              type="submit"
              variant="contained"
              color="success"
              sx={{ minWidth: 160 }}
            >
              ثبت نهایی
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddNormalProduct;
