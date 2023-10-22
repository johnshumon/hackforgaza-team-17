<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Loader } from "@googlemaps/js-api-loader"
import { GMAP_CLIENT_KEY } from '../libs/google-maps';

const props = defineProps<{
    centerPosition: {
        lat: number,
        lng: number
    },
    zoom: number,
    height: string,
}>();

const mapBox = ref<HTMLDivElement>();

const loader = new Loader({
    apiKey: GMAP_CLIENT_KEY,
    version: "weekly"
});

const maps = loader.importLibrary("maps");


maps.then(async (googleMaps) => {
    if (!mapBox.value) return;

    new googleMaps.Map(mapBox.value, {
        center: props.centerPosition,
        zoom: props.zoom
    });

    const markerDiv = document.createElement('div');
    markerDiv.className = "w-4 h-4 bg-red-700 rounded-full"

    const { AdvancedMarkerElement } = await loader.importLibrary("marker")

    const marker = new AdvancedMarkerElement({
        map:
            new googleMaps.Map(mapBox.value, {
                center: props.centerPosition,
                zoom: props.zoom
            }),
        position: {
            lat: 31.320443,
            lng: 35.109374
        },
        content: markerDiv
    })


})
</script>

<template>
    <div ref="mapBox" v-bind="$attrs" :style="{ height }">
    </div>
</template>