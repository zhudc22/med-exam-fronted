/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
  const { currentUser } = initialState || {};
  let isAdmin = false;
  let isOperator = false;
  let isStatistician = false;
  let isGroup = false;
  let isUser = false;

  if (currentUser) {
    currentUser.roles.forEach(role => {
      isAdmin = (role.code === 'ADMIN')
    });

    if (currentUser.roles?.length === 1) {
      isOperator = currentUser.roles[0].code === 'OPERATOR';
      isStatistician = currentUser.roles[0].code === 'STATISTICIAN';
      isGroup = currentUser.roles[0].code === 'GROUP';
      isUser = currentUser.roles[0].code === 'USER';
    }
  }
  return {
    canAdmin: isAdmin,
    canOperator: isAdmin || isOperator,
    canStatistician: isAdmin || isStatistician,
    // canUser: isAdmin && isOperator && isStatistician && isGroup && isUser,
    canUser: () => isAdmin || isOperator || isStatistician || isGroup || isUser,
  };
}
