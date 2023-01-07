import { defineRule} from "vee-validate";
import {
  required, min, max, alpha_spaces as alphaSpaces, confirmed, not_one_of as excluded, min_value as minVal, max_value as maxVal, email,
} from '@vee-validate/rules';


export default defineNuxtPlugin((nuxtApp) => {

  defineRule('required', required);
  defineRule('email', email);
  defineRule('tos', required);
  defineRule('min', min);
  defineRule('max', max);
  defineRule('alpha_spaces', alphaSpaces);
  defineRule('excluded', excluded);



});