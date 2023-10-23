<script setup lang="ts">
import { computed, onBeforeMount, onMounted, onUpdated, ref, watch } from 'vue';
import IncidentMap from '../components/IncidentMap.vue';
import IncidentModal from '../components/Modal.vue';
import { useMainHeight } from '../composables/mainHeight';
import { GMAP_MAP_ID_MAIN_INCIDENT_MAP } from '../libs/google-maps';
import { getIncidents } from '@/api';
import { useRoute, useRouter } from 'vue-router';
import dayjs from "@/libs/dayjs"
import StatBox from '@/components/StatBox.vue';
import truncate from "truncate";
const route = useRoute();
const router = useRouter();

// dynamic ui
const { mainHeight } = useMainHeight();

// get query params
const incidentId = ref<string>();
onUpdated(()=>{
  const _incidentId = route.query.incident;
  if (_incidentId && typeof _incidentId === "string") {
    incidentId.value = _incidentId;
  } else {
    incidentId.value = undefined;
  }
})

const PalestineCenter = {
  lat: 31.320443,
  lng: 35.109374
};

// get incidents data
const incidentsData = ref<Awaited<ReturnType<typeof getIncidents>>>();
onMounted(async ()=>{
  try {
    incidentsData.value = await getIncidents("palestinian");
  } catch (e) {
    console.error("Failed to fetch data:\n", e);
  }
})

// get selected incident
const incident = computed(()=>{
  if (!incidentsData.value || !incidentId.value) return;
  return incidentsData.value.find((i)=>(i.id === incidentId.value));
})

// show incident modal if an incident is selected
const showIncidentModal = ref<boolean>(false);
watch(incident, (val)=>{
  if (val) {
    showIncidentModal.value = true;
  }
})
watch(showIncidentModal, (val)=>{
  if(!val) {
    router.push({name: "home"});
  }
})
</script>

<template>
  <div ref="mainBox" v-if="incidentsData">
    <IncidentMap :mapId="GMAP_MAP_ID_MAIN_INCIDENT_MAP" :center-position="PalestineCenter" :zoom="7" :style="{height: mainHeight}" :incidents="incidentsData"/>
    <IncidentModal v-model:visible="showIncidentModal">
      <div v-if="incident">
          <h2 class="text-2xl font-bold mb-4">{{ incident.title }}</h2>
          <p v-if="incident.dateTime" class="text-base mb-2">{{ dayjs(incident.dateTime).format("dddd Do MMMM YYYY") }}</p>
  
          <div class="flex flex-col sm:flex-row sm:flex-wrap gap-2 mb-2">
            <div v-for="category in incident.categories" class="bg-neutral text-white text-xs px-4 py-3 font-semibold" :key="category">{{ category }}</div>
          </div>

          <div class="flex flex-col sm:flex-row gap-2 mb-4">
            <div class="border border-neutral px-3 py-1 text-center" v-if="incident.killed">{{ incident.killed }} killed</div>
            <div class="border border-neutral px-3 py-1 text-center" v-if="incident.maimed">{{ incident.maimed }} maimed</div>
            <div class="border border-neutral px-3 py-1 text-center" v-if="incident.injured">{{ incident.injured }} injured</div>
            <div class="border border-neutral px-3 py-1 text-center" v-if="incident.detained">{{ incident.detained }} detained</div>
            <div class="border border-neutral px-3 py-1 text-center" v-if="incident.dispossessed">{{ incident.dispossessed }} dispossessed</div>
          </div>

          <p class="my-12 max-w-prose mx-auto sm:text-lg">{{ truncate(incident.description, 250) }}</p>

            <StatBox v-if="incident.killed" class="hidden sm:flex mb-12">
            <template v-slot:label>
              <p class="font-bold">{{ incident.killed }} killed</p>
            </template>
            <template v-slot:default>
              <StatBox v-if="incident.adult_killed">
                <template v-slot:label>
                  <p class="font-bold">{{ incident.adult_killed }} adult</p>
                </template>
                <template v-slot:default>

                  <StatBox v-if="incident.adult_male_killed">
                    <template v-slot:label>
                      <p class="font-bold">{{ incident.adult_male_killed }} male</p>
                    </template>
                    </StatBox>
                    <StatBox v-if="incident.adult_female_killed">
                      <template v-slot:label>
                        <p class="font-bold">{{ incident.adult_female_killed }} female</p>
                      </template>
                    </StatBox>
                    <StatBox v-if="incident.adult_ungendered_killed">
                      <template v-slot:label>
                        <p class="font-bold">{{ incident.adult_ungendered_killed }} unknown</p>
                      </template>
                    </StatBox>

                </template>
              </StatBox>
              <StatBox v-if="incident.child_killed">
                <template v-slot:label>
                  <p class="font-bold">{{ incident.child_killed }} children</p>
                </template>
                <template v-slot:default>
                  
                  <StatBox v-if="incident.child_male_killed">
                    <template v-slot:label>
                      <p class="font-bold">{{ incident.child_male_killed }} male</p>
                    </template>
                    </StatBox>
                    <StatBox v-if="incident.child_female_killed">
                      <template v-slot:label>
                        <p class="font-bold">{{ incident.child_female_killed }} female</p>
                      </template>
                    </StatBox>
                    <StatBox v-if="incident.child_ungendered_killed">
                      <template v-slot:label>
                        <p class="font-bold">{{ incident.child_ungendered_killed }} unknown</p>
                      </template>
                    </StatBox>

                </template>
              </StatBox>
            </template>
          </StatBox>


          <div class="flex flex-col gap-4 sm:flex-row justify-between">

            <button class="btn btn-lg" @click="showIncidentModal = false">Close</button>

            <div class="flex flex-col gap-4 sm:flex-row justify-between">
              <button class="btn btn-lg btn-neutral">
                Share
                <i class="fi fi-ss-share-square"></i>
              </button>

              <button class="btn btn-lg btn-neutral" @click="router.push({name:'incident', params:{id:incident.id}})">
                Read More
                <i class="fi fi-ss-book-arrow-right"></i>
              </button>
            </div>

          </div>
      </div>
      
      
      
    </IncidentModal>
  </div>
</template>
