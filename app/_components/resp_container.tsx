"use client"
import UseMediaQuery from "@/lib/use-media-query";
import React from "react";

interface ContainerProps {
    children: React.ReactNode;
    hide: boolean;
    id?: string;
    class_full?: string;
    class_sm?: string;
}

export default function RespContainer({ children, hide, id, class_full, class_sm }: ContainerProps) {
    const isTabletAbove = UseMediaQuery("(min-width: 1025px)");
    return (
        <div id={id}>
            {hide && !isTabletAbove ? (
                <></>
            ) : (
                isTabletAbove ? (
                    <div className={class_full}>
                        {children}
                    </div>
                ) : (
                    <div className={class_sm}>
                        {children}
                    </div>
                )
            )}
        </div>
    );
}
