import React from "react";

export const CheckSSR: React.Context<boolean>;
export const useSSR: () => boolean;
export const InsideSSR: React.ComponentType;
export const OutsideSSR: React.ComponentType;
export const isSSR: boolean;
