import React, { ButtonHTMLAttributes } from 'react';
import './styles.css';

interface IMainButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const MainButton: React.FC<IMainButton> = ({ children, ...rest }) => {
  return (
    <button className="main-button" {...rest}>
      {children}
    </button>
  );
};
