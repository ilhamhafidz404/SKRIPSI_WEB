import React, { forwardRef } from "react";

interface TextAreaProps {
    id?: string;
    name?: string;
    placeholder?: string;
    defaultValue?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    className?: string;
    rows?: number;
    disabled?: boolean;
    success?: boolean;
    error?: boolean;
    hint?: string;
    readonly?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
    (
        {
            id,
            name,
            placeholder,
            value,
            onChange,
            className = "",
            rows = 4,
            disabled = false,
            success = false,
            error = false,
            hint,
            readonly = false,
            ...rest
        },
        ref,
    ) => {
        let textAreaClasses = `w-full rounded-lg border-gray-300 border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 ${className}`;

        if (disabled) {
            textAreaClasses += ` text-gray-500 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700`;
        } else if (error) {
            textAreaClasses += ` text-error-800 focus:ring-3 focus:ring-error-500/10 dark:text-error-400 dark:border-error-500`;
        } else if (success) {
            textAreaClasses += ` text-success-500 focus:ring-success-500/10 focus:border-success-300 dark:text-success-400 dark:border-success-500`;
        } else {
            textAreaClasses += ` bg-transparent text-gray-800 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800`;
        }

        return (
            <div className="relative">
                <textarea
                    ref={ref}
                    id={id}
                    name={name}
                    rows={rows}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    readOnly={readonly}
                    className={textAreaClasses}
                    {...rest}
                />

                {hint && (
                    <p
                        className={`mt-1.5 text-xs ${error ? "text-error-500" : success ? "text-success-500" : "text-gray-500"}`}
                    >
                        {hint}
                    </p>
                )}
            </div>
        );
    },
);

TextArea.displayName = "TextArea";

export default TextArea;