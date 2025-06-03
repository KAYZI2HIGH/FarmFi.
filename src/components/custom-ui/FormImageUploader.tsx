"use client";

import { useDropzone } from "react-dropzone";
import { X } from "lucide-react";
import Image from "next/image";
import { useState, useCallback } from "react";
import { ControllerRenderProps } from "react-hook-form";

interface FormImageUploaderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, any>;
}

export function FormImageUploader({ field }: FormImageUploaderProps) {
  const [previews, setPreviews] = useState<string[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setIsDragActive(false);
      const newPreviews = acceptedFiles.map((file) =>
        URL.createObjectURL(file)
      );
      const updatedPreviews = [...previews, ...newPreviews].slice(0, 5);

      setPreviews(updatedPreviews);
      field.onChange([...(field.value || []), ...acceptedFiles].slice(0, 5));
    },
    [previews, field]
  );

  const removeImage = (index: number) => {
    const newPreviews = [...previews];
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);

    const newFiles = [...(field.value || [])];
    newFiles.splice(index, 1);
    field.onChange(newFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".webp"] },
    maxFiles: 5,
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: true,
    noClick: false,
    noKeyboard: false,
  });

  return (
    <div className="flex flex-col gap-7 border border-black/10 shadow-md rounded-[24px] p-6 max-w-[550px] z-50">
      <label
        htmlFor="file"
        className="form_label"
      >
        <h1 className="text-[14px] font-semibold">Media Upload</h1>
        <p className="text-[13px] font-light">
          Add your document here and you can upload up to 5 max
        </p>
      </label>

      {/* Preview Grid */}
      {previews.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {previews.map((preview, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-xl overflow-hidden border border-[#2E7D32]"
            >
              <Image
                src={preview}
                alt={`Preview ${index + 1}`}
                fill
                className="object-cover"
                onLoad={() => URL.revokeObjectURL(preview)} // Clean up memory
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage(index);
                }}
                className="absolute top-1 right-1 bg-red-500 rounded-full p-1"
              >
                <X className="w-3 h-3 text-white" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Dropzone */}
      {previews.length < 5 && (
        <div
          {...getRootProps({
            className: `relative w-full h-[144px] flex flex-col items-center justify-center rounded-xl cursor-pointer transition duration-300 ${
              isDragActive ? "bg-[#2E7D32]/10" : ""
              }`,
              style: {
                backgroundImage: isDragActive
                  ? `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%232E7D32' stroke-width='3' stroke-dasharray='15,8' stroke-dashoffset='0' stroke-linecap='square' rx='16'/%3e%3c/svg%3e")`
                  : `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%232E7D32' stroke-width='2' stroke-dasharray='15,8' stroke-dashoffset='0' stroke-linecap='square' rx='16'/%3e%3c/svg%3e")`,
              }
          })}
          
        >
          <input
            {...getInputProps()}
            id="file"
          />
          <Image
            src={"/icons/backup.svg"}
            height={36}
            width={36}
            alt="upload-image"
          />
          <p className="text-[13px] mt-2">
            {isDragActive ? (
              "Drop the files here"
            ) : (
              <>
                Drag your file(s) or{" "}
                <span className="font-semibold text-[#2D7331] hover:underline">
                  browse
                </span>
              </>
            )}
          </p>
          <p className="text-[13px] mt-2 text-[#565656]">
            Max 10 MB files are allowed
          </p>
        </div>
      )}
      <p className="text-[13px] font-light">
        Supported formats: .jpg, .jpeg, .png, .webp
      </p>
    </div>
  );
}
