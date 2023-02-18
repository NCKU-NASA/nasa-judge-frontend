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
        <li>Click the <strong>Judge</strong> button <strong>(10s cooldown)</strong></li>
        <li>Good luck! :)</li>
      </ol>
    </v-alert>
    <v-alert
        id="error-msg"
        type="error"
        :value="isShowError"
        transition="fade-transition"
    >
      {{ errMsg }}
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
          :disabled="isConfigLoading"
          @click="downloadConfig"
      >
        Download Config
      </v-btn>
      <v-btn
          :loading="isDescriptionLoading"
          :disabled="isDescriptionLoading"
          @click="downloadDescription"
      >
        Description
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
      <div class="ml-9 black--text">
        Current Highest Score: {{ maxScore }}
      </div>
      <div v-show="isShowScore" class="ml-9 red--text">
        Score: {{ score }}
      </div>
    </div>
    <div class="file-ops">
      <div v-if="isNotEmpty(selectedLab.downloads)">
        <Download
          :downloads="selectedLab.downloads"
          :labId="selectedId"
          @request-error="showErrorAlert"
        />
      </div>
      <div v-if="isNotEmpty(selectedLab.uploads)">
        <Upload
          :uploads="selectedLab.uploads"
          @file-uploaded="onUploadFileChange"
        />
      </div>
      <div v-if="isNotEmpty(selectedLab.inputs)">
        <TextInput
          :textInputs="selectedLab.inputs"
          @input-changed="onInputChange"
        />
      </div>
      <div class=resultdiv>
        <p style="text-align:left;">results: </p>
        <textarea class="result" readonly name="" id="result" cols="30" rows="10"></textarea>
        <p style="text-align:left;">stdout: </p>
        <textarea class="result" readonly name="" id="stdout" cols="30" rows="10"></textarea>
        <p style="text-align:left;">stderr: </p>
        <textarea class="result" readonly name="" id="stderr" cols="30" rows="10"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import labService from '@/services/lab';
import fileService from '@/services/file';
import checkcanjudgeService from '@/services/checkcanjudge';
import Download from '@/components/Download';
import Upload from '@/components/Upload';
import TextInput from '@/components/TextInput';
import { isEmpty, isNotEmpty } from '@/helpers/helper';

export default {
  name: 'Lab',
  data: () => ({
    labs: [],
    selectedId: -1,
    score: 0,
    maxScore: 0,
    isFilledUpload: false,
    isJudgeLoading: false,
    isConfigLoading: false,
    isDescriptionLoading: false,
    isShowError: false,
    isShowScore: false,
    errMsg: '',
  }),
  components: {
    Download,
    Upload,
    TextInput
  },
  computed: {
    labIds: function() {
      return this.labs.map((lab) => lab.id);
    },
    selectedLab: function() {
      if(document.getElementById("result") != null)
      {
        document.getElementById("result").innerHTML = "";
      }
      if(document.getElementById("stdout") != null)
      {
        document.getElementById("stdout").innerHTML = "";
      }
      if(document.getElementById("stderr") != null)
      {
        document.getElementById("stderr").innerHTML = "";
      }
      if (this.selectedId < 0) {
        return [];
      }
      return this.labs.find((lab) => lab.id === this.selectedId);
    },
    isCanJudge: function() {
      return this.isFilledUpload && !this.isJudgeLoading;
    },
  },
  methods: {
    async downloadConfig() {
      this.isConfigLoading = true;
      try {
        await fileService.downloadFile('/user/config', 'userconfig.zip');
      } catch (err) {
        this.showErrorAlert(err.response.statusText);
      } finally {
        this.isConfigLoading = false;
      }
    },
    async downloadDescription() {
      this.isDescriptionLoading = true;
      try {
        await fileService.downloadFile(`/${this.selectedLab.id}/download/description`, 'Description.pdf');
      } catch (err) {
        this.showErrorAlert(err.response.statusText);
      } finally {
        this.isDescriptionLoading = false;
      }
    },
    async judge() {
      this.isJudgeLoading = true;
      this.isShowScore = false;
      try {
        const formData = new FormData();
        formData.append('id', this.selectedLab.id);
        this.selectedLab.uploads.forEach((upload) => {
          formData.append(upload.name, upload.file);
        });
        this.selectedLab.inputs.forEach((input) => {
          formData.append(input.name, input.data);
        })
        
        const canjudge = await checkcanjudgeService.canjudge('/judge/canjudge');
        if (canjudge)
        {
          const result = await fileService.uploadFile('/judge', formData);
          if (result.data.alive === true) {
            //console.log(result);
            var stdout = result.data.stdout;
            var stderr = result.data.stderr;
            delete result.data['alive'];
            delete result.data['stdout'];
            delete result.data['stderr'];
            document.getElementById("result").innerHTML = JSON.stringify(result.data, undefined, 4);
            document.getElementById("stdout").innerHTML = stdout;
            document.getElementById("stderr").innerHTML = stderr;
            this.score = result.data.score;
            this.isShowScore = true;
            if (this.score > this.maxScore) {
              this.maxScore = this.score;
            }
            setTimeout(() => {
              this.isShowScore = false;
            }, 3000);
          }
          else
          {
            document.getElementById("result").innerHTML = "Back-end is on maintenance";
          }
        } else {
          document.getElementById("result").innerHTML = "You are in judging. Please wait.";
        }
      } catch (err) {
        this.showErrorAlert(err.response.data);
      } finally {
        this.isJudgeLoading = false;
      }
    },
    showErrorAlert(errMsg) {
      if (!this.isShowError) {
        this.isShowError = true;
        this.errMsg = errMsg;
        window.setTimeout(() => {
          this.isShowError = false;
        }, 3000);
      }
    },
    // put the uploaded file into corresponding uploads obj
    onUploadFileChange({ id, file }) {
      let contentIndex = this.selectedLab.uploads.findIndex(content => content.alias === id);

      // this.selectedLab.contents[i] cannot trigger watcher
      this.$set(this.selectedLab.uploads, contentIndex, {
        ...this.selectedLab.uploads[contentIndex],
        file,
      })
    },
    onInputChange({ name, data }) {
      let contentIndex = this.selectedLab.inputs.findIndex(content => content.name === name);

      // this.selectedLab.contents[i] cannot trigger watcher
      this.$set(this.selectedLab.inputs, contentIndex, {
        ...this.selectedLab.inputs[contentIndex],
        data,
      })
    },
    isNotEmpty(val) {
      return isNotEmpty(val);
    },
  },
  watch: {
    'selectedLab.uploads': {
      handler: function() {
        if (isEmpty(this.selectedLab.uploads)) {
          this.isFilledUpload = true;
        } else {
          this.isFilledUpload = !this.selectedLab.uploads.some(content => isEmpty(content.file));
        }
      },
    },
    selectedId: {
      handler: async function() {
        this.maxScore = await labService.getMaxLabScore(this.selectedId);
      },
    },
  },
  async beforeMount() {
    this.labs = await labService.getLabs();
    this.selectedId = this.labs[0].id;
    this.maxScore = await labService.getMaxLabScore(this.selectedId);
    this.isJudgeLoading = !(await checkcanjudgeService.canjudge('/judge/canjudge'));
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
    margin-bottom: 40px;
  }

  #instruction {
    width: 600px;
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

  .result {
    width: 100%;
    height: 100%;
    min-height: 30rem;
    font-family: "Lucida Console", Monaco, monospace;
    font-size: 0.8rem;
    line-height: 1.2;
  }
}
</style>
