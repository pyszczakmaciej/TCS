import { Signal } from "@preact/signals-react";

export type UnpackSignal<T> = T extends Signal<infer U> ? U : never;
