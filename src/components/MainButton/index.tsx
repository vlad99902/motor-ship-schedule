import React, { ButtonHTMLAttributes } from 'react';
import './styles.css';

interface IMainButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const MainButton: React.FC<IMainButton> = ({ children, ...rest }) => {
  const setDisabledStyle = (disabled: boolean | undefined) => {
    if (disabled) return 'main-button--disabled';
    return '';
  };
  return (
    <button
      className={'main-button ' + setDisabledStyle(rest.disabled)}
      {...rest}
    >
      {children}
    </button>
  );
};
