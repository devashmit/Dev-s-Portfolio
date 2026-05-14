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
        fullScreen: { enable: true, zIndex: -1 },
        fpsLimit: 60,
        interactivity: {
            events: {
                onHover: {
                    enable: true,
                    mode: "repulse", // Back to repulse for more interaction
                },
                resize: true,
            },
            modes: {
                repulse: {
                    distance: 150,
                    duration: 0.4,
                },
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
                speed: 1.5, // Medium pace
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                    area: 800,
                },
                value: 20, // Slightly more icons for texture
            },
            opacity: {
                value: 0.4, // Slightly more visible for 'glow' to show through
                random: true,
                anim: {
                    enable: true,
                    speed: 0.5,
                    opacity_min: 0.1,
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
                value: { min: 20, max: 40 },
                random: true,
            },
            rotate: {
                value: { min: 0, max: 360 },
                direction: "random",
                animation: {
                    enable: true,
                    speed: 5,
                    sync: false
                }
            },
            shadow: {
                enable: true,
                color: "#ffffff",
                blur: 15,
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
