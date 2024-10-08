import {v4 as uuidv4} from 'uuid';
import axios from "axios";

// TODO: Implement API functions

export function sendMessage(message: string) {
  // console.log("Sending message: " + message);
  try {
    // TODO: Implement sending message after api schema is provided
    // const response = await fetch('/api/chat', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ message: message })
    // });
    // const data = await response.json();

    const data = {
      result: "Message accepted: " + message
    }

    return data.result;
  } catch (error) {
    console.error('Error fetching the backend response', error);
    return "An error occurred, please try again later.";
  }
}

export function uploadFile(file: File) {
  console.log("uploading file", file.name);
  axios.post('/api/upload', {file: file, user_id: getUserId()},
    {headers: {'Content-Type': 'multipart/form-data'}})
    .catch(error => console.error('Error fetching  response', error));
}


// user id
export function getUserId() {
  // TODO: Implement login using google to replace random uuid generation
  const uuid = localStorage.getItem('userId') || uuidv4();
  setUserId(uuid);
  return uuid;
}

export function setUserId(userId: string) {
  if (!userId) {
    return;
  }
  localStorage.setItem('userId', userId);
}

// login using google
export function login() {
  return getUserId();
}