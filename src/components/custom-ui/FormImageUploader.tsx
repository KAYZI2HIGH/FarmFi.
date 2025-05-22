"use client";

import { useDropzone } from "react-dropzone";
import {  X } from "lucide-react";
import Image from "next/image";
import { useState, useCallback } from "react";
import { ControllerRenderProps } from "react-hook-form";

interface FormImageUploaderProps {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, any>;
}

export function FormImageUploader({ field }: FormImageUploaderProps) {
  const [previews, setPreviews] = useState<string[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newPreviews = acceptedFiles.map((file) =>
        URL.createObjectURL(file)
      );
      const updatedPreviews = [...previews, ...newPreviews].slice(0, 5);

      setPreviews(updatedPreviews);
      field.onChange(updatedPreviews.map((_, i) => acceptedFiles[i]));
    },
    [previews, field]
  );

  const removeImage = (index: number) => {
    const newPreviews = previews.filter((_, i) => i !== index);
    setPreviews(newPreviews);
    field.onChange(newPreviews);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".webp"] },
    maxFiles: 5,
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: true,
  });

  return (
    <div className="flex flex-col gap-7 border border-black/10 shadow-md rounded-[24px] p-6 max-w-[550px]">
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
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
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
          {...getRootProps()}
          className={`relative w-full h-[144px] flex flex-col items-center justify-center  rounded-xl cursor-pointer transition duration-300`}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%232E7D32' stroke-width='2' stroke-dasharray='15,8' stroke-dashoffset='0' stroke-linecap='square' rx='16'/%3e%3c/svg%3e")`,
          }}
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
          <p className=" text-[13px] mt-2">
            Drag your file(s) or{" "}
            <span className="font-semibold text-[#2D7331] hover:underline">browse</span>
          </p>
          <p className=" text-[13px] mt-2 text-[#565656]">
            Max 10 MB files are allowed
          </p>
        </div>
      )}
      <p className="text-[13px] font-light">
        Only support .jpg, .png and .svg and zip files
      </p>
    </div>
  );
}
