export const useAuthStore = defineStore('auth', {
  state: () => ({
    role: 'manager'
  }),

  getters: {
    isManager: state => state.role === 'manager',

    user: state =>
      state.role === 'manager'
        ? {
            name: 'Алексей Морозов',
            role: 'Менеджер проекта',
            initials: 'АМ'
          }
        : {
            name: 'Илья Соколов',
            role: 'Заказчик',
            initials: 'ИС'
          }
  },

  actions: {
    setRole(role) {
      this.role = role
    }
  }
})
