import * as React from "react";

interface CheckboxProps {
  checked: boolean;
  disabled?: boolean;
  label?: React.ReactNode;
  onChange: (checked: boolean) => void;
}

export function Checkbox({
  checked,
  disabled = false,
  label,
  onChange
}: CheckboxProps) {
  const input = (
    <input
      disabled={disabled}
      type='checkbox'
      onChange={() => onChange(!checked)}
      checked={checked}
    />
  )
  if (!label) {
    return input;
  }
  return (
    <>
      <label>{label}
        {input}
      </label>
    </>
  )
}
