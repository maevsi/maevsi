<template>
  <Layout>
    <div class="m-auto max-w-xl">
      <h1>{{ this.$metaInfo.title }}</h1>
      <div class="mb-4">
        Did you receive an invitation code for an event?
        <br />Enter it below!
      </div>
      <form class="form" @submit="redeem">
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label
              class="form-label md:text-right mb-1 md:mb-0"
              for="input-username"
            >Invitation Code</label>
          </div>
          <div class="md:w-2/3">
            <input
              class="form-input"
              id="input-code"
              type="text"
              pattern="[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}"
              placeholder="Invitation Code"
              v-model="invitationCode"
            />
          </div>
        </div>
        <div class="flex flex-col items-center justify-between">
          <button class="btn btn-red" type="sumit">Redeem</button>
        </div>
      </form>
    </div>
  </Layout>
</template>

<script>
import gql from "graphql-tag";

export default {
  data() {
    return {
      invitationCode: this.$route.query.ic
    };
  },
  metaInfo() {
    return { title: "Redeem" };
  },
  methods: {
    redeem(e) {
      e.preventDefault();

      let invitationCodes = JSON.parse(
        localStorage.getItem("invitation-codes")
      );
      invitationCodes = invitationCodes ? invitationCodes : [];

      let duplicateFound = false;

      for (let i = 0; i < invitationCodes.length; i++) {
        if (invitationCodes[i] == this.invitationCode) {
          duplicateFound = true;
          break;
        }
      }

      if (!duplicateFound) {
        invitationCodes.push(this.invitationCode);
        localStorage.setItem(
          "invitation-codes",
          JSON.stringify(invitationCodes)
        );
      }
    }
  }
};
</script>