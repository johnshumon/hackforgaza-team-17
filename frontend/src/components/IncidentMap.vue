<script setup lang="ts">
import { mergeProps, onBeforeMount, onMounted, ref, watch } from 'vue';
import {} from "google.maps";
import { MarkerClusterer, Renderer } from "@googlemaps/markerclusterer";
import iconVictimsKilled from "../assets/icons/victims/killed.svg";
import iconVictimsMaimed from "../assets/icons/victims/maimed.svg";
import iconVictimsInjured from "../assets/icons/victims/injured.svg";
import iconVictimsDetained from "../assets/icons/victims/detained.svg";
import iconVictimsDispossessed from "../assets/icons/victims/dispossessed.svg";
import iconIncident from "../assets/icons/victims/incident.svg";
import type { Incident } from '@/model/incident';

    const props = defineProps<{
        mapId: string
        centerPosition: {
            lat: number,
            lng: number
        },
        zoom: number,
        incidents: Incident[],
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
        mapId: props.mapId,
        clickableIcons: false,
        fullscreenControl: false,
        mapTypeControl: false
    });

    // debug map capabilities
    // const mapCapabilities = map.getMapCapabilities();
    // console.debug("map capabilities:\n", mapCapabilities);

    // set up resize handler
    map.addListener("resize", () => {
        onMapResize(map);
    })

    drawMarkers(map, googleMarker);
}



    function drawMarkers(map: google.maps.Map, googleMarker: google.maps.MarkerLibrary) {
        function selectIconImage(incident: Incident) : string {
            if (incident.killed > 0) return iconVictimsKilled;
            if (incident.maimed > 0) return iconVictimsMaimed;
            if (incident.injured > 0) return iconVictimsInjured;
            if (incident.detained > 0) return iconVictimsDetained;
            if (incident.dispossessed > 0) return iconVictimsDispossessed;
            return iconIncident;
        }

        function selectIconColourClass(incident: Incident) : string {
            if (incident.killed < 1 && incident.maimed < 1 && incident.injured < 1) {
                return "bg-amber-500"
            } else {
                return "bg-red-500"
            }
        }
        
        function createMarkerGlyph(incident: Incident) {
            const glyphWrapper = document.createElement("div");
            glyphWrapper.classList.add("h-12", "w-12", "flex", "justify-center", "items-center", "rounded-full", selectIconColourClass(incident));
            const glyphImg = document.createElement("img");
            glyphWrapper.appendChild(glyphImg);
            glyphImg.src = selectIconImage(incident);
            glyphImg.classList.add("p-1");
            glyphImg.style.cursor = "pointer"
            return glyphWrapper;
        }    
        function createMarker(incident: Incident) {
            const marker = new googleMarker.AdvancedMarkerElement({
                map,
                position: incident.location,
                content: createMarkerGlyph(incident),
            });
            marker.addListener("click", ()=>{
                console.log(incident)
            })
            return marker;
        }
        
        // generate markers
        const markers : google.maps.marker.AdvancedMarkerElement[] = [];
        props.incidents.forEach((incident)=>{
            markers.push(createMarker(incident));
        });

        // create marker cluster to manage markers
        const clusterRenderer : Renderer = {
            render(cluster, stats, map) {
                const count = cluster.count;
                const position = cluster.position;
                // change color if this cluster has more markers than the mean cluster
                const color =
                count > Math.max(10, stats.clusters.markers.mean)
                    ? "#ff0000"  // <-- comparative high colour
                    : "#ff4f00"; // <-- comparitive low colour
                // create svg url with fill color
                const svg = window.btoa(`
                <svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
                <circle cx="120" cy="120" opacity="1" r="70" />
                <circle cx="120" cy="120" opacity=".6" r="90" />
                <circle cx="120" cy="120" opacity=".3" r="110" />
                <circle cx="120" cy="120" opacity=".15" r="130" />
                </svg>`);
                // create marker using svg icon
                return new google.maps.Marker({
                position,
                icon: {
                    url: `data:image/svg+xml;base64,${svg}`,
                    scaledSize: new google.maps.Size(45, 45),
                },
                label: {
                    text: String(count),
                    color: "rgba(255,255,255,0.9)",
                    fontSize: "18px",
                },
                // adjust zIndex to be above other markers
                zIndex: 1000 + count,
                });
            },
        }
        new MarkerClusterer({map, markers, renderer: clusterRenderer});
    }

function onMapResize(map: google.maps.Map) {
    // do something here
}

function resetMap() {
    // do something here
}
</script>

<template>
    <div ref="mapBox" v-bind="$attrs">
    </div>
</template>