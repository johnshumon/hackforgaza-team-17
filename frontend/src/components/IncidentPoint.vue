<script setup lang="ts">
import Vue from 'vue'
</script>

<template>
    <div>
        <button class="w-4 h-4 rounded-full bg-red-700 ring-8 ring-red-500/40"
            onclick="incidentModal.showModal()">
        </button>
        <dialog id="incidentModal" class="modal">
            <div class="modal-box">
                <h3 class="font-bold text-lg">Hello!</h3>
                <p class="py-4">Incident {{ }}</p>
            </div>
            <form method="dialog" class="modal-backdrop cursor-default">
                <button>close</button>
            </form>
        </dialog>
    </div>
</template>