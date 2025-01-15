import React from 'react';
import { LucideIcon } from 'lucide-react';

interface AuthInputProps {
  id: string;
  name: string;
  type: string;
  label: string;
  value: string;
  placeholder: string;
  icon: LucideIcon;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
}

const AuthInput: React.FC<AuthInputProps> = ({
  id,
  name,
  type,
  label,
  value,
  placeholder,
  icon: Icon,
  onChange,
  required = true,
  error
}) => {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="flex items-center gap-2 text-sm font-medium">
        <Icon className="w-4 h-4" />
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className={`w-full px-4 py-2 bg-surface border ${
          error ? 'border-red-500' : 'border-border'
        } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow`}
      />
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};

export default AuthInput; 