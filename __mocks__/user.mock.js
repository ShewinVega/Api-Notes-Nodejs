
const payload = { id: '653d91e9f3c52fb30465d68e', email: 'usermock2023@gmail.com' };


const mockUserData = [
    {
      name: 'Mocker', 
      email:payload.email, 
      password: 'password-mock', 
      rol:'6541bcecfd11fa34cre40e00'
    },
    {
      _id: '653d91e9f3c52fb30465d68e', 
      name: 'Mocker 2', 
      email: 'moker2@gmail.com', 
      password: 'password-mock', 
      rol:'6541bcecfd11fa34cfa40e00'
    },
    {
      _id: '653d91e9f3c52fb30465d6oo', 
      name: 'Mocker 3', 
      email: 'moker3@gmail.com', 
      password: 'password-mock', 
      rol:'2023bcecfd11fa34cfa40e00'
    },
]

module.exports = {
  payload,
  mockUserData,
}