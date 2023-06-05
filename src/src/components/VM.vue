<template>
  <v-card
      elevation="2"
      min-height="100px"
      min-width="20%"
      max-width="800px"
      class="ma-9 ml-0 rounded-lg"
  >
    <v-card-title>
      <v-icon class="mr-3">{{ vmIcon }} </v-icon>
      VMs
    </v-card-title>
    <v-card-text>
      <div class="d-flex flex-row justify-start">
        <v-btn
            v-for="(vm, i) in vms" :key="i"
            @click="open(vm.name)"
            class="mr-5"
        >
          Open VM {{ vm.alias }}
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiCloudDownloadOutline } from '@mdi/js';

export default {
  name: 'VMOps',
  props: {
    'vms': Array,
  },
  data: () => ({
    vmIcon: mdiCloudDownloadOutline
  }),
  methods: {
    async open(vmname) {
      window.open(`${document.URL.split('#')[0]}vm?vmname=${vmname}`);
    }
  }
}
</script>
