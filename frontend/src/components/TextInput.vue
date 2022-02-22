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
      Fill
    </v-card-title>
    <v-card-text>
      <v-text-field v-for="(input) in textInputs"
          :key="input.name"
          :placeholder="input.text"
          @change="onInputChange($event, input.name)"
          truncate-length="70"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiCloudUploadOutline } from '@mdi/js';

export default {
  name: 'inputOps',
  props: {
    'textInputs': Array,
  },
  data: () => ({
    uploadIcon: mdiCloudUploadOutline,
  }),
  methods: {
    onInputChange(data, name) {
      this.$emit('input-changed', { name, data })
    }
  }
}
</script>