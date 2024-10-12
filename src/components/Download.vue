<template>
  <v-card
      elevation="2"
      min-height="100px"
      min-width="20%"
      max-width="800px"
      class="ma-9 ml-0 rounded-lg"
  >
    <v-card-title>
      <v-icon class="mr-3">{{ downloadIcon }} </v-icon>
      Download Files
    </v-card-title>
    <v-card-text>
      <div class="d-flex flex-row justify-start">
        <v-btn
            v-for="(file, i) in downloads" :key="i"
            @click="downloadFile(labId, file.name)"
            class="mr-5"
        >
          Download {{ file.alias }}
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiCloudDownloadOutline } from '@mdi/js';
import fileService from '@/services/file';
import userService from '@/services/user';

export default {
  name: 'DownloadOps',
  props: {
    'downloads': Array,
    'labId': String
  },
  data: () => ({
    downloadIcon: mdiCloudDownloadOutline
  }),
  methods: {
    async downloadFile(lab, filename) {
      try {
        const token = (await fileService.getFileToken(`${lab}/${filename}`)).data;
        const userdata = (await userService.getuser()).data;
        await navigator.clipboard.writeText(`${document.URL.split('#')[0]}labs/${lab}/download/${filename}?username=${userdata.username}&token=${encodeURIComponent(token)}`);
        await fileService.downloadFile(`/labs/${lab}/download/${filename}`, userdata.username, token, filename);
      } catch(err) {
        this.$emit('request-error', err.response.statusText);
      }
    }
  }
}
</script>
