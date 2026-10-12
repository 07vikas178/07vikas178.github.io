import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';

const StyledProjectsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: clamp(24px, 5vw, var(--fz-heading));
  }

  .skills-subtitle {
    margin: 10px 0 0;
    color: var(--slate);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    text-align: center;
  }

  .projects-grid {
    ${({ theme }) => theme.mixins.resetList};
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 15px;
    position: relative;
    margin-top: 50px;
    width: 100%;

    @media (max-width: 1080px) {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
  }
`;

const StyledProject = styled.li`
  position: relative;
  cursor: default;
  transition: var(--transition);

  @media (prefers-reduced-motion: no-preference) {
    &:hover,
    &:focus-within {
      .project-inner {
        transform: translateY(-7px);
      }
    }
  }

  .project-inner {
    ${({ theme }) => theme.mixins.boxShadow};
    ${({ theme }) => theme.mixins.flexBetween};
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    height: 100%;
    padding: 2rem 1.75rem;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
    transition: var(--transition);
    overflow: auto;
  }

  .project-top {
    ${({ theme }) => theme.mixins.flexBetween};
    margin-bottom: 35px;

    .folder {
      color: var(--green);
      svg {
        width: 40px;
        height: 40px;
      }
    }
  }

  .project-title {
    margin: 0 0 15px;
    color: var(--lightest-slate);
    font-size: var(--fz-xxl);
  }

  ul.skills-items {
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 8px;
      padding-left: 20px;
      color: var(--light-slate);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;

const skillGroups = [
  {
    title: 'Languages',
    items: ['Java', 'C', 'C#', 'HTML', 'CSS', 'JavaScript', 'TypeScript'],
  },
  {
    title: 'Frameworks',
    items: [
      'React JS',
      'Node JS (Express JS - REST API)',
      'ASP.NET Core (Web API, Razor)',
      'Entity Framework Core',
    ],
  },
  {
    title: 'Databases',
    items: ['SQL', 'SQL Server', 'MySQL', 'MongoDB'],
  },
  {
    title: 'Developer Tools',
    items: [
      'VS Code',
      'Visual Studio Community',
      'Git & GitHub',
      'Eclipse',
      'Postman',
      'MongoDB Compass',
      'Docker',
    ],
  },
  {
    title: 'Cloud & Deployment',
    items: ['Azure App Service', 'Azure SQL', 'Azure Static Web Apps'],
  },
  {
    title: 'Core Concepts',
    items: [
      'Data Structures',
      'Object-Oriented Programming',
      'SOLID Principles',
      'Layered Architecture',
      'Agile / Scrum',
      'JWT Authentication',
      'Unit Testing (NUnit / Moq)',
    ],
  },
];

const Projects = () => {
  const revealTitle = useRef(null);
  const revealProjects = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  return (
    <StyledProjectsSection id="skills">
      <div ref={revealTitle}>
        <h2>Skills &amp; Technologies</h2>
        <p className="skills-subtitle">Tools and concepts I work with</p>
      </div>

      <ul className="projects-grid">
        {skillGroups.map(({ title, items }, i) => (
          <StyledProject key={i} ref={el => (revealProjects.current[i] = el)}>
            <div className="project-inner">
              <header>
                <div className="project-top">
                  <div className="folder">
                    <Icon name="Folder" />
                  </div>
                </div>

                <h3 className="project-title">{title}</h3>

                <ul className="skills-items">
                  {items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </header>
            </div>
          </StyledProject>
        ))}
      </ul>
    </StyledProjectsSection>
  );
};

export default Projects;
