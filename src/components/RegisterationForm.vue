/* eslint-disable object-curly-newline */
<template>
        <!-- Registration Form -->
    <div class="text-white text-center font-bold p-5 mb-4"
    v-if="reg_show_alert" :class="reg_alert_variant">
    {{ reg_alert_message }}
    </div>
    <vee-form :validation-schema="schema"
    @submit="register" :initial-values="userData">
        <!-- Name -->
        <div class="mb-3">
        <label class="inline-block mb-2">Name</label>
        <vee-field type="text" name="name"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
            duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Name"/>
            <ErrorMessage class="text-red-600" name="name" />
        </div>
        <!-- Email -->
        <div class="mb-3">
        <label class="inline-block mb-2">Email</label>
        <vee-field type="email" name="email"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
            duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Email" />
            <ErrorMessage class="text-red-600" name="email" />
        </div>
        <!-- Age -->
        <div class="mb-3">
        <label class="inline-block mb-2">Age</label>
        <vee-field type="number" name="age"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
            duration-500 focus:outline-none focus:border-black rounded" />
            <ErrorMessage class="text-red-600" name="age" />
        </div>
        <!-- Password -->
        <div class="mb-3">
        <label class="inline-block mb-2">Password</label>
        <vee-field name="password"  :bails="false" v-slot="{ field, errors }">
            <input class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
            transition duration-500 focus:outline-none focus:border-black rounded"
            type="password" placeholder="Password" v-bind="field"/>
            <div class="text-red-600" v-for="error in errors" :key="error">
                {{ error }}
            </div>
            </vee-field>
            <ErrorMessage class="text-red-600" name="password" />
        </div>
        <!-- Confirm Password -->
        <div class="mb-3">
        <label class="inline-block mb-2">Confirm Password</label>
        <vee-field type="password" name="confirm_password"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
            duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Confirm Password" />
            <ErrorMessage class="text-red-600" name="confirm_password" />
        </div>

        <!-- Gender -->
        <div class="mb-3">
        <label class="inline-block mb-2">Gender</label>
        <vee-field as="select" name="gender"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
            duration-500 focus:outline-none focus:border-black rounded">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
        </vee-field>
        <ErrorMessage class="text-red-600" name="Other" />
        </div>

        <!-- Country -->
        <div class="mb-3">
        <label class="inline-block mb-2">Country</label>
        <vee-field as="select" name="country"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
            duration-500 focus:outline-none focus:border-black rounded">
            <option value="USA">USA</option>
            <option value="Mexico">Mexico</option>
            <option value="Germany">Germany</option>
            <option value="Canada">Canada</option>
        </vee-field>
        <ErrorMessage class="text-red-600" name="country" />
        </div>
        <!-- TOS -->
        <div class="mb-3 pl-6">
        <vee-field type="checkbox" name="tos" value="1"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded" />
        <i18n-t class="inline-block" keypath="register.accept" tag="label">
          <a href="#">{{$t('register.TOS') }}</a></i18n-t>
        <ErrorMessage class="text-red-600" name="tos" />
        </div>
        <button type="submit" :disabled="reg_in_submission"
        class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition
            hover:bg-purple-700">
        Submit
        </button>
    </vee-form>
</template>

<script>

export default {
  name: 'RegisterForm',
  data() {
    return {
      tab: 'login',
      schema: {
        name: 'required|min:3|max:100|alphaSpaces',
        email: 'required|min:3|max:100|validateEmail',
        age: 'required|min_val:18|max_val:100',
        password: 'required|min:6|max:20',
        confirm_password: 'passwords_mismatch:@password',
        country: 'required|country_excluded:Canada',
        tos: 'tos',
        gender: 'required',
      },
      userData: { country: 'USA' },
      reg_in_submission: false,
      reg_show_alert: false,
      reg_alert_variant: 'bg-blue-500',
      reg_alert_message: 'hold on tight!! your account is being created..',

    };
  },
  methods: {
    // ...mapMutations(['toggleAuthModal']),
    async register(values) {
      // console.log(values);
      this.reg_show_alert = true;
      this.reg_in_submission = true;
      this.reg_alert_variant = 'bg-blue-500';
      this.reg_alert_message = 'hold on tight.....';

      try {
        await this.$store.dispatch('register', values);
      } catch (error) {
        this.reg_in_submission = false;
        this.reg_alert_variant = 'bg-red-500';
        this.reg_alert_message = 'An unexpected error occured...';
        return;
      }

      this.reg_alert_variant = 'bg-green-500';
      this.reg_alert_message = 'successfully created...';
      window.location.reload();
      // console.log(userCredentials);
    },
  },
};
</script>
