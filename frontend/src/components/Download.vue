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
      Download {{ fileType }}
    </v-card-title>
  </v-card>
</template>

<script>
import { mdiCloudDownloadOutline } from '@mdi/js';

export default {
  name: 'DownloadOps',
  props: {
    'reqDest': String,
    'fileType': String,
  },
  data: () => ({
    downloadIcon: mdiCloudDownloadOutline
  })
}
</script>