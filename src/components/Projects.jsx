import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { projectsData } from '../data/content';
import BackgroundGlow from './BackgroundGlow';
import ProgressIndicator from './ProgressIndicator';

const GithubIcon = ({ className = '', size = 16 }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={{ width: size, height: size }}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const scrollSectionRef = useRef(null);
  const containerRef = useRef(null);
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect screen size to toggle desktop vs mobile layout
    // 900px is selected as the breakpoint between horizontal scroll and stacked lists
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 900);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const scrollSection = scrollSectionRef.current;
    const container = containerRef.current;
    if (!scrollSection || !container) return;

    // Calculate total horizontal scroll length
    const getScrollAmount = () => {
      return container.scrollWidth - window.innerWidth;
    };

    // Master Timeline for Pinned Horizontal Scroll
    const mainCtx = gsap.context(() => {
      const pinTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: scrollSection,
          pin: true,
          scrub: 0.8,
          start: 'top top',
          end: () => `+=${getScrollAmount()}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
            // Calculate active project index dynamically
            const segment = 1 / projectsData.length;
            const index = Math.min(
              Math.floor(self.progress / segment),
              projectsData.length - 1
            );
            setActiveIndex(index);
          }
        }
      });

      // Horizontal container slide animation
      pinTimeline.to(container, {
        x: () => -getScrollAmount(),
        ease: 'none'
      });

      // Animate individual card transitions during scroll
      const cards = gsap.utils.toArray('.cinematic-project-card');
      cards.forEach((card, idx) => {
        const bgNumber = card.querySelector('.cinematic-project-bg-number');
        const title = card.querySelector('.cinematic-project-title');
        const desc = card.querySelector('.cinematic-project-desc');
        const tags = card.querySelectorAll('.cinematic-project-tag');
        const actions = card.querySelector('.cinematic-project-actions');

        // Initial entry state of card components
        gsap.set([title, desc, actions], { opacity: 0, y: 50, filter: 'blur(10px)' });
        gsap.set(tags, { opacity: 0, y: 20 });
        gsap.set(bgNumber, { opacity: 0, x: 100 });

        // Trigger animations when the card is active in the viewport
        ScrollTrigger.create({
          trigger: card,
          containerAnimation: pinTimeline,
          start: 'left right-=150',
          end: 'right left+=150',
          onEnter: () => {
            // Animate card items staggers
            gsap.to(bgNumber, { opacity: 0.03, x: 0, duration: 1.2, ease: 'power3.out' });
            gsap.to(title, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, delay: 0.1, ease: 'power3.out' });
            gsap.to(desc, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, delay: 0.2, ease: 'power3.out' });
            
            // Stagger tech tags animation
            gsap.to(tags, { 
              opacity: 1, 
              y: 0, 
              duration: 0.5, 
              stagger: 0.05, 
              delay: 0.3,
              ease: 'power2.out' 
            });

            gsap.to(actions, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, delay: 0.5, ease: 'power3.out' });
          },
          onLeave: () => {
            // Exit states: Fade previous card elements to 20% opacity and scale down slightly
            gsap.to([title, desc, tags, actions], { opacity: 0.2, scale: 0.98, filter: 'blur(4px)', duration: 0.8 });
          },
          onEnterBack: () => {
            // Restore card states when scrolling back
            gsap.to(bgNumber, { opacity: 0.03, x: 0, duration: 1.2, ease: 'power3.out' });
            gsap.to([title, desc, tags, actions], { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.8 });
          },
          onLeaveBack: () => {
            // Reset to initial entry state
            gsap.to([title, desc, actions], { opacity: 0, y: 50, filter: 'blur(10px)', duration: 0.6 });
            gsap.to(tags, { opacity: 0, y: 20, duration: 0.4 });
            gsap.to(bgNumber, { opacity: 0, x: 100, duration: 0.8 });
          }
        });

        // Parallax Effect for Background Number (slow horizontal movement)
        gsap.to(bgNumber, {
          x: -120,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            containerAnimation: pinTimeline,
            start: 'left right',
            end: 'right left',
            scrub: true
          }
        });
      });
    }, scrollSection);

    return () => mainCtx.revert();
  }, [isMobile]);

  // Mobile layout trigger hooks
  useEffect(() => {
    if (!isMobile) return;

    // Standard stacked mobile animation trigger
    const mobileCards = gsap.utils.toArray('.cinematic-project-card-mobile');
    const mobileCtx = gsap.context(() => {
      mobileCards.forEach((card) => {
        gsap.fromTo(
          card.querySelectorAll('.animate-mobile'),
          { opacity: 0, y: 40, filter: 'blur(10px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.8,
            stagger: 0.1,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    });

    return () => mobileCtx.revert();
  }, [isMobile]);

  // Render Horizontal Experience on Desktop/Tablet
  if (!isMobile) {
    return (
      <section 
        id="projects" 
        ref={scrollSectionRef} 
        className="projects-cinematic-pin-section"
        aria-label="Selected Work"
      >
        <BackgroundGlow activeIndex={activeIndex} />
        
        <div className="projects-cinematic-sticky-header">
          <p className="section-eyebrow">// SELECTED WORK</p>
        </div>

        <div ref={containerRef} className="projects-cinematic-horizontal-list">
          {projectsData.map((project, index) => (
            <div 
              key={project.title} 
              className="cinematic-project-card"
            >
              {/* Giant background number parallax layer */}
              <div className="cinematic-project-bg-number">
                {String(index + 1).padStart(3, '0')}
              </div>

              {/* Foreground content card */}
              <div className="cinematic-project-content">
                <span className="cinematic-project-category">
                  {project.category} · {project.year}
                </span>

                <h2 className="cinematic-project-title">
                  {project.title}
                </h2>

                <p className="cinematic-project-desc">
                  {project.desc}
                </p>

                <div className="cinematic-project-tags">
                  {project.stack?.map((tech) => (
                    <span key={tech} className="cinematic-project-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="cinematic-project-actions">
                  {project.github && project.github !== '#' && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cinematic-action-btn github-btn"
                    >
                      <GithubIcon className="btn-icon" size={16} />
                      <span>Source Code</span>
                      <ArrowUpRight className="arrow-indicator" size={16} />
                    </a>
                  )}
                  {project.link && project.link !== '#' && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cinematic-action-btn preview-btn"
                    >
                      <span>Live Preview</span>
                      <ArrowUpRight className="arrow-indicator" size={16} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <ProgressIndicator 
          activeIndex={activeIndex} 
          total={projectsData.length} 
          progress={scrollProgress} 
        />
      </section>
    );
  }

  // Fallback Vertical Stack Experience on Mobile
  return (
    <section id="projects" className="projects-mobile-section" aria-label="Selected Work">
      <div className="mobile-section-header">
        <p className="section-eyebrow">// SELECTED WORK</p>
      </div>

      <div className="projects-mobile-list">
        {projectsData.map((project, index) => (
          <div key={project.title} className="cinematic-project-card-mobile">
            <div className="mobile-bg-number-container">
              <span className="mobile-bg-number animate-mobile">
                {String(index + 1).padStart(3, '0')}
              </span>
            </div>

            <div className="mobile-card-content">
              <span className="cinematic-project-category animate-mobile">
                {project.category} · {project.year}
              </span>

              <h2 className="cinematic-project-title animate-mobile">
                {project.title}
              </h2>

              <p className="cinematic-project-desc animate-mobile">
                {project.desc}
              </p>

              <div className="cinematic-project-tags animate-mobile">
                {project.stack?.map((tech) => (
                  <span key={tech} className="cinematic-project-tag">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="cinematic-project-actions animate-mobile">
                {project.github && project.github !== '#' && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cinematic-action-btn github-btn"
                  >
                    <GithubIcon className="btn-icon" size={14} />
                    <span>Source Code</span>
                    <ArrowUpRight className="arrow-indicator" size={14} />
                  </a>
                )}
                {project.link && project.link !== '#' && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cinematic-action-btn preview-btn"
                  >
                    <span>Live Preview</span>
                    <ArrowUpRight className="arrow-indicator" size={14} />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
