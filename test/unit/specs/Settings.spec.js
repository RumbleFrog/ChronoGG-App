import Vue from "vue";
import Settings from "@/components/Settings";

describe("Settings.vue", () => {
  it("should render correct contents", () => {
    const vm = new Vue({
      el: document.createElement("div"),
      render: h => h(Settings)
    }).$mount();

    expect(
      vm.$el.querySelector("button.chrono-button span").textContent
    ).to.contain("Save Settings");
  });
});
