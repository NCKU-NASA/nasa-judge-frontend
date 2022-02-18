<template>
  <div class='login-div'>
    <div>
      <v-btn
        id="config-btn"
        @click="downloadConfig"
      >
        Download Config
      </v-btn>
      <v-select
        :items="labId"
        hide-details
        filled
        label="Select Lab"
        dense
      ></v-select>
    </div>
  </div>
</template>

<script>
import labService from '@/services/lab';
export default {
  name: 'Lab',
  data: () => ({
    labs: [
      { id: 'Lab 1' },
      { id: 'Lab 2' }
    ],
  }),
  computed: {
    labId() {
      return this.labs.map((lab) => lab.id)
    }
  },
  methods: {
    getLabs() {

    },
    async downloadConfig() {
      await labService.downloadFile('/config');
    }
  }
}
</script>

<style scoped>
#config-btn {
  margin-bottom: 20px;
  height: 46px;
}

.login-div {
  flex-direction: column;
  display: flex;
  width: 100%;
  height: 100%;
  padding: 20px;
  align-items: center;
}

</style>