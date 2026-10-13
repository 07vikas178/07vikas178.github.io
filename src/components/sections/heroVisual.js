import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { usePrefersReducedMotion } from '@hooks';

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const blink = keyframes`
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
`;

// Each line is a list of tokens: { text, cls } (cls decides the syntax colour)
const LINES = [
  [
    { text: 'const ', cls: 'kw' },
    { text: 'vikas ', cls: 'var' },
    { text: '= {', cls: 'punc' },
  ],
  [
    { text: '  role', cls: 'prop' },
    { text: ': ', cls: 'punc' },
    { text: '"Full-Stack Developer"', cls: 'str' },
    { text: ',', cls: 'punc' },
  ],
  [
    { text: '  stack', cls: 'prop' },
    { text: ': [', cls: 'punc' },
  ],
  [
    { text: '    "ASP.NET Core"', cls: 'str' },
    { text: ',', cls: 'punc' },
  ],
  [
    { text: '    "React"', cls: 'str' },
    { text: ',', cls: 'punc' },
  ],
  [
    { text: '    "SQL Server"', cls: 'str' },
    { text: ',', cls: 'punc' },
  ],
  [{ text: '  ],', cls: 'punc' }],
  [
    { text: '  location', cls: 'prop' },
    { text: ': ', cls: 'punc' },
    { text: '"Bangalore, India"', cls: 'str' },
    { text: ',', cls: 'punc' },
  ],
  [
    { text: '  openToWork', cls: 'prop' },
    { text: ': ', cls: 'punc' },
    { text: 'true', cls: 'bool' },
    { text: ',', cls: 'punc' },
  ],
  [{ text: '};', cls: 'punc' }],
];

const TOTAL =
  LINES.reduce((sum, line) => sum + line.reduce((n, tok) => n + tok.text.length, 0), 0) +
  (LINES.length - 1);

// Floating tech badges: position is relative to the visual container
const BADGES = [
  { label: 'React', style: { top: '-2%', left: '-14%' }, duration: 6, delay: 0 },
  { label: 'C#', style: { top: '-6%', right: '-6%' }, duration: 7, delay: 1.2 },
  { label: '.NET', style: { top: '40%', left: '-22%' }, duration: 8, delay: 0.6 },
  { label: 'SQL Server', style: { top: '46%', right: '-24%' }, duration: 6.5, delay: 2 },
  { label: 'Azure', style: { bottom: '2%', left: '-8%' }, duration: 7.5, delay: 1.8 },
  { label: 'Git', style: { bottom: '-4%', right: '2%' }, duration: 5.5, delay: 0.9 },
];

const StyledVisual = styled.div`
  display: none;
  position: relative;
  flex: 0 0 clamp(290px, 28vw, 360px);
  margin-left: 40px;
  opacity: ${({ show }) => (show ? 1 : 0)};
  transform: translateY(${({ show }) => (show ? '0' : '20px')});
  transition: opacity 0.8s ease, transform 0.8s ease;

  @media (min-width: 1200px) {
    display: block;
  }

  .hex {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 0;
    transform: translate(-50%, -50%);
    pointer-events: none;

    svg {
      display: block;
      width: 100%;
      height: 100%;
      fill: none;
      stroke: var(--green);
      stroke-width: 0.5;
    }

    &.outer {
      width: 135%;
      opacity: 0.18;

      svg {
        animation: ${spin} 70s linear infinite;
      }
    }

    &.inner {
      width: 100%;
      opacity: 0.12;

      svg {
        animation: ${spin} 50s linear infinite reverse;
      }
    }
  }

  .card {
    position: relative;
    z-index: 1;
    border: 1px solid var(--lightest-navy);
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
    box-shadow: 0 20px 40px -15px var(--navy-shadow);
    overflow: hidden;
    animation: ${float} 8s ease-in-out infinite;
  }

  .card-header {
    display: flex;
    align-items: center;
    padding: 10px 14px;
    background-color: var(--lightest-navy);

    .dot {
      width: 10px;
      height: 10px;
      margin-right: 7px;
      border-radius: 50%;

      &.red {
        background-color: #ff5f56;
      }
      &.yellow {
        background-color: #ffbd2e;
      }
      &.green {
        background-color: #27c93f;
      }
    }

    .filename {
      margin-left: 8px;
      color: var(--slate);
      font-family: var(--font-mono);
      font-size: 11px;
    }
  }

  .card-body {
    min-height: ${LINES.length * 22 + 32}px;
    padding: 16px 18px;
    font-family: var(--font-mono);
    font-size: 12px;
    line-height: 22px;
    white-space: pre;

    .kw {
      color: #c792ea;
    }
    .var {
      color: var(--lightest-slate);
    }
    .prop {
      color: #82aaff;
    }
    .str {
      color: var(--green);
    }
    .bool {
      color: #f78c6c;
    }
    .punc {
      color: var(--slate);
    }

    .cursor {
      display: inline-block;
      width: 7px;
      height: 14px;
      margin-left: 1px;
      vertical-align: text-bottom;
      background-color: var(--green);
      animation: ${blink} 1s steps(1) infinite;
    }
  }

  .badge {
    position: absolute;
    z-index: 2;
    padding: 6px 13px;
    border: 1px solid rgba(100, 255, 218, 0.35);
    border-radius: 20px;
    background-color: var(--navy);
    box-shadow: 0 10px 30px -15px var(--navy-shadow);
    color: var(--green);
    font-family: var(--font-mono);
    font-size: 12px;
    line-height: 1;
    animation: ${float} 6s ease-in-out infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    .card,
    .badge,
    .hex svg,
    .cursor {
      animation: none;
    }
  }
`;

const HeroVisual = ({ show }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [count, setCount] = useState(TOTAL);

  useEffect(() => {
    if (prefersReducedMotion) {
      setCount(TOTAL);
      return;
    }

    setCount(0);
    if (!show) {
      return;
    }

    let interval;
    const start = setTimeout(() => {
      let i = 0;
      interval = setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= TOTAL) {
          clearInterval(interval);
        }
      }, 28);
    }, 900);

    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [show, prefersReducedMotion]);

  // Build the visible part of the code, one row per line
  let left = count;
  let cursorPlaced = false;
  const rows = [];

  for (let li = 0; li < LINES.length; li++) {
    const parts = [];
    for (let ti = 0; ti < LINES[li].length; ti++) {
      const tok = LINES[li][ti];
      if (left <= 0) {
        break;
      }
      const shown = tok.text.slice(0, left);
      left -= shown.length;
      parts.push(
        <span key={ti} className={tok.cls}>
          {shown}
        </span>,
      );
    }

    const isLastLine = li === LINES.length - 1;
    const placeCursor = !cursorPlaced && (left <= 0 || isLastLine);

    rows.push(
      <div key={li}>
        {parts}
        {placeCursor && <span className="cursor" />}
        {parts.length === 0 && !placeCursor ? '\u00A0' : null}
      </div>,
    );

    if (placeCursor) {
      cursorPlaced = true;
      // keep remaining lines as empty placeholders so the card height never jumps
      for (let r = li + 1; r < LINES.length; r++) {
        rows.push(<div key={r}>{'\u00A0'}</div>);
      }
      break;
    }

    // moving to the next line costs one "keystroke" (the newline)
    left -= 1;
  }

  return (
    <StyledVisual show={show} aria-hidden="true">
      <div className="hex outer">
        <svg viewBox="0 0 100 100">
          <polygon points="50,3 91,26.5 91,73.5 50,97 9,73.5 9,26.5" />
        </svg>
      </div>
      <div className="hex inner">
        <svg viewBox="0 0 100 100">
          <polygon points="50,3 91,26.5 91,73.5 50,97 9,73.5 9,26.5" />
        </svg>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
          <span className="filename">vikas.js</span>
        </div>
        <div className="card-body">{rows}</div>
      </div>

      {BADGES.map(({ label, style, duration, delay }) => (
        <span
          key={label}
          className="badge"
          style={{ ...style, animationDuration: `${duration}s`, animationDelay: `${delay}s` }}>
          {label}
        </span>
      ))}
    </StyledVisual>
  );
};

export default HeroVisual;

HeroVisual.propTypes = {
  show: PropTypes.bool,
};
