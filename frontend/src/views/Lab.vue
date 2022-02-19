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
        <v-select
          :items="labId"
          hide-details
          filled
          label="Select Lab"
          dense
          v-model='selectedId'
        ></v-select>
      </div>
    </div>
    <div>
      <v-list rounded>
        <v-list-item-group
          color="primary"
        >
          <v-list-item
            v-for="(content, i) in selectedLab.contents"
            :key="i"
          >
            <v-list-item-icon>
              <v-icon v-text="content.icon"></v-icon>
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
      const selectedLab = this.labs.find((lab) => lab.id === this.selectedId);
      return selectedLab;
    }
  },
  methods: {
    async downloadConfig() {
      await labService.downloadFile('/user/config', 'lab_config.zip');
    },
    async renderLabs() {

    }
  },
  async beforeMount() {
    const data = await labService.getLabs();
    this.labs = data.labs;
    this.labs.forEach((lab, i) => {
      this.labs[i].contents.forEach((content, j) => {
        if (content.type === 'download') {
          this.labs[i].contents[j].icon = 'file_download';
        }
        else if (content.type === 'upload') {
          this.labs[i].contents[j].icon = 'file_upload';
        }
      });
    });
    console.log(this.labs);
  },
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