import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agent-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="agent-card" [ngClass]="['card-' + id, status === 'active' ? 'card-active' : '', status === 'done' ? 'card-done' : '']">
      <div class="card-scanline" *ngIf="status === 'active'"></div>
      <div class="cls-hdr">
        <span>⬡ CLEARANCE {{ clearance }} — TOP SECRET</span>
        <div class="pips">
          <div class="pip on"></div><div class="pip on"></div><div class="pip on"></div>
          <div class="pip" [class.on]="id > 0"></div><div class="pip" [class.on]="id > 1"></div>
        </div>
      </div>
      <div class="agent-ident">
        <div class="badge-wrap">
          <svg class="orbital-svg" viewBox="0 0 82 82">
            <circle class="orb-bg" cx="41" cy="41" r="37"/>
            <circle class="orb-arc" cx="41" cy="41" r="37"/>
            <circle class="orb-dot" cx="41" cy="4"/>
          </svg>
          <div class="hex-badge">
            <div class="hex-outer">
              <div class="hex-inner">{{ name[0] }}<div class="hex-scan"></div></div>
            </div>
          </div>
        </div>
        <div class="agent-meta">
          <div class="op-num">OPERATIVE · 00{{ id + 1 }}</div>
          <div class="agent-name">{{ name }}</div>
          <div class="agent-spec">{{ spec }}</div>
          <div class="s-pill" [ngClass]="['sp-' + status]">
            <div class="pd"></div>
            <span>{{ status === 'active' ? 'ACTIVE' : status === 'done' ? 'VERIFIED ✓' : 'STANDBY' }}</span>
          </div>
        </div>
      </div>
      <div class="neural-zone">
        <div class="nz-label">Neural Activity</div>
        <div class="nb-wrap">
          <div *ngFor="let bar of activityBars; let i = index" class="nb" [style.height.%]="bar" [style.--d]="(i * 0.07) + 's'"></div>
        </div>
      </div>
      <div class="field-zone">
        <div class="field-row"><span class="fk">Toolset</span><span class="fv">{{ tools }}</span></div>
        <div class="field-row"><span class="fk">Method</span><span class="fv" [class.redacted]="status !== 'done'">{{ method }}</span></div>
        <div class="field-row"><span class="fk">Output</span><span class="fv" [class.redacted]="status !== 'done'">{{ output }}</span></div>
      </div>
      <div class="log-zone">
        <div class="log-hdr">MISSION LOG</div>
        <div class="log-txt">
          <div *ngFor="let log of logs; let last = last" class="log-line" [class.ll-cur]="last && status === 'active'" [class.ll-done]="status === 'done'">{{ log }}</div>
        </div>
      </div>
      <div class="prog-zone"><div class="prog-fill" [style.width.%]="progress"></div></div>
      <div class="vstamp">VERI<br>FIED</div>
      <div class="card-wm">{{ name[0] }}</div>
    </div>
  `,
  styles: [`
    .agent-card {
      background: var(--surface); border: 1px solid var(--border);
      display: flex; flex-direction: column; overflow: hidden; position: relative;
      transition: transform .4s cubic-bezier(.2,.8,.3,1), box-shadow .4s ease; height: 100%;
    }
    .card-scanline {
      position: absolute; inset: 0; pointer-events: none; z-index: 10;
      background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.08) 50%, transparent);
      height: 20%; animation: card-scan 2.5s linear infinite; opacity: 0.8;
    }
    @keyframes card-scan { 0% { top: -20%; } 100% { top: 120%; } }
    .card-0 { border-color: var(--vb); }
    .card-2 { border-color: var(--eb); }
    .card-active { transform: translateY(-6px); }
    .card-0.card-active { box-shadow: 0 20px 60px rgba(0,0,0,.55), 0 0 50px var(--vg), inset 0 1px 0 var(--vb); }
    .card-1.card-active { box-shadow: 0 20px 60px rgba(0,0,0,.55), 0 0 50px var(--ag), inset 0 1px 0 var(--ab); }
    .card-2.card-active { box-shadow: 0 20px 60px rgba(0,0,0,.55), 0 0 50px var(--eg), inset 0 1px 0 var(--eb); }
    .cls-hdr {
      padding: 5px 12px; display: flex; align-items: center; justify-content: space-between;
      font-family: var(--fb); font-size: 8px; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase;
      border-bottom: 1px solid; flex-shrink: 0;
    }
    .card-0 .cls-hdr { background: rgba(109,40,217,.12); color: var(--vl); border-color: var(--vb); }
    .card-1 .cls-hdr { background: rgba(180,83,9,.12); color: var(--al); border-color: var(--ab); }
    .card-2 .cls-hdr { background: rgba(4,120,87,.12); color: var(--el); border-color: var(--eb); }
    .pips { display: flex; gap: 3px; }
    .pip { width: 5px; height: 5px; border-radius: 50%; border: 1px solid currentColor; opacity: .3; }
    .pip.on { opacity: 1; background: currentColor; }
    .agent-ident { padding: 13px 13px 10px; display: flex; gap: 13px; align-items: flex-start; border-bottom: 1px solid rgba(255,255,255,.04); flex-shrink: 0; }
    .badge-wrap { position: relative; width: 64px; height: 64px; flex-shrink: 0; }
    .orbital-svg { position: absolute; top: -9px; left: -9px; width: calc(100% + 18px); height: calc(100% + 18px); animation: orb-spin 4s linear infinite; opacity: 0; transition: opacity .5s; }
    .card-active .orbital-svg { opacity: 1; }
    .card-done .orbital-svg { opacity: .5; animation-duration: 10s; }
    .orb-bg { fill: none; stroke-width: .8; }
    .card-0 .orb-bg { stroke: rgba(167,139,250, .15); }
    .card-1 .orb-bg { stroke: rgba(251,191,36, .15); }
    .card-2 .orb-bg { stroke: rgba(52,211,153, .15); }
    .orb-arc { fill: none; stroke-width: 1.4; stroke-linecap: round; stroke-dasharray: 22 82; }
    .card-0 .orb-arc { stroke: var(--vl); }
    .card-1 .orb-arc { stroke: var(--al); }
    .card-2 .orb-arc { stroke: var(--el); }
    .orb-dot { r: 2.5; }
    .card-0 .orb-dot { fill: var(--vl); }
    .card-1 .orb-dot { fill: var(--al); }
    .card-2 .orb-dot { fill: var(--el); }
    @keyframes orb-spin { to { transform: rotate(360deg) } }
    .hex-badge { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; }
    .hex-outer { width: 58px; height: 58px; clip-path: polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%); display: flex; align-items: center; justify-content: center; }
    .card-0 .hex-outer { background: linear-gradient(135deg,rgba(109,40,217,.9),rgba(109,40,217,.25)); }
    .card-1 .hex-outer { background: linear-gradient(135deg,rgba(180,83,9,.9),rgba(180,83,9,.25)); }
    .card-2 .hex-outer { background: linear-gradient(135deg,rgba(4,120,87,.9),rgba(4,120,87,.25)); }
    .hex-inner { width: 50px; height: 50px; clip-path: polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%); background: var(--surface2); display: flex; align-items: center; justify-content: center; font-family: var(--fn); font-size: 20px; position: relative; }
    .card-0 .hex-inner { color: var(--vl); }
    .card-1 .hex-inner { color: var(--al); }
    .card-2 .hex-inner { color: var(--el); }
    .agent-meta { flex: 1; padding-top: 1px; min-width: 0; }
    .op-num { font-family: var(--fb); font-size: 8px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; color: var(--ink-dim); margin-bottom: 1px; }
    .agent-name { font-family: var(--fn); font-size: 28px; letter-spacing: 2px; line-height: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .card-0 .agent-name { color: var(--vl); }
    .card-1 .agent-name { color: var(--al); }
    .card-2 .agent-name { color: var(--el); }
    .agent-spec { font-family: var(--fb); font-size: 8px; font-weight: 400; letter-spacing: 1.5px; text-transform: uppercase; color: var(--ink-dim); margin-top: 2px; margin-bottom: 6px; }
    .s-pill { display: inline-flex; align-items: center; gap: 4px; padding: 2px 8px; font-family: var(--fb); font-size: 8px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; border: 1px solid rgba(255,255,255,.08); color: var(--ink-dim); }
    .pd { width: 4px; height: 4px; border-radius: 50%; background: currentColor; flex-shrink: 0; }
    .sp-active { animation: pill-pulse 1.2s infinite; }
    .card-0 .sp-active { color: var(--vl); border-color: var(--vb); }
    .card-1 .sp-active { color: var(--al); border-color: var(--ab); }
    .card-2 .sp-active { color: var(--el); border-color: var(--eb); }
    .sp-done { color: var(--el); border-color: var(--eb); }
    @keyframes pill-pulse { 0%,100% { opacity: 1 } 50% { opacity: .45 } }
    .neural-zone { padding: 7px 12px; border-bottom: 1px solid rgba(255,255,255,.04); display: flex; flex-direction: column; gap: 4px; flex-shrink: 0; }
    .nz-label { font-family: var(--fb); font-size: 7px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: var(--ink-ghost); }
    .nb-wrap { display: flex; align-items: flex-end; gap: 2px; height: 22px; }
    .nb { flex: 1; border-radius: 1px; background: rgba(255,255,255,.07); transform-origin: bottom; }
    .card-active .nb { animation: nb-wave 1s var(--d, 0s) ease-in-out infinite; }
    .card-0.card-active .nb { background: rgba(167,139,250,.45); }
    .card-1.card-active .nb { background: rgba(251,191,36,.45); }
    .card-2.card-active .nb { background: rgba(52,211,153,.45); }
    @keyframes nb-wave { 0%,100% { transform: scaleY(.3) } 50% { transform: scaleY(1) } }
    .field-zone { padding: 7px 12px; border-bottom: 1px solid rgba(255,255,255,.04); flex-shrink: 0; }
    .field-row { display: flex; justify-content: space-between; align-items: baseline; padding: 3.5px 0; border-bottom: 1px solid rgba(255,255,255,.02); }
    .fk { font-family: var(--fb); font-size: 8px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: var(--ink-dim); }
    .fv { font-family: var(--fm); font-size: 8px; color: var(--ink); }
    .redacted { background: var(--ink-dim); color: transparent; border-radius: 1px; user-select: none; padding: 0 3px; }
    .log-zone { flex: 1; padding: 9px 12px; background: rgba(0,0,0,.22); border-bottom: 1px solid rgba(255,255,255,.03); position: relative; overflow: hidden; min-height: 65px; }
    .log-hdr { font-family: var(--fb); font-size: 7px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: var(--ink-ghost); margin-bottom: 6px; display: flex; align-items: center; gap: 5px; }
    .log-hdr::before { content: ''; width: 18px; height: 1px; background: var(--ink-ghost); }
    .log-txt { font-family: var(--fm); font-size: 9px; line-height: 1.8; }
    .log-line { color: var(--ink-dim); }
    .ll-cur { color: var(--ink); }
    .card-0 .ll-cur { color: var(--vl); }
    .card-1 .ll-cur { color: var(--al); }
    .card-2 .ll-cur { color: var(--el); }
    .ll-done { color: rgba(52,211,153,.55); }
    .prog-zone { height: 3px; background: rgba(255,255,255,.04); position: relative; overflow: hidden; flex-shrink: 0; }
    .prog-fill { height: 100%; width: 0%; transition: width .5s ease; position: relative; }
    .card-0 .prog-fill { background: var(--v); box-shadow: 0 0 10px var(--vl); }
    .card-1 .prog-fill { background: var(--a); box-shadow: 0 0 10px var(--al); }
    .card-2 .prog-fill { background: var(--e); box-shadow: 0 0 10px var(--el); }
    .vstamp { display: none; position: absolute; bottom: 16px; right: 12px; width: 50px; height: 50px; border: 2px solid var(--el); border-radius: 50%; align-items: center; justify-content: center; flex-direction: column; font-family: var(--fn); font-size: 9px; letter-spacing: 2px; color: var(--el); transform: rotate(-22deg); opacity: .6; z-index: 5; }
    .card-done .vstamp { display: flex; }
    .card-wm { position: absolute; font-family: var(--fn); font-size: 94px; letter-spacing: 4px; opacity: .016; color: #fff; bottom: -14px; right: -6px; pointer-events: none; line-height: 1; user-select: none; }
  `]
})
export class AgentCardComponent {
  @Input() id: number = 0;
  @Input() name: string = '';
  @Input() spec: string = '';
  @Input() clearance: string = '';
  @Input() status: string = 'standby';
  @Input() progress: number = 0;
  @Input() tools: string = '';
  @Input() method: string = '';
  @Input() output: string = '';
  @Input() logs: string[] = [];
  
  activityBars = [32, 58, 44, 78, 35, 62, 50, 72, 40, 55, 68, 30, 84, 46, 60, 38];
}
