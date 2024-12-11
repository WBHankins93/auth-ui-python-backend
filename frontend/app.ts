const apiBase: string = "http://127.0.0.1:5000";

interface ApiResponse {
    message?: string;
    error?: string;
    token?: string;
    username?: string;
}

async function register(): Promise<void> {
    const username: string = (document.getElementById("reg-username") as HTMLInputElement).value;
    const password: string = (document.getElementById("reg-password") as HTMLInputElement).value;

    try {
        const response = await fetch(`${apiBase}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data: ApiResponse = await response.json();
        alert(data.message || data.error);
    } catch (error) {
        console.error("Error during registration:", error);
    }
}

async function login(): Promise<void> {
    const username: string = (document.getElementById("login-username") as HTMLInputElement).value;
    const password: string = (document.getElementById("login-password") as HTMLInputElement).value;

    try {
        const response = await fetch(`${apiBase}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data: ApiResponse = await response.json();
        if (response.ok) {
            localStorage.setItem("token", data.token || "");
            alert("Login successful!");
            (document.getElementById("auth") as HTMLElement).style.display = "none";
            (document.getElementById("profile") as HTMLElement).style.display = "block";
        } else {
            alert(data.error);
        }
    } catch (error) {
        console.error("Error during login:", error);
    }
}

async function getProfile(): Promise<void> {
    const token: string | null = localStorage.getItem("token");

    if (!token) {
        alert("You are not logged in!");
        return;
    }

    try {
        const response = await fetch(`${apiBase}/profile`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });

        const data: ApiResponse = await response.json();
        if (response.ok) {
            (document.getElementById("user-info") as HTMLElement).innerText = `Username: ${data.username}`;
        } else {
            alert(data.error);
        }
    } catch (error) {
        console.error("Error fetching profile:", error);
    }
}
