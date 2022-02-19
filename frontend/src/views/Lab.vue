<template>
  <div>
    <div class='login-div'>
      <div>
        <v-btn
          id="config-btn"
          @click="downloadConfig"
      >
        Download Config
      </v-btn>
    </div>
    <div>
    <div class="file-ops">

    </div>
      <v-list rounded>
        <v-list-item-group
          color="primary"
        >
          <v-list-item
            v-for="(content, i) in selectedLab.contents"
            :key="i"
          >
            <v-list-item-icon>
              <v-icon>{{ content.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="content.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
  </div>
  </div>
</template>

<script>
import labService from '@/services/lab';

export default {
  name: 'Lab',
  data: () => ({
    labs: [],
    selectedId: -1,
  }),
  computed: {
    labId() {
      return this.labs.map((lab) => lab.id);
    },
    selectedLab() {
      if (this.selectedId < 0) {
        return [];
      }
      return this.labs.find((lab) => lab.id === this.selectedId);
    }
  },
  methods: {
    async downloadConfig() {
      await labService.downloadFile('/user/config', 'lab_config.zip');
    },
  },
  async beforeMount() {
    this.labs = await labService.getLabs();
  },
}
</script>

<style lang="scss">
#instruction {
  width: 500px;

  .info--text {
    align-self: center;
    margin-right: 30px;
    margin-left: 10px;
  }
  .v-alert__content {
    text-align: left;
    line-height: 30px;
  }
}

.lab-nav {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  .v-select {
    max-width: 200px;
  }
}

#config-btn {
  height: 52px;
  margin-left: 50px;
}

.lab-container {
  flex-direction: column;
  display: flex;
  width: 100%;
  height: 100%;
  padding: 20px;
  align-items: center;
}

</style>