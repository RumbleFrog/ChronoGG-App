const state = {
  sale: null
};

const mutations = {
  updateSale(state, sale) {
    state.sale = sale;
  }
};

const actions = {
  updateSale({ commit }, sale) {
    commit("updateSale", sale);
  }
};

export default {
  state,
  mutations,
  actions
};
