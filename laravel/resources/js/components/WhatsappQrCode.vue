<template>
    <div v-if="qrCodeImage" class="bg-white p-5">
        <img :src="qrCodeImage" class="mx-auto" >
    </div>
    <small v-else class="">Not available.</small>

</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';


let qrCodeImage = ref(null);
const pusherData = reactive({
    'key': import.meta.env.VITE_PUSHER_KEY,
    'cluster': import.meta.env.VITE_PUSHER_CLUSTER,
    'channel': import.meta.env.VITE_PUSHER_CHANNEL,
    'event': import.meta.env.VITE_PUSHER_EVENT,
});


Pusher.logToConsole = true;

const pusher = new Pusher(pusherData.key, {
    cluster: pusherData.cluster
});

const channel = pusher.subscribe(pusherData.channel);
channel.bind(pusherData.event, function(data) {
    if (data.url??null) 
        qrCodeImage.value = data.url;
});

</script>