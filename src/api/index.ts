import axios from 'axios'

export const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    //  Authorization: `<Your Auth Token>`,
    'Content-Type': 'application/json'
  }
  // .. other options
})
