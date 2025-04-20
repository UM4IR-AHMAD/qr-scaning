<template>
    <div v-if="qrCodeImage" class="bg-white p-5">
        <img :src="qrCodeImage" class="mx-auto" >
    </div>
    <small v-else class="">Not available.</small>

</template>

<script setup>
import {ref} from 'vue';

// data
let qrCodeImage = ref(null);

Echo.channel('qr-code-url')
    .listen('QrCodeSent', (e) => {                
        qrCodeImage.value = e.message;
});
</script>