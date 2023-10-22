<script setup lang="ts">
import IncidentMap from '../components/IncidentMap.vue';
import { useMainHeight } from '../composables/mainHeight';

const PalestineCenter = {
  lat: 31.320443,
  lng: 35.109374
};

const { mainHeight } = useMainHeight();
</script>

<template>
  <div ref="mainBox">
    <IncidentMap :center-position="PalestineCenter" :zoom="7" :height="mainHeight" />
  </div>
</template>
