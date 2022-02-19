<template>
  <div class='lab-container'>
    <v-alert
        id="instruction"
        elevation="3"
        text
        type="info"
    >
      <ol>
        <li>Click <strong>Download Config</strong> for the config file (same for every lab)</li>
        <li>Select the lab you want to submit</li>
        <li>Upload / Download corresponding files</li>
        <li>Click the <strong>Judge</strong> button</li>
        <li>Good luck! :)</li>
      </ol>
    </v-alert>
    <v-alert
        id="error-msg"
        type="error"
        :value="isShowError"
        transition="fade-transition"
    >
      Sorry, something went wrong :( Please try again later.
    </v-alert>
    <div class="lab-nav">
      <v-select
        :items="labId"
        hide-details
        filled
        label="Select Lab"
        dense
        v-model='selectedId'
      ></v-select>
      <v-btn
          :loading="isConfigLoading"
          @click="downloadConfig"
      >
        Download Config
      </v-btn>
      <v-btn
          :loading="isJudgeLoading"
          @click="judge"
          color="teal"
          dark
      >
        Judge
      </v-btn>
    </div>
    <div class="file-ops-list">
      <div v-for="(fileOps, i) in selectedLab.contents" :key="i">
        <div v-if="fileOps.type === 'download'">
          <Download
            :req-url="fileOps.link"
            :text="fileOps.text"
          />
        </div>
        <div v-else-if="fileOps.type === 'upload'">
          <Upload
            :req-url="fileOps.link"
            :text="fileOps.text"
          />
        </div>
        <div v-else>
          <v-alert type="error">Unknown Action</v-alert>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import labService from '@/services/lab';
import Download from '@/components/Download';
import Upload from '@/components/Upload';

export default {
  name: 'Lab',
  data: () => ({
    labs: [],
    selectedId: -1,
    isJudgeLoading: false,
    isConfigLoading: false,
    isShowError: false,
  }),
  components: {
    Download,
    Upload,
  },
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
      this.isConfigLoading = false;
      try {
        await labService.downloadFile('/user/config', 'lab_config.zip');
      } catch (err) {
        this.showErrorAlert();
      } finally {
        this.isConfigLoading = true;
      }
    },
    async judge() {
      this.isJudgeLoading = true;
      try {
        console.log("Judge btn click!")
        // TODO judge API
      } catch (err) {
        this.showErrorAlert();
      } finally {
        this.isJudgeLoading = false;
      }
    },
    showErrorAlert() {
      if (!this.isShowError) {
        this.isShowError = true;
        window.setTimeout(() => {
          this.isShowError = false;
        }, 5000);
      }
    }
  },
  async beforeMount() {
    this.labs = await labService.getLabs();
    this.selectedId = this.labs[0].id;
  },
}
</script>

<style lang="scss">
.lab-container {
  flex-direction: column;
  display: flex;
  width: 100%;
  height: 100%;
  padding: 20px;

  .lab-nav {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    .v-select {
      max-width: 200px;
    }

    .v-btn {
      height: 46px;
      margin-left: 50px;
    }
  }

  #error-msg {
    width: 500px;
    align-self: center;
    margin-bottom: 40px;
  }

  #instruction {
    width: 600px;
    align-self: center;
    margin-bottom: 40px;
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
}
</style>