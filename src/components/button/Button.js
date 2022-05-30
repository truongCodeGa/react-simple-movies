import React from "react";
//Bài 223: Tối ưu component Button
const Button = ({
  onClick,
  className = "",
  full = false,
  type = "button",
  bgColor = "pink",
  children,
  ...props
}) => {
  let bgClassName = "bg-pink";
  switch (bgColor) {
    case "pink":
      bgClassName = "bg-pink";
      break;
    case "pur":
      bgClassName = "bg-pur";
      break;

    default:
      break;
  }
  return (
    <div>
      <button
        type={type}
        className={`py-3 px-6 rounded-lg capitalize
        ${full ? "w-full" : ""} 
        mt-auto font-medium ${bgClassName} ${className}`}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
