<script setup lang="ts">
import { computed, ref, watch, watchEffect } from 'vue';

    const props = defineProps<{
        visible: boolean
    }>();

    const emits = defineEmits<{
        "update:visible": [boolean]
    }>();

    // node
    const modal = ref<HTMLDialogElement>();

    // model
    const modelVisible = computed({
        get() {
            return props.visible;
        },
        set(value: boolean) {
            console.log("setting", value);
            emits("update:visible", value);
        }
    })

    // watch
</script>

<template>
    <dialog class="modal" ref="modal" :class="{'modal-open': modelVisible}">
        <div className="modal-box max-w-3xl">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="modelVisible=false">✕</button>
            <slot></slot>
        </div>
    </dialog>
</template>