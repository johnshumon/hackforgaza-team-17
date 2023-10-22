<script setup>
    const year = new Date().getFullYear();
</script>

<template>
    <div class="flex flex-col min-h-screen bg-gray-200">
        <!-- App Bar -->
        <header class="flex items-center justify-between bg-primary p-4">
            <a href="/" class="font-extrabold text-white text-2xl sm:text-3xl">
                Genocide∙Watch
            </a>
            <button class="btn">
                Share
                <i class="fi fi-ss-share-square"></i>
            </button>
        </header>
        <!-- Main -->
        <main class="grow">
            <slot/>
        </main>
        <!-- Footer -->
        <footer class="flex justify-center items-center bg-base-300 h-[2rem]">
            <p class="text-xs opacity-50">Copyright © {{ year }} by <span class="text-primary">Genocide Watch</span></p>
        </footer>
    </div>
</template>