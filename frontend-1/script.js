const button = document.querySelector("#generate");
        const output = document.querySelector("#output");

        button.addEventListener("click", async () => {
            try {
                const response = await fetch("http://localhost:7000/generate-events", { // Match the backend port
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    output.innerHTML = data.replace(/\n/g, "<br>");
                } else {
                    const errorData = await response.json();
                    output.innerHTML = `Failed to generate events: ${errorData.error.message || 'Please try again.'}`;
                }
            } catch (error) {
                console.error("Error:", error);
                output.innerHTML = "An error occurred. Please try again.";
            }
        });