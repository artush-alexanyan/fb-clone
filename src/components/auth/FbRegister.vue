<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="460"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          rounded-lg
          color='rgb(70,183,42)'
          class="text-capitalize white--text font-weight-bold ma-5 pa-6 text-subtitle-1" 
          v-bind="attrs"
          v-on="on"
        >
          create a new account
        </v-btn>
      </template>
      <v-card class="pa-5">
        <v-card-title class="text-h4 text-bold">
          Sign Up
        </v-card-title>
        <v-card-text>It’s quick and easy.</v-card-text>

        <form>
            <div class="d-flex">
                <v-text-field 
                    class="mx-3" 
                    placeholder="First name" outlined
                    v-model="user.name"
                    required
                    type="text"
                >
                </v-text-field>
                <v-text-field 
                    class="mr-3" placeholder="Last name" outlined
                    v-model="user.lastName"
                    required
                    type="text"
                >
                </v-text-field>
            </div>
            <div>
                <v-text-field 
                    class="mx-3" 
                    placeholder="Email" outlined
                    v-model="user.email"
                    required
                    type="email"
                >
                </v-text-field>                
                <v-text-field 
                    class="mx-3" 
                    placeholder="New password" outlined
                    v-model="user.password"
                    required
                    type="password"
                >
                </v-text-field>                
            </div>
            <v-card-text>Birthday?</v-card-text>
            <div class="d-flex">
                <v-select
                    v-model="currentDay"
                    :items="days"
                    outlined
                    class="mx-3"

                ></v-select>    
                <v-select
                    v-model="currentMonth"
                    :items="months"
                    outlined
                    class="mx-3"

                ></v-select>
                <v-select
                    v-model="currentYear"
                    :items="years"
                    outlined
                    class="mx-3"

                ></v-select>                            
            </div>
            <v-card-text>Gender?</v-card-text>
            <v-radio-group v-model="gender">
                <div class="d-flex justify-space-between align-center mx-3" style="width: 90%;">
                    <v-radio
                        v-for="gender in genders"
                        :key="gender"
                        :label="gender"
                        :value="gender"
                    ></v-radio>                    
                </div>
            </v-radio-group> 
            <v-card-text>People who use our service may have uploaded your contact information to Facebook. Learn more.</v-card-text>         
            <v-card-text>By clicking Sign Up, you agree to our Terms, Privacy Policy and Cookies Policy. You may receive SMS Notifications from us and can opt out any time.</v-card-text>         
            <div class="d-flex justify-center mt-5 mb-6">
                <v-btn 
                    color="rgb(62,164,0)"
                    class="white--text text-bold text-xl pa-6 text-capitalize"
                    @click="signUp"
                >
                    sign up
                </v-btn>
                 <v-btn 
                    @click="dialog = false"
                    color="blue"
                    class="white--text text-bold text-xl pa-6 ml-5 text-capitalize"                
                >Cancel</v-btn>
            </div>
        </form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import Authentication from '../../plugins/firebase'
import db from '../../plugins/firebase'

  export default {
    name: 'FbRegister',
    data: () => ({
        dialog: false,
        items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
        gender: 0,
        genders: ["Female", "Male", "Custom"],
        currentDay: '',
        currentYear: '',
        currentMonth: '',
        days: [],
        months: ["January","February","March","April","May","June","July","August","September","October","November","December"],
        years: [],
        user: {
            name: '',
            email: '',
            lastName: '',
            password: ''
        },
        error: []
    }),
   computed: {
        
   },    
    methods: {
        getCurrentState () {
            const day = new Date().getDate()
            const month = new Date().getMonth()
            const yearNow = new Date().getFullYear()
            this.currentYear = yearNow
            this.currentDay = day
            this.currentMonth = this.months[month]
            for(let i=yearNow + 1; i--;){
                if(i === yearNow - 118)
                break;
                this.years.push(i)
            }
            for(let j = 0; j < 32; j++){

                this.days.push(j)
            }
        },
        signUp(){
            if(
                this.user.name != "" &&
                this.user.lastName != "" &&
                this.user.email != "" &&
                this.user.password != "" &&
                this.gender != 0
            ){
                Authentication.auth().createUserWithEmailAndPassword(this.user.email, this.user.password)
                    .then(newUser => {
                        console.log("User ", newUser)
                        db.firestore().collection('users').doc().set({
                            birthDay: this.currentDay,
                            birthMonth: this.currentMonth,
                            birtYear: this.currentYear,
                            gender: this.gender,
                            userInfo: this.user
                        })
                    })
                    .then(() => {
                        this.$router.push({ name: "UserDashboard" })
                    })                    
                    .catch(err => {
                        this.error = err
                    })
            }   
            else{
                alert("Flease fill out all the fields!")
            }         
        }
    },
    created () {
        this.getCurrentState()
    }
  }
</script>