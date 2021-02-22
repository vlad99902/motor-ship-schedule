import React, { InputHTMLAttributes } from "react";
import "./styles.css";

interface IInputField extends InputHTMLAttributes<HTMLInputElement> {
  isValid?: boolean;
  messageType?: "sever" | "warning";
  messageText?: string;
}

/**
 * Input field global component
 * @param param0
 */

export const InputField: React.FC<IInputField> = ({
  isValid = true,
  messageType,
  messageText,
  ...rest
}) => {
  const invalidStyle = (isValid: boolean): React.CSSProperties =>
    !isValid
      ? {
          border: `2px solid #ff6565`,
        }
      : {};

  return (
    <>
      <input
        className="input"
        {...rest}
        autoComplete="off"
        style={invalidStyle(isValid)}
      />
      {/* <div type={messageType} display={valid ? 'none' : 'block'}>
        {messageText}
      </div> */}
    </>
  );
};
