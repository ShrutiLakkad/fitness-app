import React, { ReactNode } from "react";

interface Props {
    children: ReactNode;
    className?: string;
    height?: string;
    width?: string;
}

export default function Card({ children, className, height, width }: Props) {
    const styles: React.CSSProperties = {};
    if (height) {
        styles["height"] = height;
    }
    if (width) {
        styles["width"] = width;
    }
    return (
        <div className={`custom-card ${className}`} style={styles}>
            {children}
        </div>
    );
}
