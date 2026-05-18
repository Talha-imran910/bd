window.addEventListener('load', () => {
    const startScreen = document.getElementById('startScreen');
    const startWithMusic = document.getElementById('startWithMusic');
    const startSilent = document.getElementById('startSilent');
    const birthdayNav = document.getElementById('birthdayNav');
    const backBtn = document.getElementById('backBtn');
    const startOverBtn = document.getElementById('startOverBtn');
    const song = document.querySelector('.song');

    const startSurprise = (playMusic) => {
        startScreen.classList.add('is-hidden');
        birthdayNav.classList.add('is-visible');

        if (playMusic) {
            song.play().catch(() => {
                song.pause();
            });
        } else {
            song.pause();
        }

        if (window.birthdayTimeline) {
            window.resetBirthdayExtras();
            window.birthdayTimeline.restart();
        } else {
            animationTimeline();
        }
    };

    startWithMusic.addEventListener('click', () => startSurprise(true));
    startSilent.addEventListener('click', () => startSurprise(false));
    backBtn.addEventListener('click', () => {
        const tl = window.birthdayTimeline;

        if (!tl) {
            return;
        }

        document.getElementById("finalCelebration").classList.remove("is-visible");
        document.getElementById("finalCelebration").setAttribute("aria-hidden", "true");
        tl.pause();
        tl.seek(Math.max(tl.time() - 7, 0));
        tl.play();
    });
    startOverBtn.addEventListener('click', () => {
        if (window.birthdayTimeline) {
            window.birthdayTimeline.pause(0);
        }

        if (window.resetBirthdayExtras) {
            window.resetBirthdayExtras();
        } else {
            resetSurpriseState();
        }
        song.pause();
        song.currentTime = 0;
        birthdayNav.classList.remove('is-visible');
        startScreen.classList.remove('is-hidden');
    });
    setupClickHearts();
});

const resetSurpriseState = () => {
    const hiddenLetter = document.getElementById("hiddenLetter");
    const letterBtn = document.getElementById("letterBtn");
    const finalReveal = document.getElementById("finalReveal");
    const secretMessage = document.getElementById("secretMessage");
    const finalCelebration = document.getElementById("finalCelebration");
    const teaseBtn = document.getElementById("teaseBtn");
    const teaseMessage = document.getElementById("teaseMessage");
    const photoModal = document.getElementById("photoModal");
    const photoModalImage = document.getElementById("photoModalImage");

    hiddenLetter.classList.remove("is-visible");
    finalReveal.classList.remove("is-visible");
    finalCelebration.classList.remove("is-visible");
    finalCelebration.setAttribute("aria-hidden", "true");
    secretMessage.textContent = "Try them after opening the letter.";
    teaseBtn.classList.remove("is-ready");
    teaseBtn.textContent = "Click me if you can";
    teaseBtn.style.left = "50%";
    teaseBtn.style.top = "0";
    teaseMessage.textContent = "This one is a little dramatic.";
    letterBtn.style.display = "";
    photoModal.classList.remove("is-visible");
    photoModal.setAttribute("aria-hidden", "true");
    photoModalImage.src = "";

    TweenMax.set(".container", { visibility: "hidden" });
    TweenMax.set([".three", ".four", ".five", ".six", ".memories", ".nine"], { visibility: "hidden" });
    TweenMax.set(".one", { visibility: "visible", clearProps: "opacity,transform" });
};


// animation timeline
const animationTimeline = () => {
    // split chars that needs to be animated individually
    const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
    const hbd = document.getElementsByClassName("wish-hbd")[0];
    const textBox = textBoxChars.closest(".text-box");
    const sendCursorX = Math.max(210, textBox.offsetWidth - 90);

    if (!textBoxChars.dataset.split) {
        textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
            .split("")
            .join("</span><span>")}</span>`;
        textBoxChars.dataset.split = "true";
    }

    if (!hbd.dataset.split) {
        hbd.innerHTML = `<span>${hbd.innerHTML
            .split("")
            .join("</span><span>")}</span>`;
        hbd.dataset.split = "true";
    }

    const ideaTextTrans = {
        opacity: 0,
        y: -20,
        rotationX: 5,
        skewX: "15deg"
    }

    const ideaTextTransLeave = {
        opacity: 0,
        y: 20,
        rotationY: 5,
        skewX: "-15deg"
    }

    // timeline
    const tl = new TimelineMax();
    window.birthdayTimeline = tl;
    const hiddenLetter = document.getElementById("hiddenLetter");
    const letterBtn = document.getElementById("letterBtn");
    const finalMessage = document.getElementById("finalMessage");
    const finalReveal = document.getElementById("finalReveal");
    const secretMessage = document.getElementById("secretMessage");
    const secretButtons = document.querySelectorAll(".secret-btn");
    const finalCelebration = document.getElementById("finalCelebration");
    const teaseBtn = document.getElementById("teaseBtn");
    const teaseMessage = document.getElementById("teaseMessage");
    let teaseCount = 0;
    window.resetBirthdayExtras = () => {
        teaseCount = 0;
        resetSurpriseState();
    };

    window.resetBirthdayExtras();
    TweenMax.set(".container", { visibility: "visible" });
    TweenMax.set([".three", ".four", ".five", ".six", ".memories", ".nine"], { visibility: "hidden" });
    TweenMax.set(".one", { visibility: "visible" });

    tl.to(".container", 0.6, {
        visibility: "visible"
    })
    .from(".one", 0.7, {
        opacity: 0,
        y: 10
    })
    .from(".two", 0.4, {
        opacity: 0,
        y: 10
    })
    .to(".one",
        0.7,
        {
            opacity: 0,
            y: 10
        },
    "+=3.5")
    .to(".two",
        0.7,
        {
            opacity: 0,
            y: 10
        },
    "-=1")
    .set(".three", {
        visibility: "visible"
    })
    .from(".three", 0.7, {
        opacity: 0,
        y: 10
    })
    .to(".three",
        0.7,
        {
            opacity: 0,
            y: 10
        },
    "+=3")
    .set(".four", {
        visibility: "visible"
    })
    .from(".four", 0.7, {
        scale: 0.2,
        opacity: 0,
    })
    .from(".fake-btn", 0.3, {
        scale: 0.2,
        opacity: 0,
    })
    .staggerTo(
        ".hbd-chatbox span",
        1.5, {
            visibility: "visible",
        },
        0.05
    )
    .fromTo(
        ".fake-cursor",
        0.35,
        {
            opacity: 0,
            x: -80,
            y: 18,
        },
        {
            opacity: 1,
            x: 0,
            y: 0,
        },
        "+=0.35"
    )
    .to(".fake-cursor", 0.65, {
        x: sendCursorX,
        y: 34,
        ease: Power2.easeInOut,
    })
    .to(".fake-cursor", 0.12, {
        scale: 0.82,
    })
    .to(".fake-cursor", 0.12, {
        scale: 1,
    })
    .to(".fake-btn", 0.1, {
        backgroundColor: "rgb(127, 206, 248)",
    },
    "-=0.05")
    .to(".fake-cursor", 0.25, {
        opacity: 0,
        y: 18,
    },
    "+=0.45")
    .to(
        ".four",
        0.5, {
            scale: 0.2,
            opacity: 0,
            y: -150
        },
    "+=1")
    .set(".five", {
        visibility: "visible"
    })
    .from(".idea-1", 0.7, ideaTextTrans)
    .to(".idea-1", 0.7, ideaTextTransLeave, "+=2.5")
    .from(".idea-2", 0.7, ideaTextTrans)
    .to(".idea-2", 0.7, ideaTextTransLeave, "+=2.5")
    .from(".idea-3", 0.7, ideaTextTrans)
    .to(".idea-3 strong", 0.5, {
        scale: 1.2,
        x: 10,
        backgroundColor: "rgb(21, 161, 237)",
        color: "#fff",
    })
    .to(".idea-3", 0.7, ideaTextTransLeave, "+=2.5")
    .from(".idea-4", 0.7, ideaTextTrans)
    .to(".idea-4", 0.7, ideaTextTransLeave, "+=2.5")
    .from(
        ".idea-5",
        0.7, {
            rotationX: 15,
            rotationZ: -10,
            skewY: "-5deg",
            y: 50,
            z: 10,
            opacity: 0,
        },
        "+=1.5"
    )
    .to(
        ".idea-5 span",
        0.7, {
            rotation: 90,
            x: 8,
        },
        "+=1.4"
    )
    .to(
        ".idea-5",
        0.7, {
            scale: 0.2,
            opacity: 0,
        },
        "+=2"
    )
    .staggerFrom(
        ".idea-6 span",
        0.8, {
            scale: 3,
            opacity: 0,
            rotation: 15,
            ease: Expo.easeOut,
        },
        0.2
    )
    .staggerTo(
        ".idea-6 span",
        0.8, {
            scale: 3,
            opacity: 0,
            rotation: -15,
            ease: Expo.easeOut,
        },
        0.2,
        "+=1.5"
    )
    .set(".six", {
        visibility: "visible"
    })
    .staggerFromTo(
        ".baloons img",
        2.5, {
            opacity: 0.9,
            y: 1400,
        }, {
            opacity: 1,
            y: -1000,
        },
        0.2
    )
    .from(
        ".profile-picture",
        0.5, {
            scale: 3.5,
            opacity: 0,
            x: 25,
            y: -25,
            rotationZ: -45,
        },
        "-=2"
    )
    .from(".hat", 0.5, {
        x: -100,
        y: 350,
        rotation: -180,
        opacity: 0,
    })
    .staggerFrom(
        ".wish-hbd span",
        0.7, {
            opacity: 0,
            y: -50,
            // scale: 0.3,
            rotation: 150,
            skewX: "30deg",
            ease: Elastic.easeOut.config(1, 0.5),
        },
        0.1
    )
    .staggerFromTo(
        ".wish-hbd span",
        0.7, {
            scale: 1.4,
            rotationY: 150,
        }, {
            scale: 1,
            rotationY: 0,
            color: "#ff69b4",
            ease: Expo.easeOut,
        },
        0.1,
        "party"
    )
    .from(
        ".wish h5",
        0.5, {
            opacity: 0,
            y: 10,
            skewX: "-15deg",
        },
        "party"
    )
    .to(".six", 0.5, {
        opacity: 0,
        y: -35,
        zIndex: "-1",
        visibility: "hidden",
    }, "+=2.5")
    .set(".memories", {
        visibility: "visible"
    })
    .from(".memory-title", 0.7, {
        opacity: 0,
        y: 18
    })
    .staggerFrom(
        ".memory-gallery img",
        0.8,
        {
            opacity: 0,
            scale: 0.2,
            rotation: 18,
            y: 90,
            ease: Back.easeOut.config(1.7),
        },
        0.2
    )
    .to(".memories", 0.7, {
        opacity: 0,
        y: -35,
    }, "+=3")
    .staggerFromTo(
        ".celebration-pop",
        1.35,
        {
            opacity: 0,
            scale: 0.35,
            y: 50,
            rotation: -35,
            visibility: "visible",
        },
        {
            opacity: 1,
            scale: 1.35,
            y: -70,
            rotation: 25,
            ease: Back.easeOut.config(1.8),
        },
        0.12
    )
    .staggerTo(
        ".celebration-pop",
        0.8,
        {
            opacity: 0,
            scale: 0.5,
            y: -130,
            ease: Power2.easeIn,
        },
        0.08,
        "+=0.4"
    )
    .set([".one", ".three", ".four", ".five", ".six"], {
        visibility: "hidden"
    })
    .set(".memories", {
        visibility: "hidden"
    })
    .set(".nine", {
        visibility: "visible"
    })
    .staggerFromTo(
        ".nine > *",
        1,
        {
            opacity: 0,
            y: -20,
            rotationX: 5,
            skewX: "15deg",
            visibility: "visible"
        },
        {
            opacity: 1,
            y: 0,
            rotationX: 0,
            skewX: "0deg",
            visibility: "visible"
        },
        1.2
    )
    .to(
        ".last-smile",
        0.5, {
            rotation: 90,
        },
        "+=1"
    );

    // Restart Animation on click
    const replyBtn = document.getElementById("replay");
    replyBtn.addEventListener("click", () => {
        hiddenLetter.classList.remove("is-visible");
        finalReveal.classList.remove("is-visible");
        finalCelebration.classList.remove("is-visible");
        finalCelebration.setAttribute("aria-hidden", "true");
        secretMessage.textContent = "Try them after opening the letter.";
        teaseCount = 0;
        teaseBtn.classList.remove("is-ready");
        teaseBtn.style.left = "50%";
        teaseBtn.style.top = "0";
        teaseMessage.textContent = "This one is a little dramatic.";
        letterBtn.style.display = "";
        tl.restart();
    });

    letterBtn.addEventListener("click", () => {
        hiddenLetter.classList.add("is-visible");
        letterBtn.style.display = "none";
    });

    finalMessage.addEventListener("click", () => {
        finalReveal.classList.add("is-visible");
    });

    secretButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const secret = button.dataset.secret;

            if (secret === "memory") {
                secretMessage.textContent = "Secret unlocked: every picture here has one job, to remind her she is loved.";
                TweenMax.fromTo(".hidden-letter", 0.45, { scale: 0.96 }, { scale: 1, ease: Back.easeOut.config(2) });
            }

            if (secret === "sparkle") {
                secretMessage.textContent = "Secret unlocked: tiny celebration mode.";
                createSparkles();
            }

            if (secret === "finale") {
                secretMessage.textContent = "Final secret unlocked.";
                finalCelebration.classList.add("is-visible");
                finalCelebration.setAttribute("aria-hidden", "false");
                createSparkles(34);
            }
        });
    });

    teaseBtn.addEventListener("click", () => {
        if (teaseCount < 3) {
            const positions = [
                { left: "18%", top: "8px", message: "Nope, too slow. Try again." },
                { left: "82%", top: "28px", message: "Almost. She is definitely smiling now." },
                { left: "38%", top: "42px", message: "Okay okay, one more. I promise." },
            ];
            const next = positions[teaseCount];

            teaseCount += 1;
            teaseBtn.style.left = next.left;
            teaseBtn.style.top = next.top;
            teaseMessage.textContent = next.message;
            createSparkles(8);

            if (teaseCount === 3) {
                teaseBtn.classList.add("is-ready");
                teaseBtn.textContent = "Now you can click me";
                teaseMessage.textContent = "Fine, you win. Click it now.";
            }

            return;
        }

        teaseMessage.textContent = "Caught it. Just like that, you caught another reason why you are special.";
        teaseBtn.textContent = "You got me";
        createSparkles(26);
        TweenMax.fromTo(teaseBtn, 0.5, { scale: 0.85, rotation: -8 }, { scale: 1.08, rotation: 0, ease: Elastic.easeOut.config(1, 0.4) });
    });
}

const createSparkles = (count = 22) => {
    for (let i = 0; i < count; i++) {
        const dot = document.createElement("span");
        dot.className = "sparkle-dot";
        document.body.appendChild(dot);

        const angle = (Math.PI * 2 * i) / count;
        const distance = 90 + Math.random() * 180;

        TweenMax.to(dot, 0.9 + Math.random() * 0.5, {
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            opacity: 0,
            scale: 0.2 + Math.random(),
            ease: Power2.easeOut,
            onComplete: () => dot.remove(),
        });
    }
};

const setupPhotoZoom = () => {
    const modal = document.getElementById("photoModal");
    const modalImage = document.getElementById("photoModalImage");
    const closeModal = document.getElementById("closePhotoModal");

    document.querySelectorAll(".zoomable-photo").forEach((photo) => {
        photo.addEventListener("click", () => {
            modalImage.src = photo.src;
            modal.classList.add("is-visible");
            modal.setAttribute("aria-hidden", "false");
        });
    });

    const hideModal = () => {
        modal.classList.remove("is-visible");
        modal.setAttribute("aria-hidden", "true");
        modalImage.src = "";
    };

    closeModal.addEventListener("click", hideModal);
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            hideModal();
        }
    });
};

setupPhotoZoom();

const setupClickHearts = () => {
    document.addEventListener("click", (event) => {
        if (event.target.closest("#photoModal")) {
            return;
        }

        const symbols = ["♥", "✦", "♡"];

        for (let i = 0; i < 5; i++) {
            const heart = document.createElement("span");
            heart.className = "click-heart";
            heart.textContent = symbols[i % symbols.length];
            heart.style.left = `${event.clientX}px`;
            heart.style.top = `${event.clientY}px`;
            document.body.appendChild(heart);

            TweenMax.to(heart, 0.8 + Math.random() * 0.4, {
                x: -28 + Math.random() * 56,
                y: -30 - Math.random() * 65,
                opacity: 0,
                scale: 0.6 + Math.random() * 0.8,
                rotation: -25 + Math.random() * 50,
                ease: Power2.easeOut,
                onComplete: () => heart.remove(),
            });
        }
    });
};
