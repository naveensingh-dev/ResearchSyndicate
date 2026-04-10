import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="hbar">
      <div class="h-logo">
        <div class="h-sigil">◈</div>
        RESEARCH SYNDICATE
      </div>
      <div class="h-sep"></div>
      <div class="h-tag">3-Agent Market Intelligence Crew</div>
      <div class="h-chips">
        <span class="h-chip hc-v">CrewAI</span>
        <span class="h-chip hc-a">SerpAPI</span>
        <span class="h-chip hc-e">Gemini</span>
      </div>
      <div class="h-right">
        <div class="h-status-wrap">
          <div class="h-dot" [class.live]="isLive"></div>
          <span>{{ statusText }}</span>
        </div>
        <div class="h-clock">{{ clockDisplay }}</div>
      </div>
    </div>
  `,
  styles: [`
    .hbar {
      display: flex; align-items: center;
      padding: 0 22px; gap: 16px; height: 54px;
      background: rgba(2,6,9,.92);
      border-bottom: 1px solid rgba(255,255,255,.035);
      position: relative; overflow: hidden;
    }
    .hbar::after {
      content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
      background: linear-gradient(90deg,transparent,var(--vb),var(--ab),var(--eb),transparent);
    }
    .h-logo {
      display: flex; align-items: center; gap: 9px;
      font-family: var(--fn); font-size: 17px; letter-spacing: 4px; color: #fff;
    }
    .h-sigil {
      width: 28px; height: 28px;
      clip-path: polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%);
      background: linear-gradient(135deg,var(--v),var(--a));
      display: flex; align-items: center; justify-content: center;
      font-size: 11px; color: #fff;
      animation: sigil-pulse 3.5s ease-in-out infinite;
    }
    @keyframes sigil-pulse { 0%,100% { filter: brightness(1) } 50% { filter: brightness(1.5) drop-shadow(0 0 6px var(--vl)) } }
    .h-sep { width: 1px; height: 20px; background: rgba(255,255,255,.06); }
    .h-tag { font-family: var(--fb); font-size: 10px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: var(--ink-dim); }
    .h-chips { display: flex; gap: 5px; }
    .h-chip { font-family: var(--fb); font-size: 8px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; padding: 2px 7px; border: 1px solid; }
    .hc-v { color: var(--vl); border-color: var(--vb); background: var(--vg); }
    .hc-a { color: var(--al); border-color: var(--ab); background: var(--ag); }
    .hc-e { color: var(--el); border-color: var(--eb); background: var(--eg); }
    .h-right { margin-left: auto; display: flex; align-items: center; gap: 12px; }
    .h-status-wrap { display: flex; align-items: center; gap: 6px; font-family: var(--fb); font-size: 9px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: var(--ink-dim); }
    .h-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--ink-dim); }
    .h-dot.live { background: var(--el); animation: blink 1.2s infinite; }
    @keyframes blink { 0%,100% { opacity: 1 } 50% { opacity: 0 } }
    .h-clock { font-family: var(--fn); font-size: 17px; letter-spacing: 3px; color: rgba(255,255,255,.35); padding-left: 12px; border-left: 1px solid rgba(255,255,255,.06); }
  `]
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLive = false;
  statusText = 'SYSTEMS NOMINAL';
  clockDisplay = '00:00:00';
  private timerInt: any;
  private startTime: number = 0;

  ngOnInit() {
    this.startClock();
  }

  startClock() {
    this.startTime = Date.now();
    this.timerInt = setInterval(() => {
      const e = Date.now() - this.startTime;
      const h = String(Math.floor(e / 3600000)).padStart(2, '0');
      const m = String(Math.floor((e % 3600000) / 60000)).padStart(2, '0');
      const s = String(Math.floor((e % 60000) / 1000)).padStart(2, '0');
      this.clockDisplay = `${h}:${m}:${s}`;
    }, 1000);
  }

  ngOnDestroy() {
    if (this.timerInt) clearInterval(this.timerInt);
  }
}
