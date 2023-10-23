<script setup lang="ts">
import { onMounted, ref } from 'vue';
import IncidentMap from '../components/IncidentMap.vue';
import { useMainHeight } from '../composables/mainHeight';
import { GMAP_MAP_ID_MAIN_INCIDENT_MAP } from '../libs/google-maps';
import { getIncidents } from '@/api';


const PalestineCenter = {
  lat: 31.320443,
  lng: 35.109374
};

const { mainHeight } = useMainHeight();

const data = ref<any>();
onMounted(async ()=>{
  try {
  data.value = await getIncidents("palestinian");
  } catch (e) {
    console.error("Failed to fetch data:\n", e);
  }
})
</script>

<template>
  <div ref="mainBox" v-if="data">
    <IncidentMap :mapId="GMAP_MAP_ID_MAIN_INCIDENT_MAP" :center-position="PalestineCenter" :zoom="7" :style="{height: mainHeight}" :incidents="data"/>
  </div>
</template>
