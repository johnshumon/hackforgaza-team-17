<script setup lang="ts">
const data = {
    id: 'a09037a4-42d5-4f78-b24c-6b79bf8d2507',
    title: 'Military incursion into Nour Shams refugee camp in the northern occupied West Bank',
    dateTime: '2023-10-22T15:17:50.452Z',
    location: [{ srid: 4326, lat: -63.8813, long: -157.2106 }],
    description: 'Succedo provident dolorem vaco consectetur decet perferendis thesis.\n' +
        'Arcus uberrime thorax adhuc crinis tyrannus strenuus.\n' +
        'Vergo baiulus aro culpo.\n' +
        'Veritas recusandae cursus utrimque accusator ambulo comprehendo est vigilo adulatio.',
    tags: ['ha though']
}
const victims = [
    {
        id: 'a09037a4-42d5-4f78-b24c-6b79bf8d2500',
        name: 'Yousef Mohammad Omar Zaghdad',
        age: 11,
        images: [
            'https://assets.nationbuilder.com/dcipalestine/pages/5784/attachments/original/1697827496/yousef_zaghdad.jpeg?1697827496'
        ]
    },
    {
        id: '000037a4-42d5-4f78-b24c-6b79bf8d2500',
        name: "Mujahed Mohammad Yousef Sa’aydeh",
        age: 15,
        images: [
            'https://assets.nationbuilder.com/dcipalestine/pages/5784/attachments/original/1697827497/mujahed_saaydeh.jpeg?1697827497'
        ]
    },
    {
        id: '000037a4-42d5-4f78-b24c-6b79bf8d2500',
        name: "Saeed Zaghdad",
        age: 15,
        images: [
        ]
    }
]

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
            <h1 class="capitalize text-4xl font-medium">{{ data.title }}</h1>
            <p>
                on {{ new Date(data.dateTime).toLocaleString("en-UK", { dateStyle: 'full' }) }}
            </p>
            <p class="">
                {{ data.description }}
            </p>
            <h1 class="text-2xl">
                Victims
            </h1>
            <div class="grid grid-cols-7 space-x-3">
                <a v-for="v in victims" :key="v.id"
                    v-bind:href="'/victims/' + v.id"
                    class="relative shadow-lg shadow-black/30 p-3 min-h-[calc(100dvh-100px)] md:min-h-[200px]">
                    <img :src="v.images[0]" class="w-full h-full object-cover absolute top-0 left-0" />
                    <div class="absolute top-0 left-0 w-full h-full z-20 bg-gradient-to-t from-black to-transparent
                                flex flex-col justify-end text-white text-base p-2">
                        {{ v.name }}, {{ v.age }}
                    </div>

                </a>
                <li class="flex items-center justify-center">
                    <div class="w-full">
                        <a class="cursor-pointer flex items-center justify-center">
                            and 47 more...
                            <br />
                            See all


                        </a>
                    </div>
                </li>
            </div>


        </div>
    </div>
</template>
