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
            @click="downloadFile(file.link, file.name)"
            class="mr-5"
        >
          Download {{ file.text }}
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiCloudDownloadOutline } from '@mdi/js';
import fileService from '@/services/file';

export default {
  name: 'DownloadOps',
  props: {
    'downloads': Array,
  },
  data: () => ({
    downloadIcon: mdiCloudDownloadOutline
  }),
  methods: {
    async downloadFile(uri, filename) {
      try {
        await fileService.downloadFile(uri, filename);
      } catch(err) {
        this.$emit('request-error', err.response.statusText);
      }
    }
  }
}
</script>