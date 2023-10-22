<script setup lang="ts">
import { mergeProps, onMounted, ref, watch } from 'vue';
import { Loader } from "@googlemaps/js-api-loader"
import { GMAP_CLIENT_KEY } from '../libs/google-maps';

    const props = defineProps<{
        centerPosition: {
            lat: number,
            lng: number
        },
        zoom: number
    }>();
    
    const mapBox = ref<HTMLDivElement>();


    // load Google Maps library
    const loader = new Loader({
        apiKey: GMAP_CLIENT_KEY,
        version: "weekly"
    });
    const googleMaps = ref<google.maps.MapsLibrary>();
    loader.importLibrary("maps").then((_googleMaps)=>{
        googleMaps.value = _googleMaps;
        initMaps();
    })

    const map = ref<google.maps.Map>();
    function initMaps() {
        if (!mapBox.value || !googleMaps.value) return;
        map.value = new googleMaps.value.Map(mapBox.value, {
            center: props.centerPosition,
            zoom: props.zoom,
        });
        map.value.addListener("resize", ()=>{
            onMapResize();
        })
    }

    function onMapResize() {
        if (!map.value) return;
        const m = map.value;
        // do something here
    }

    function resetMap() {
        // do something here
    }
</script>

<template>
    <div 
        ref="mapBox" 
        v-bind="$attrs"
    >
    </div>
</template>