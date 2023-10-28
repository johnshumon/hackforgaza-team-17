import { z } from "zod";
import { NonEmptyText, Boolean, Unknown } from "../common";
import { defineEntity } from "./entity";

const GovernmentIdNumber = z.union([
    NonEmptyText,
    Unknown
]);

const Citizenships = z.union([
    NonEmptyText.array().min(1),
    Unknown
])

const Age = z.union([
    z.number().int().gte(0),
    z.literal("infant"),    // less than 1 years
    z.literal("child"),     // less than 18 years
    z.literal("adult"),     // less than 65 years
    z.literal("senior"),    // 65 years or more
    Unknown
]);

const Gender = z.union([
    z.literal("male"),
    z.literal("female"),
    Unknown
]);

export const IdentifiedVictim = defineEntity(
    "Identified Victim",
    z.object({
        // name of victim
        name: NonEmptyText,

        // age of victim if known or guestimated (default: "unknown")
        age: Age,

        // gender of victim if known (default: "unknown")
        gender: Gender,

        // government ID number (default: null)
        government_id_number: GovernmentIdNumber,

        // combatant status (default: false)
        combatant: Boolean,

        // citizenships held if known
        citizenships: Citizenships
    })
);

export type IdentifiedVictim = z.infer<typeof IdentifiedVictim>;