'use client';

import React from 'react';

export function SakuraDecoration() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute -top-10 -left-10 w-32 h-32 opacity-10 dark:opacity-5 animate-float">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-current text-pink-300">
          <path d="M50,0 C55,25 75,45 100,50 C75,55 55,75 50,100 C45,75 25,55 0,50 C25,45 45,25 50,0" />
        </svg>
      </div>
      <div className="absolute top-1/4 right-10 w-24 h-24 opacity-10 dark:opacity-5 animate-float-delayed">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-current text-pink-300">
          <path d="M50,0 C55,25 75,45 100,50 C75,55 55,75 50,100 C45,75 25,55 0,50 C25,45 45,25 50,0" />
        </svg>
      </div>
    </div>
  );
}

export function WavePattern() {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-32 pointer-events-none z-0">
      <svg className="w-full h-full opacity-10 dark:opacity-5" viewBox="0 0 1440 320">
        <path 
          fill="currentColor" 
          className="text-indigo-200"
          d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
}