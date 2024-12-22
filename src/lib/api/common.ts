import { goto } from '$app/navigation';
// export const SERVER_URL = "http://192.168.2.10:5000";
export const SERVER_URL = "https://kikiserver.timgu.me";
// export const SERVER_URL = "http://localhost:5000";

// Check resposne
export function checkResponse(response: any) {
    if (response.status === 401) {
        // Redirect to login page
        goto('/auth/login'); // Or window.location.href = '/login';
        return false;
    }
    return true;
}

