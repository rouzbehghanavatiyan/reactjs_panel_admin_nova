import { TextField, Autocomplete, Chip } from "@mui/material";

type ComboBoxProps<T> = {
  label: string;
  value: T | T[] | null;
  options: T[];
  onChange: (value: T | T[] | null) => void;

  optionLabel?: string;
  optionValue?: string;

  fullWidth?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  error?: boolean;
  helperText?: string;
  placeholder?: string;
};

export function ComboBox<T extends { [key: string]: any }>({
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
  const opts = Array.isArray(options) ? options : [];

  // 🔥 مهم: اگر multiple فعال است، value باید آرایه باشد
  const safeValue = multiple
    ? Array.isArray(value)
      ? value
      : []
    : value ?? null;

  return (
    <Autocomplete
      multiple={multiple}
      fullWidth={fullWidth}
      disabled={disabled}
      options={opts}
      value={safeValue}
      disableCloseOnSelect={multiple}
      clearOnEscape
      onChange={(_, newValue) => {
        onChange(newValue as T | T[] | null);
      }}
      getOptionLabel={(option: T) =>
        option?.[optionLabel]?.toString() ?? ""
      }
      isOptionEqualToValue={(opt: T, val: T) =>
        opt?.[optionValue] === val?.[optionValue]
      }
      renderTags={(value, getTagProps) =>
        multiple
          ? (value as T[]).map((option, index) => (
              <Chip
                {...getTagProps({ index })}
                label={option[optionLabel]}
              />
            ))
          : null
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