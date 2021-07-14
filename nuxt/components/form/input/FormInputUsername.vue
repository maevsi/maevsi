<template>
  <FormInput
    :error="v.form[formKeyComputed].$error"
    :is-optional="isOptional"
    :label-for="`input-${id}`"
    :success="
      v.form[formKeyComputed].$model && !v.form[formKeyComputed].$invalid
    "
    :title="$t(id.replace(/(-registration|-sign-in)$/, ''))"
  >
    <div class="relative">
      <input
        :id="`input-${id}`"
        class="form-input"
        type="text"
        :placeholder="$t('globalPlaceholderUsername')"
        :value="v.form[formKeyComputed].$model"
        @input="$emit('input', $event.target.value)"
      />
      <span
        v-if="
          v.form[formKeyComputed].$model && !v.form[formKeyComputed].$invalid
        "
        class="absolute px-3 right-0 top-1/2 -translate-y-1/2"
      >
        <div class="bg-gray-50 rounded-full">
          <FontAwesomeIcon
            class="text-green-600"
            :icon="['fas', 'check-circle']"
            :title="$t('iconCheck')"
          />
        </div>
      </span>
    </div>
    <template slot="inputError">
      <FormInputError
        :form-input="v.form[formKeyComputed]"
        validation-property="existence"
      >
        {{ $t('globalValidationExistence') }}
      </FormInputError>
      <FormInputError
        :form-input="v.form[formKeyComputed]"
        validation-property="formatSlug"
      >
        {{ $t('globalValidationFormat') }}
      </FormInputError>
      <FormInputError
        :form-input="v.form[formKeyComputed]"
        validation-property="required"
      >
        {{ $t('globalValidationRequired') }}
      </FormInputError>
    </template>
    <template slot="inputSuccess">
      <FormInputSuccess :form-input="v.form[formKeyComputed]">
        {{ $t('globalVerificationExistence') }}
      </FormInputSuccess>
    </template>
  </FormInput>
</template>

<script>
export default {
  props: {
    formKey: {
      default: undefined,
      type: String,
    },
    id: {
      required: true,
      type: String,
    },
    isOptional: {
      default: false,
      type: Boolean,
    },
    v: {
      default: undefined,
      type: Object,
    },
  },
  computed: {
    formKeyComputed() {
      return this.formKey ? this.formKey : this.id
    },
  },
}
</script>

<i18n lang="yml">
de:
  iconCheck: Verifiziert
  username: Nutzername
en:
  iconCheck: Verified
  username: Username
</i18n>
