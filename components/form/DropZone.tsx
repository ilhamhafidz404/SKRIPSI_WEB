"use client";
import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { IconUpload } from "@intentui/icons";

interface DropzoneProps {
  onFileSelect?: (file: File) => void;
  defaultImage?: string;
}

const DropzoneComponent: React.FC<DropzoneProps> = ({
  onFileSelect,
  defaultImage,
}) => {
  const [preview, setPreview] = useState<string | null>(null);

  // set preview dari image existing
  useEffect(() => {
    if (defaultImage) {
      setPreview(defaultImage);
    }
  }, [defaultImage]);

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];

    if (onFileSelect) {
      onFileSelect(file);
    }

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/webp": [],
      "image/svg+xml": [],
    },
  });

  return (
    <div className="transition border border-gray-300 border-dashed cursor-pointer dark:hover:border-brand-500 dark:border-gray-700 rounded-xl hover:border-brand-500">
      <div
        {...getRootProps()}
        className={`dropzone rounded-xl border-dashed border-gray-300 p-7 lg:p-10
        ${
          isDragActive
            ? "border-brand-500 bg-gray-100 dark:bg-gray-800"
            : "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"
        }`}
      >
        <input {...getInputProps()} />

        <div className="dz-message flex flex-col items-center m-0!">
          {preview ? (
            <>
              <img
                src={preview}
                alt="preview"
                className="mb-5 max-h-40 rounded-lg object-cover"
              />

              <h4 className="mb-3 font-semibold text-gray-800 text-theme-xl dark:text-white/90 text-center">
                {isDragActive
                  ? "Drop Files Here To Change Image"
                  : "Drag & Drop Files Here To Change Image"}
              </h4>
            </>
          ) : (
            <>
              <div className="mb-5.5 flex justify-center">
                <div className="flex h-17 w-17 items-center justify-center rounded-full bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                  <IconUpload className="size-6" />
                </div>
              </div>

              <h4 className="mb-3 font-semibold text-gray-800 text-theme-xl dark:text-white/90">
                {isDragActive ? "Drop Files Here" : "Drag & Drop Files Here"}
              </h4>
            </>
          )}

          <span className="text-center mb-5 block w-full max-w-72.5 text-sm text-gray-700 dark:text-gray-400">
            Drag and drop your PNG, JPG, WebP, SVG images here or browse
          </span>

          <span className="font-medium underline text-theme-sm text-brand-500">
            Browse File
          </span>
        </div>
      </div>
    </div>
  );
};

export default DropzoneComponent;
