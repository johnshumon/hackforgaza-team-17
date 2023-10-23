import { z } from "zod";

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

export const incidentCategories : IncidentCategory[] = [
    'forced labour',
    'cyberattack and espionage',
    'verbal and psychological aggression',
    'vandalism',
    'sabotage and arson',
    'environmental destruction',
    'assault',
    'armed assault',
    'firearm assault',
    'military assault',
    'missile attack and bombing',
    'torture',
    'sexual violence',
    'desecration and destruction of heritage site',
    'detention, abduction, and kidnapping',
    'dispossession, theft, robbery, extortion'    
]