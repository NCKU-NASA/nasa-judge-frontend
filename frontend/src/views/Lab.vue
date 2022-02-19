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
        <li>Upload / Download required files</li>
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
        :items="labIds"
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
          :disabled="!isCanJudge"
          @click="judge"
          color="teal"
          :dark="isCanJudge"
      >
        Judge
      </v-btn>
      <div v-show="isShowScore" class="ml-9 red--text">
        Score: {{ score }}
      </div>
    </div>
    <div class="file-ops">
      <div v-if="isNotEmpty(selectedLab.downloads)">
        <Download
          :downloads="selectedLab.downloads"
        />
      </div>
      <div v-if="isNotEmpty(selectedLab.uploads)">
        <Upload
          :uploads="selectedLab.uploads"
          @file-uploaded="onUploadFileChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import labService from '@/services/lab';
import Download from '@/components/Download';
import Upload from '@/components/Upload';
import { isEmpty, isNotEmpty } from '@/helpers/helper';

export default {
  name: 'Lab',
  data: () => ({
    labs: [],
    selectedId: -1,
    score: 0,
    isCanJudge: false,
    isJudgeLoading: false,
    isConfigLoading: false,
    isShowError: false,
    isShowScore: false,
  }),
  components: {
    Download,
    Upload,
  },
  computed: {
    labIds: function() {
      return this.labs.map((lab) => lab.id);
    },
    selectedLab: function() {
      if (this.selectedId < 0) {
        return [];
      }
      return this.labs.find((lab) => lab.id === this.selectedId);
    },
  },
  methods: {
    async downloadConfig() {
      this.isConfigLoading = false;
      try {
        await labService.downloadFile('/user/config', 'lab_config.zip');
      } catch (err) {
        this.showErrorAlert();
      } finally {
        this.isConfigLoading = false;
      }
    },
    async judge() {
      this.isJudgeLoading = true;
      this.isShowScore = false;
      try {
        console.log("Judge btn click!")
        // TODO upload file API (selectedLab.uploads[i].file)
        // TODO judge API (return score)
        this.score = 100;
        this.isShowScore = true;
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
    },
    // put the uploaded file into corresponding uploads obj
    onUploadFileChange({ id, file }) {
      let contentIndex = this.selectedLab.uploads.findIndex(content => content.id === id);

      // this.selectedLab.contents[i] cannot trigger watcher
      this.$set(this.selectedLab.uploads, contentIndex, {
        ...this.selectedLab.uploads[contentIndex],
        file,
      })
    },
    isNotEmpty(val) {
      return isNotEmpty(val);
    }
  },
  watch: {
    'selectedLab.uploads': {
      handler: function () {
        if (isEmpty(this.selectedLab.uploads)) {
          this.isCanJudge = true;
        } else {
          this.isCanJudge = !this.selectedLab.uploads.some(content => isEmpty(content.file));
        }
      },
    },
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