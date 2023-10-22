import { onMounted, ref } from "vue";


export function useMainHeight() {
    const mainBox = ref<HTMLDivElement>();
    const mainHeight = ref("0px");

    function updateMainHeight() {
        if (!mainBox.value) {
            mainHeight.value = "0px";
        } else {
            mainHeight.value = mainBox.value.clientHeight + "px";
        }
    }

    onMounted(()=>{    
        // find mainBox
        const _main = document.getElementsByTagName("main");
        if (_main.length > 0) {
            mainBox.value = _main[0] as HTMLDivElement;
        } else {
            mainBox.value = undefined;
        }

        updateMainHeight();

        // update mainHeight on resize
        window.addEventListener("resize", ()=>{
            updateMainHeight();
        })
    })

    return {
        mainHeight
    }
}