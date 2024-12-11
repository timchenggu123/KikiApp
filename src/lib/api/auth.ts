//  Asynchronously post the user's credentials to the server

import axios from 'axios';
import { SERVER_URL } from './common';

export async function login(username: string, password: string): Promise<void> {
  const response = await fetch(SERVER_URL + '/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
    credentials: 'include', // Include cookies for cross-origin requests
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Login failed');
  }

  return response.json();
}

export async function logout(): Promise<void> {
  const response = await axios.post(SERVER_URL +"/logout");
  return response.data;
}

export async function register(username: string, password: string): Promise<void> {
  const response = await fetch('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
    credentials: 'include', // Include cookies for cross-origin requests
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Login failed');
  }

  return await response.json();
}