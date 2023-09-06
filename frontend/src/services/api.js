import axios from "axios"

export const submitLoginForm = async (value) => {
   console.log('here catching in api', value)
   
   return await axios.post("http://localhost:3004/auth/login", value, {withCredentials: true}).then ((response) => {
      console.log('scuccess', response);
      return { status: 200, message: 'user logged in', response}
   })
   .catch(error => {
      console.log(error)
      return { status: 400, message: 'error while trying to login' , response: error.response}
   })
}

export const submitRegistrationForm = async(value) => {
   return await axios.post("http://localhost:3004/auth/register", value, {withCredentials: true}).then ((response) => {
      console.log('scuccess', response);
      return { status: 200, message: 'successfully registered', response}
   })
   .catch(error => {
      console.log(error)
      return { status: 400, message: 'error while Registering' , response: error.response}
   })
}

export const getAllUsers = async() => {
   return await axios.get('http://localhost:3004/auth/all').then(response => {
      console.log(response);
      return {
         data: response.data
      }
   })
   .catch(err => {
      console.log(err);
      return {
         data: []
      }
   })
}

export const createNewClass = async(value) => {
   return await axios.post("http://localhost:3004/class/new", value, {withCredentials: true}).then ((response) => {
      console.log('scuccess', response);
      return { status: 200, message: 'class created', response}
   })
   .catch(error => {
      console.log(error)
      return { status: 400, message: 'error while creating class' , response: error.response}
   })
}
export const getAllClass = async() => {
   return await axios.get('http://localhost:3004/class/all').then(response => {
      console.log(response);
      return {
         data: response.data
      }
   })
   .catch(err => {
      console.log(err);
      return {
         data: []
      }
   })
}
export const getUserClass = async(value) => {
   return await axios.get(`http://localhost:3004/class/classList/${value._id}`).then(response => {
      console.log(response);
      return {
         data: response.data
      }
   })
   .catch(err => {
      console.log(err);
      return {
         data: []
      }
   })
}

//classes

export const joinToClassApi = async(value) => {
   return await axios.post("http://localhost:3004/class/join", value).then ((response) => {
      console.log('scuccess', response);
      return { status: response.status, message: response.data.message, response: response.data.data}
   })
   .catch(error => {
      console.log(error)
      return { status: 400, message: error.response.data.message , response: error.response}
   })
}