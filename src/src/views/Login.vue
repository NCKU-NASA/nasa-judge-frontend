<template>
  <div class='full'>
    <div class='lining'></div>
    <v-card>
      <v-tabs
        v-model="tab"
        color="deep-purple-accent-4"
        centered
      >
        <v-tab :key="signin">Sign In</v-tab>
        <v-tab :key="signup">Sign Up</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item :key="signin">
          <div class='login-div'>
            <v-alert
              color='red'
              type='error'
              :value='loginError'
            >
              {{ message }}
            </v-alert>
            <form class='login-form'>
              <v-text-field
                label='User Name'
                v-model='username'
                @keyup.enter='login'
              ></v-text-field>
              <v-text-field 
                label='Password'
                v-model='password'
                type='password'
                @keyup.enter='login'
              ></v-text-field>
              <v-btn
                @click='login'
              >
                Login
              </v-btn>
            </form>
          </div>
        </v-tab-item>
        <v-tab-item :key="signup">
          <div class='login-div'>
            <v-alert
              color='red'
              type='error'
              :value='signupError'
            >
              {{ message }}
            </v-alert>
            <v-alert
              color='green'
              type='success'
              :value='signupSuccess'
            >
              {{ message }}
            </v-alert>
            <form class='login-form'>
              <v-text-field
                label='User Name'
                v-model='username'
                @keyup.enter='signup'
              ></v-text-field>
              <v-text-field
                label='E-mail'
                v-model='email'
                @keyup.enter='signup'
              ></v-text-field>
              <v-text-field 
                label='Password'
                v-model='password'
                type='password'
                @keyup.enter='signup'
              ></v-text-field>
              <v-text-field 
                label='Password Confirmation'
                v-model='checkpassword'
                type='password'
                @keyup.enter='signup'
              ></v-text-field>
              <v-text-field
                label='StudentId'
                v-model='studentId'
                @keyup.enter='signup'
              ></v-text-field>
              <v-btn
                @click='signup'
              >
                Login
              </v-btn>
            </form>
          </div>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import userService from '@/services/user';
export default {
  name: 'Login',
  data: () => ({
    tab: null,
    username: '',
    password: '',
    checkpassword: '',
    email: '',
    studentId: '',
    loginError: false,
    signupError: false,
    signupSuccess: false,
    message: ''
  }),
  methods: {
    login: async function() {
      const result = await userService.login(this.username, this.password);
      switch (result.status) {
        case 200:
          this.loginError = false;
          this.$router.push('/lab');
          break;
        default:
          this.loginError = true;
          this.message = result.data;
      }
    },
    signup: async function() {
      if(this.password !== this.checkpassword) {
        this.signupError = true;
        this.signupSuccess = false;
        this.message = "Password confirmation does not match.";
        return
      }
      const result = await userService.signup(this.username, this.password, this.email, this.studentId);
      switch (result.status) {
        case 200:
          this.signupError = false;
          this.signupSuccess = true;
          this.message = "Confirmation mail sent. Please check your email.";
          break;
        default:
          this.signupError = true;
          this.signupSuccess = false;
          this.message = result.data;
      }
    }
  }
}
</script>

<style scoped>
.lining {
  height: 25%;
}

.full {
  flex-direction: column;
  width: 100%;
  height: 100%;
}

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
