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
    maps.then((googleMaps)=>{
        if (!mapBox.value) return;
        new googleMaps.Map(mapBox.value, {
            center: props.centerPosition,
            zoom: props.zoom
        });
    })
</script>

<template>
    <div 
        ref="mapBox" 
        v-bind="$attrs" 
        :style="{height}"
    >
    </div>
</template>