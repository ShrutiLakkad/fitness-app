import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode;
    className?: string;
    height?: string;
    width?: string;
}

export default function Card({ children, className, height, width }: Props) {
    return (
        <div className={`custom-card ${className}`} style={{ height: height || "auto", width: width || "max-content" }}>{children}</div>
    )
}
