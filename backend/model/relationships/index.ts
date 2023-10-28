import { z } from "zod";
import { defineRelationship } from "./relationship";



export const ResidentOf = defineRelationship("RESIDENT_OF");
export type ResidentOf = z.infer<typeof ResidentOf>;

export const OccuredAt = defineRelationship("OCCURED_AT");
export type OccuredAt = z.infer<typeof OccuredAt>;



export const Killed = defineRelationship("KILLED");
export type Killed = z.infer<typeof Killed>;

export const Maimed = defineRelationship("MAIMED");
export type Maimed = z.infer<typeof Maimed>;

export const Injured = defineRelationship("INJURED");
export type Injured = z.infer<typeof Injured>;

export const Detained = defineRelationship("DETAINED");
export type Detained = z.infer<typeof Detained>;

export const Dispossessed = defineRelationship("DISPOSSESSED");
export type Dispossessed = z.infer<typeof Dispossessed>;


