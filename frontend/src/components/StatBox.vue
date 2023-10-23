<script setup lang="ts">
</script>

<template>
    <div class="flex flex-row items-center border border-base-content m-1 p-1">
        <div class="p-4 text-center grow">
            <slot name="label" />
        </div>
        <div class="flex flex-col grow">
            <slot />
        </div>
    </div>
    
</template>