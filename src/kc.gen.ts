// This file is auto-generated by keycloakify. Do not edit it manually.
// Hash: c0301c6a9c2bcc9f4d8e6b87500f5b480de56e209fb4b4e11b699e36b43ff3b0

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

export type ThemeName = "keycloakify-starter-svelte";

export const themeNames: ThemeName[] = ["keycloakify-starter-svelte"];

export type KcEnvName = never;

export const kcEnvNames: KcEnvName[] = [];

export const kcEnvDefaults: Record<KcEnvName, string> = {};

export type KcContext =
    | import("./login/KcContext").KcContext

declare global {
    interface Window {
        kcContext?: KcContext;
    }
}
