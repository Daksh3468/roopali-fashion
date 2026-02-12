"use client";

import { useState, ChangeEvent } from "react";
import Image from "next/image";

interface ImageUploadProps {
    name: string;
    defaultValue?: string;
    label?: string;
}

export default function ImageUpload({ name, defaultValue = "", label = "Image" }: ImageUploadProps) {
    const [preview, setPreview] = useState(defaultValue);
    const [value, setValue] = useState(defaultValue);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setPreview(base64String);
                setValue(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <label style={{ fontWeight: "bold" }}>{label}</label>
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <div style={{
                    width: "100px",
                    height: "100px",
                    border: "2px dashed #ccc",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                    position: "relative",
                    background: "#f9f9f9"
                }}>
                    {preview ? (
                        <Image src={preview} alt="Preview" fill style={{ objectFit: "cover" }} />
                    ) : (
                        <span style={{ color: "#ccc", fontSize: "0.8rem" }}>No Image</span>
                    )}
                </div>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                {/* Hidden input to hold the base64 string for form submission */}
                <input type="hidden" name={name} value={value} />
            </div>
        </div>
    );
}
