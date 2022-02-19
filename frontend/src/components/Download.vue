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
            @click="downloadFile(file.link)"
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

export default {
  name: 'DownloadOps',
  props: {
    'downloads': Array,
  },
  data: () => ({
    downloadIcon: mdiCloudDownloadOutline
  }),
  methods: {
    downloadFile(reqDest) {
      console.log('download', reqDest);
    }
  }
}
</script>