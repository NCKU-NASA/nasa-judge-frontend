<template>
  <v-card
      elevation="2"
      min-height="100px"
      min-width="20%"
      max-width="800px"
      class="ma-9 ml-0 rounded-lg"
  >
    <v-card-title>
      <v-icon class="mr-3">{{ uploadIcon }} </v-icon>
      Upload Files
    </v-card-title>
    <v-card-text>
      <v-file-input v-for="(file) in uploads"
          :key="file.alias"
          :placeholder="file.name"
          @change="onFilePicked($event, file.alias)"
          truncate-length="70"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiCloudUploadOutline } from '@mdi/js';

export default {
  name: 'UploadOps',
  props: {
    'uploads': Array,
  },
  data: () => ({
    uploadIcon: mdiCloudUploadOutline,
  }),
  methods: {
    onFilePicked(file, fileId) {
      this.$emit('file-uploaded', { id: fileId, file })
    }
  }
}
</script>
