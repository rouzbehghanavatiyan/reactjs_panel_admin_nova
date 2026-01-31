import { TextField, Autocomplete } from "@mui/material";

type ComboBoxProps<T> = {
  label: string;
  value: any;
  options: T[];
  onChange: (value: any) => void;

  optionLabel?: string;
  optionValue?: string;

  fullWidth?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  error?: boolean;
  helperText?: string;
  placeholder?: string;
};

export function ComboBox<T>({
  label,
  value,
  options = [],
  onChange,
  optionLabel = "label",
  optionValue = "value",
  fullWidth = true,
  disabled = false,
  multiple = false,
  error = false,
  helperText,
  placeholder,
}: ComboBoxProps<T>) {
  // تبدیل value خام به option واقعی
  const getSelectedValue = () => {
    if (multiple && Array.isArray(value)) {
      return options.filter((opt: any) => value.includes(opt[optionValue]));
    }
    return options.find((opt: any) => opt[optionValue] === value) ?? null;
  };

  return (
    <Autocomplete
      fullWidth={fullWidth}
      disabled={disabled}
      multiple={multiple}
      options={options}
      value={getSelectedValue()}
      clearOnEscape
      onChange={(_, newValue) => {
        if (multiple) {
          const vals = (newValue as any[]).map((item) => item[optionValue]);
          onChange(vals);
        } else {
          onChange(newValue ? (newValue as any)[optionValue] : null);
        }
      }}
      getOptionLabel={(option: any) => option?.[optionLabel]?.toString() ?? ""}
      isOptionEqualToValue={(opt: any, val: any) =>
        opt[optionValue] === val[optionValue]
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          error={error}
          helperText={helperText}
        />
      )}
    />
  );
}
