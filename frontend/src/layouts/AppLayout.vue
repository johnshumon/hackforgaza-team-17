<script setup>
    const year = new Date().getFullYear();
</script>

<template>
    <div class="flex flex-col min-h-screen">
        <!-- App Bar -->
        <header class="flex items-center justify-between bg-primary p-4">
            <p class="font-extrabold text-white text-2xl sm:text-3xl">
                Genocide∙Watch
            </p>
            <button class="btn">
                Share
                <i class="fi fi-ss-share-square"></i>
            </button>
        </header>
        <!-- Main -->
        <div class="grow">
            <slot/>
        </div>
        <!-- Footer -->
        <footer class="flex justify-center items-center bg-base-300 h-[2rem]">
            <p class="text-xs opacity-50">Copyright © {{ year }} by <span class="text-primary">Genocide Watch</span></p>
        </footer>
    </div>
</template>