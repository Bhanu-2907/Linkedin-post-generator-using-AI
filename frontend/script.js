// ============================================
// LINKEDIN AI POST GENERATOR
// ============================================


// Elements
const topic = document.getElementById("topic");

const postStyle = document.getElementById("postStyle");

const postLength = document.getElementById("postLength");

const generateButton =
    document.getElementById("generateButton");

const postResult =
    document.getElementById("postResult");

const loading =
    document.getElementById("loading");

const copyButton =
    document.getElementById("copyButton");


// Image elements
const imageToggle =
    document.getElementById("imageToggle");

const imageUploadArea =
    document.getElementById("imageUploadArea");

const removeImage =
    document.getElementById("removeImage");

const referenceImage =
    document.getElementById("referenceImage");

const imagePreview =
    document.getElementById("imagePreview");


// ============================================
// OPTIONAL IMAGE
// ============================================

imageToggle.addEventListener("click", () => {

    imageUploadArea.classList.toggle("hidden");

});


removeImage.addEventListener("click", () => {

    referenceImage.value = "";

    imagePreview.innerHTML = "";

    imagePreview.classList.add("hidden");

    imageUploadArea.classList.add("hidden");

});


referenceImage.addEventListener("change", () => {

    const file = referenceImage.files[0];

    if (!file) {
        return;
    }

    // Only allow images
    if (!file.type.startsWith("image/")) {

        alert("Please select an image file.");

        referenceImage.value = "";

        return;
    }


    const reader = new FileReader();


    reader.onload = function (event) {

        imagePreview.innerHTML = `
            <img
                src="${event.target.result}"
                alt="Reference image preview">
        `;

        imagePreview.classList.remove("hidden");

    };


    reader.readAsDataURL(file);

});


// ============================================
// GENERATE POST
// ============================================

generateButton.addEventListener("click", async () => {

    const topicValue = topic.value.trim();


    // Validate topic
    if (!topicValue) {

        alert("Please enter a topic first.");

        topic.focus();

        return;
    }


    // UI
    generateButton.disabled = true;

    generateButton.innerHTML =
        "✨ Generating...";

    loading.classList.remove("hidden");


    postResult.innerHTML = `
        <div class="empty-result">
            <div class="empty-icon">✨</div>
            <p>Creating your LinkedIn post...</p>
        </div>
    `;


    try {

        // Send request to FastAPI
        const response = await fetch(
            "http://127.0.0.1:8000/generate-post",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    topic: topicValue,

                    style: postStyle.value,

                    length: postLength.value

                })
            }
        );


        // Check response
        if (!response.ok) {

            throw new Error(
                `Server error: ${response.status}`
            );

        }


        const data = await response.json();


        // Display generated post
        if (data.post) {

            postResult.textContent = data.post;

        } else {

            postResult.textContent =
                "No post was generated.";

        }


    } catch (error) {

        console.error(error);


        postResult.innerHTML = `
            <div class="empty-result">

                <div class="empty-icon">⚠️</div>

                <p>
                    Failed to generate the post.
                </p>

                <small>
                    Make sure your FastAPI backend
                    is running on port 8000.
                </small>

            </div>
        `;

    } finally {

        loading.classList.add("hidden");

        generateButton.disabled = false;

        generateButton.innerHTML =
            "✨ Generate LinkedIn Post";

    }

});


// ============================================
// COPY POST
// ============================================

copyButton.addEventListener("click", async () => {

    const post = postResult.innerText.trim();


    if (!post ||
        post.includes("Your generated LinkedIn post")) {

        alert("Generate a post first.");

        return;
    }


    try {

        await navigator.clipboard.writeText(post);


        const originalText =
            copyButton.innerHTML;


        copyButton.innerHTML =
            "✓ Copied!";


        setTimeout(() => {

            copyButton.innerHTML =
                originalText;

        }, 1500);


    } catch (error) {

        console.error(error);

        alert("Unable to copy the post.");

    }

});