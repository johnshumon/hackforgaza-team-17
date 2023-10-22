<script setup lang="ts">
import IncidentMap from '../components/IncidentMap.vue';
import { useMainHeight } from '../composables/mainHeight';
import { GMAP_MAP_ID_MAIN_INCIDENT_MAP } from '../libs/google-maps';

const PalestineCenter = {
  lat: 31.320443,
  lng: 35.109374
};

const { mainHeight } = useMainHeight();
</script>

<template>
  <div ref="mainBox">
    <IncidentMap :mapId="GMAP_MAP_ID_MAIN_INCIDENT_MAP" :center-position="PalestineCenter" :zoom="7" :style="{height: mainHeight}" />
  </div>
</template>
