import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
import HeroVisual from './heroVisual';

const StyledHeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (min-width: 1200px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  .hero-text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex: 1 1 auto;
    min-width: 0;

    @media (min-width: 1200px) {
      .big-heading {
        font-size: clamp(40px, 5vw, 70px);
      }
    }
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Vikas V.</h2>;
  const three = <h3 className="big-heading">I build full-stack web applications.</h3>;
  const four = (
    <>
      <p>
        I’m a Computer Science graduate and aspiring full-stack developer based in Bangalore, with
        hands-on experience in ASP.NET Core, React, and SQL Server. I recently built ClinicFlow, a
        scheduling platform, as part of an Agile team at Cognizant. I’m currently looking for a
        Software Developer role where I can build reliable, well-tested software.
      </p>
    </>
  );

  const items = [one, two, three, four];

  return (
    <StyledHeroSection>
      <div className="hero-text">
        {prefersReducedMotion ? (
          <>
            {items.map((item, i) => (
              <div key={i}>{item}</div>
            ))}
          </>
        ) : (
          <TransitionGroup component={null}>
            {isMounted &&
              items.map((item, i) => (
                <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                  <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
                </CSSTransition>
              ))}
          </TransitionGroup>
        )}
      </div>

      <HeroVisual show={prefersReducedMotion || isMounted} />
    </StyledHeroSection>
  );
};

export default Hero;
