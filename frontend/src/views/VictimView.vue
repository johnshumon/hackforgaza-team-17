<script setup lang="ts">

const victims = [
    {
        id: 'a09037a4-42d5-4f78-b24c-6b79bf8d2500',
        name: 'Yousef Mohammad Omar Zaghdad',
        age: 11,
        images: [
            'https://assets.nationbuilder.com/dcipalestine/pages/5784/attachments/original/1697827496/yousef_zaghdad.jpeg?1697827496'
        ],
        incident_title: 'Military incursion into Nour Shams refugee camp in the northern occupied West Bank'
    },
    {
        id: '000037a4-42d5-4f78-b24c-6b79bf8d2500',
        name: "Mujahed Mohammad Yousef Sa’aydeh",
        age: 15,
        images: [
            'https://assets.nationbuilder.com/dcipalestine/pages/5784/attachments/original/1697827497/mujahed_saaydeh.jpeg?1697827497'
        ],
        incident_title: 'Military incursion into Nour Shams refugee camp in the northern occupied West Bank'

    },
    {
        id: '000037a4-42d5-4f78-b24c-6b79bf8d2500',
        name: "Saeed Zaghdad",
        age: 15,
        images: [
        ],
        incident_title: 'Military incursion into Nour Shams refugee camp in the northern occupied West Bank'

    }
]

const victim = victims[0]

</script>

<template>
    <div class="flex flex-col items-center min-h-screen container mx-auto">
        <div class="w-full">
            <a class="p-3 text-red-900 flex gap-3 items-center" href="/">
                <i class="fi fi-ss-arrow-left h-full block"></i>
                Back to map
            </a>
        </div>

        <div class="container bg-white p-10 flex flex-col gap-3">
            <div class="flex gap-3">
                <div class="w-1/3">
                    <img :src="victim.images[0]" />
                </div>
                <div class="w-2/3 p-2">
                    <h1 class="capitalize text-3xl font-medium">{{ victim?.name }}</h1>

                    <p class="">
                        was a victim of <a :href="'/incidents/' + victim.id" class="text-blue-700">{{ victim?.incident_title
                        }}</a>
                    </p>
                    <h1 class="text-2xl font-medium mt-10 mb-3">
                        His story
                    </h1>
                    <p>
                        Yousef Mohammad Omar Zaghdad, 11, was killed by Israeli forces operating a U.S.-sourced Apache
                        attack helicopter that fired a missile toward a group of Palestinian civilians, including children,
                        on October 19. (Photo: Courtesy of the Zaghdad family)
                    </p>
                </div>
            </div>



        </div>
    </div></template>
