import React, { useState } from "react";
import { FiEye, FiEyeOff, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

export default function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  disabled = false,
  error = "",
  success = false,
  helperText = "",
  icon = null,
  size = "md", // sm, md, lg
  variant = "default", // default, outlined, filled
  className = "",
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  const sizeClasses = {
    sm: "py-1.5 text-sm",
    md: "py-2.5 text-base",
    lg: "py-3 text-lg",
  };

  const variantClasses = {
    default: "bg-white border-gray-300 focus:border-green-500 focus:ring-green-500",
    outlined: "bg-transparent border-2 border-gray-300 focus:border-green-500",
    filled: "bg-gray-100 border-transparent focus:bg-white focus:border-green-500",
  };

  const errorClasses = error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "";
  const successClasses = success ? "border-green-500" : "";

  return (
    <div className={`input-field-wrapper ${className}`}>
      {/* Label with required indicator */}
      {label && (
        <div className="flex items-center justify-between mb-1.5">
          <label 
            htmlFor={name} 
            className="text-sm font-medium text-gray-700"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {helperText && !error && (
            <span className="text-xs text-gray-500">{helperText}</span>
          )}
        </div>
      )}

      {/* Input Container */}
      <div 
        className={`
          relative flex items-center
          ${sizeClasses[size]}
          ${variantClasses[variant]}
          ${errorClasses || successClasses}
          border rounded-lg
          transition-all duration-200
          ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}
          ${isFocused ? 'ring-2 ring-green-500 ring-opacity-20' : ''}
        `}
      >
        {/* Left Icon */}
        {icon && (
          <span className="absolute left-3 text-gray-400">
            {icon}
          </span>
        )}

        {/* Input */}
        <input
          type={inputType}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`
            w-full bg-transparent border-none outline-none
            ${icon ? 'pl-10' : 'pl-3'}
            ${isPassword ? 'pr-10' : 'pr-3'}
            ${sizeClasses[size]}
            placeholder:text-gray-400
            disabled:cursor-not-allowed
          `}
          {...props}
        />

        {/* Password Toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 text-gray-400 hover:text-gray-600 focus:outline-none"
            tabIndex="-1"
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        )}

        {/* Success Icon */}
        {success && !error && !isPassword && (
          <span className="absolute right-3 text-green-500">
            <FiCheckCircle size={18} />
          </span>
        )}

        {/* Error Icon */}
        {error && (
          <span className="absolute right-3 text-red-500">
            <FiAlertCircle size={18} />
          </span>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
          <FiAlertCircle size={14} />
          {error}
        </p>
      )}

      {/* Success Message */}
      {success && !error && helperText && (
        <p className="mt-1.5 text-sm text-green-600">
          {helperText}
        </p>
      )}

      <style jsx>{`
        .input-field-wrapper {
          width: 100%;
        }

        /* Focus ring animation */
        @keyframes ringPulse {
          0% {
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4);
          }
          70% {
            box-shadow: 0 0 0 4px rgba(34, 197, 94, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
          }
        }

        .input-field-wrapper:focus-within .relative {
          animation: ringPulse 1.5s infinite;
        }

        /* Disabled state */
        input:disabled {
          -webkit-text-fill-color: #9CA3AF;
        }

        /* Remove number input spinners */
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type=number] {
          -moz-appearance: textfield;
        }

        /* Autofill styles */
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0px 1000px white inset;
          transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>
    </div>
  );
}