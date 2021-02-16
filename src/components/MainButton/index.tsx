import React, { ButtonHTMLAttributes } from 'react';
import './styles.css';

interface IMainButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  disabled: boolean;
}

export const MainButton: React.FC<IMainButton> = ({
  children,
  disabled,
  ...rest
}) => {
  const setDisabledStyle = (disabled: boolean) => {
    if (disabled) return 'main-button--disabled';
    return '';
  };
  return (
    <button className={'main-button ' + setDisabledStyle(disabled)} {...rest}>
      {children}
    </button>
  );
};
