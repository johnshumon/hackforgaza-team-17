import {z} from "zod";
import { Unknown } from "./common";

export const IncidentCategory = z.union([
    z.literal('forced labour'),
    z.literal('cyberattack and espionage'),
    z.literal('verbal and psychological aggression'),
    z.literal('vandalism'),
    z.literal('sabotage and arson'),
    z.literal('environmental destruction'),
    z.literal('assault'),
    z.literal('armed assault'),
    z.literal('firearm assault'),
    z.literal('military assault'),
    z.literal('missile attack and bombing'),
    z.literal('torture'),
    z.literal('sexual violence'),
    z.literal('desecration and destruction of heritage site'),
    z.literal('detention, abduction, and kidnapping'),
    z.literal('dispossession, theft, robbery, extortion')    
]);

export type IncidentCategory = z.infer<typeof IncidentCategory>;

export const IncidentCategories = z.union([
    IncidentCategory.array().min(1),
    Unknown
]);

export type IncidentCategories = z.infer<typeof IncidentCategories>;