<script setup lang="ts">
import { object, string } from "yup";
import { useAuth } from "~~/composables/auth";
import { ErrorHandler } from "~~/utils/handle-error";
import { ToastHandler } from "~~/utils/handle-toast";

interface ILogin {
  username: string;
  password: string;
}

definePageMeta({
  middleware: ["guest"],
});



const { login, checkAuthentication } = useAuth();

const { error } = ToastHandler();
const { customClientErrorHandler } = ErrorHandler();

const schema = object({
  username: string()
    .required()
    .matches(/^0(9\d{9})$/, "شماره تلفن وارد شده معتبر نیست")
    .label("Username"),
  password: string().required().min(6, "تعداد حروف وارد شده کافی نیست").label("Password"),
});
const initialValues: ILogin = { username: "", password: "" };

const handleSubmit = async (values: ILogin) => {
  try {
    await login(values.username, values.password);
    await checkAuthentication();
    await navigateTo({ name: "index" });
  } catch (err) {
    customClientErrorHandler(err, (message: string, detail?: string) =>
      error(message, detail)
    );
  }
};
</script>

<template>
  <div>
    <NuxtLayout name="authentication">
      <VForm class="p-8 flex flex-col gap-3 card" :validation-schema="schema" :initial-values="initialValues"
        v-slot="{ meta: formMeta }" @submit="handleSubmit">
        <BaseInput type="tel" name="username" label="تلفن همراه" />
        <BaseInput type="password" name="password" label="رمز عبور" />
        <BaseButton class="mt-5" text="ورود" :disabled="!formMeta.valid"> </BaseButton>
      </VForm>
    </NuxtLayout>
  </div>
</template>
