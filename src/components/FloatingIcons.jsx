import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";

export default function FloatingIcons() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const deviconBaseUrl = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/';
  const techIcons = [
      { src: `${deviconBaseUrl}react/react-original.svg`, width: 100, height: 100 },
      { src: `${deviconBaseUrl}javascript/javascript-original.svg`, width: 100, height: 100 },
      { src: `${deviconBaseUrl}typescript/typescript-original.svg`, width: 100, height: 100 },
      { src: `${deviconBaseUrl}nodejs/nodejs-original.svg`, width: 100, height: 100 },
      { src: `${deviconBaseUrl}html5/html5-original.svg`, width: 100, height: 100 },
      { src: `${deviconBaseUrl}css3/css3-original.svg`, width: 100, height: 100 },
      { src: `${deviconBaseUrl}tailwindcss/tailwindcss-original.svg`, width: 100, height: 100 },
      { src: `${deviconBaseUrl}python/python-original.svg`, width: 100, height: 100 },
      { src: `${deviconBaseUrl}git/git-original.svg`, width: 100, height: 100 },
      { src: `${deviconBaseUrl}mongodb/mongodb-original.svg`, width: 100, height: 100 },
      { src: `${deviconBaseUrl}java/java-original.svg`, width: 100, height: 100 },
      { src: `${deviconBaseUrl}figma/figma-original.svg`, width: 100, height: 100 }
  ];

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      options={{
        fullScreen: { enable: true, zIndex: -1 }, // Now safe with transparent body
        fpsLimit: 60,
        interactivity: {
            events: {
                onHover: {
                    enable: true,
                    mode: "bubble", // Focus on bubble for the 'blink' effect
                },
                resize: true,
            },
            modes: {
                bubble: {
                    distance: 100,
                    duration: 0.2,
                    size: 60,      // Much larger for obvious 'pop'
                    opacity: 1,    // Full brightness
                }
            },
        },
        particles: {
            move: {
                direction: "none",
                enable: true,
                outModes: {
                    default: "out",
                },
                random: true,
                speed: 3, // Faster medium pace
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                    area: 800,
                },
                value: 80, // High density for visual texture
            },
            opacity: {
                value: { min: 0.05, max: 0.2 }, // Very subtle base
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    opacity_min: 0.05,
                    sync: false
                }
            },
            shape: {
                type: "image",
                options: {
                    image: techIcons
                },
            },
            size: {
                value: { min: 8, max: 18 }, // Smaller base size
                random: true,
            },
            rotate: {
                value: { min: 0, max: 360 },
                direction: "random",
                animation: {
                    enable: true,
                    speed: 8, // Faster rotation
                    sync: false
                }
            },
            shadow: {
                enable: true,
                color: "#ffffff",
                blur: 20, // Strong glow
                offset: {
                    x: 0,
                    y: 0
                }
            },
            links: {
                enable: false
            }
        },
        detectRetina: true,
      }}
    />
  );
}
