import React, { ReactNode } from "react";
import { TextField, Grid } from "@mui/material";
import { Controller } from "react-hook-form";

interface InputProps {
  name: string;
  label?: string;
  control: any;
  defaultValue?: string | number;
  type?: "text" | "password" | "number" | "email";
  rules?: any;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  size?: number;
  disabled?: boolean;
  icon?: ReactNode;
  showCharacterToggle?: boolean;
  currency?: boolean;
  placeholder?: string;
  textArea?:
    | boolean
    | {
        rows?: number;
        minRows?: number;
        maxRows?: number;
      };
}

const Input: React.FC<InputProps> = ({
  name,
  textArea,
  label,
  control,
  defaultValue = "",
  type = "text",
  rules,
  size = 12,
  disabled = false,
  placeholder = "",
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  
  const normalizeNumber = (input: string) => {
    const persian = "۰۱۲۳۴۵۶۷۸۹";
    const english = "0123456789";
    return input.replace(/[۰-۹]/g, (d) => english[persian.indexOf(d)]);
  }
  return (
    <Grid size={size}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue ?? ""}
        rules={rules}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            onChange={(e) => field.onChange(normalizeNumber(e.target.value))}
            value={field.value ?? ""}
            fullWidth
            label={label}
            placeholder={placeholder}
            multiline={!!textArea}
            rows={typeof textArea === "object" ? textArea.rows : undefined}
            minRows={
              typeof textArea === "object" ? textArea.minRows : undefined
            }
            maxRows={
              typeof textArea === "object" ? textArea.maxRows : undefined
            }
            type={
              textArea
                ? undefined
                : type === "password"
                ? showPassword
                  ? "text"
                  : "password"
                : type
            }
            disabled={disabled}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />
    </Grid>
  );
};

export default Input;
