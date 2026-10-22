import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, fonts, sizes} from '../theme';
import type {Word} from '../timing';
import {prog} from '../anim';

type Segment = {words: Word[]; start: number; end: number};

/** Découpe la voix off en segments courts (2 lignes maximum), coupés à la ponctuation. */
export const buildSegments = (words: Word[]): Segment[] => {
  const segs: Word[][] = [];
  let cur: Word[] = [];
  for (const w of words) {
    cur.push(w);
    const len = cur.map((x) => x.w).join(' ').length;
    if (/[.?!]$/.test(w.w) || (/[,:;]$/.test(w.w) && len > 42) || len > 86) {
      segs.push(cur);
      cur = [];
    }
  }
  if (cur.length) segs.push(cur);
  return segs.map((ws, i) => {
    const next = segs[i + 1];
    const start = Math.max(0, ws[0].s - 0.08);
    const end = Math.min(ws[ws.length - 1].e + 0.45, next ? next[0].s - 0.03 : Infinity);
    return {words: ws, start, end};
  });
};

export const Subtitle: React.FC<{words: Word[]; dark?: boolean}> = ({words, dark = false}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const segs = React.useMemo(() => buildSegments(words), [words]);
  const seg = segs.find((s) => t >= s.start && t < s.end);
  if (!seg) return null;
  const inP = prog(t, seg.start, seg.start + 0.15);
  const outP = 1 - prog(t, seg.end - 0.12, seg.end);
  const o = Math.min(inP, outP);
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 54,
        display: 'flex',
        justifyContent: 'center',
        opacity: o,
        transform: `translateY(${(1 - inP) * 14}px)`,
      }}
    >
      <div
        style={{
          maxWidth: 1480,
          padding: '16px 38px 18px',
          borderRadius: 20,
          background: dark ? 'rgba(20,50,92,0.92)' : 'rgba(7,29,59,0.86)',
          border: dark ? '2px solid #2A4570' : '2px solid transparent',
          color: colors.cream,
          fontFamily: fonts.main,
          fontWeight: 600,
          fontSize: sizes.subtitle,
          lineHeight: 1.32,
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(7,29,59,0.25)',
        }}
      >
        {seg.words.map((w, i) => {
          const active = t >= w.s && t < w.e + 0.04;
          const past = t >= w.e;
          return (
            <span key={i} style={{color: active ? colors.gold : colors.cream, opacity: active || past ? 1 : 0.72, fontWeight: active ? 800 : 600}}>
              {w.w}
              {i < seg.words.length - 1 ? ' ' : ''}
            </span>
          );
        })}
      </div>
    </div>
  );
};
