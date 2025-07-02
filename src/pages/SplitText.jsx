import { useState } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText);

const animations = {
    lines: {
        duration: 3,
        y: -100,
        autoAlpha: 0,
        stagger: 0.1,
        opacity: 0,
        ease: "bounce.out"
    },
    words: {
        duration: 1,
        opacity: 0,
        x: 100,
        autoAlpha: 0,
        stagger: 0.04,
        rotation: 90,
        ease: "back"
    },
    chars: {
        duration: 1,
        opacity: 0,
        x: -100,
        autoAlpha: 0,
        stagger: 0.03,
        ease: "expo"
    },
};

const SplitTextC = () => {
    const [animationState, setAnimationState] = useState("lines");

    useGSAP(() => {
        const split = new SplitText(".split", {
            type: "chars,words,lines",
        });

        const els = {
            lines: split.lines,
            words: split.words,
            chars: split.chars,
        };

        gsap.from(els[animationState], animations[animationState]);

        // Cleanup when component unmounts
        return () => {
            split.revert()
        };
    }, [animationState]);

    return (
        <main>
            <h1>GsapSplitText</h1>

            <p className="mt-5 text-gray-500">
                The <code>SplitText</code> Plugin splits an HTML element's text into individual characters, words,
                and/or lines, allowing us to create gorgeous staggered animations.
            </p>

            <p className="mt-5 text-gray-500">
                Read more about the{" "}
                <a
                    href="https://gsap.com/docs/v3/Plugins/SplitText/"
                    target="_blank"
                    rel="noreferrer noopener nofollow"
                >
                    SplitText
                </a>{" "}
                Plugin.
            </p>

            <div className="flex items-center justify-center gap-5 mt-7">
                <button
                    onClick={() => setAnimationState("chars")}
                    className={`${animationState === "chars" && "bg-blue-950"}`}
                >
                    Characters
                </button>
                <button
                    onClick={() => setAnimationState("words")}
                    className={`${animationState === "words" && "bg-blue-950"}`}
                >
                    Words
                </button>
                <button
                    onClick={() => setAnimationState("lines")}
                    className={`${animationState === "lines" && "bg-blue-950"}`}
                >
                    Lines
                </button>
            </div>

            <div className="split text-3xl mt-12 text-center text-[#dfdcff]">
                Break apart HTML text into characters, words, and/or lines for easy animation.
            </div>
        </main>
    );
};

export default SplitTextC;