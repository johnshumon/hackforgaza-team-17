<script setup lang="ts">
import { mergeProps, onBeforeMount, onMounted, ref, watch } from 'vue';
import {} from "google.maps";
import iconVictimsKilled from "../assets/icons/victims/killed.svg";
import iconVictimsMaimed from "../assets/icons/victims/maimed.svg";
import iconVictimsInjured from "../assets/icons/victims/injured.svg";
import iconVictimsDetained from "../assets/icons/victims/detained.svg";
import iconVictimsDispossessed from "../assets/icons/victims/dispossessed.svg";

    const props = defineProps<{
        mapId: string
        centerPosition: {
            lat: number,
            lng: number
        },
        zoom: number,
        incidents: {
            
        }[],
    }>();

    const mapBox = ref<HTMLDivElement>();

    onMounted(async () => {
        const googleMaps = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
        const googleMarker = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
        await initMaps(googleMaps, googleMarker);
    })
    

    async function initMaps(googleMaps: google.maps.MapsLibrary, googleMarker: google.maps.MarkerLibrary) {
        if (!mapBox.value) return;

        // create map
        const map = new googleMaps.Map(mapBox.value, {
            center: props.centerPosition,
            zoom: props.zoom,
            mapId: props.mapId
        });

        // debug map capabilities
        // const mapCapabilities = map.getMapCapabilities();
        // console.debug("map capabilities:\n", mapCapabilities);
        
        // set up resize handler
        map.addListener("resize", ()=>{
            onMapResize(map);
        })

        drawMarkers(map, googleMarker);
    }


    function drawMarkers(map: google.maps.Map, googleMarker: google.maps.MarkerLibrary) {
        function createMarker() {
            const glyphImg = document.createElement("img");
            glyphImg.src = iconVictimsDetained;
            glyphImg.classList.add("h-8", "w-8", "bg-red-500", "rounded-full", "p-1");
            return glyphImg;
        }    
        

        new googleMarker.AdvancedMarkerElement({
            map,
            position: {lat: 32.0426261, lng: 34.7469578},
            content: createMarker(),
            title: 'A marker using a custom PNG Image'
        });
    }

    function onMapResize(map: google.maps.Map) {
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