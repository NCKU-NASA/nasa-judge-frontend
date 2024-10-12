<template>
  <div class='login-div'>
    <v-alert
      color='red'
      type='error'
      :value='passwdError'
    >
      {{ message }}
    </v-alert>
    <form class='login-form'>
      <v-text-field 
        label='New Password'
        v-model='password'
        type='password'
        @keyup.enter='passwd'
      ></v-text-field>
      <v-text-field 
        label='Password Confirmation'
        v-model='checkpassword'
        type='password'
        @keyup.enter='passwd'
      ></v-text-field>
      <v-btn
        @click='passwd'
      >
        Change Passwd
      </v-btn>
    </form>
  </div>
</template>

<script>
import userService from '@/services/user';
export default {
  name: 'Passwd',
  data: () => ({
    password: '',
    checkpassword: '',
    passwdError: false,
    message: ''
  }),
  methods: {
    passwd: async function() {
      if(this.password !== this.checkpassword) {
        this.passwdError = true;
        this.message = "Password confirmation does not match.";
        return
      }
      const result = await userService.chpasswd(this.password);
      switch (result.status) {
        case 200:
          this.passwdError = false;
          this.$router.push('/');
          break;
        default:
          this.passwdError = true;
          this.message = result.data;
      }
    }
  },
  async beforeMount() {
    await userService.checkcanchpasswd();
  },
}
</script>

<style scoped>
.login-div {
  flex-direction: column;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}

.login-form {
  margin: 30px;
  width: 40%;
}
</style>
