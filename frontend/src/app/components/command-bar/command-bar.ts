import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-command-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="cmdbar" [class.cb-busy]="busy">
      <div class="cmd-label">
        <div class="cmd-bracket"></div>
        MISSION
        <div class="cmd-bracket r"></div>
      </div>
      <div class="cmd-field">
        <div class="cmd-sym" [class.sym-busy]="busy">›_</div>
        <input [(ngModel)]="topic" (keydown.enter)="onLaunch()" [disabled]="busy"
          type="text" spellcheck="false"
          placeholder="Enter target company or market sector (e.g. Notion, EV battery market, Stripe competitors)…"/>
        <div class="cmd-cursor" *ngIf="!busy"></div>
      </div>
      <button class="deploy-btn" [disabled]="busy || !topic.trim()" (click)="onLaunch()">
        <span *ngIf="!busy">DEPLOY CREW</span>
        <span *ngIf="busy" class="deploy-txt-busy">DEPLOYING...</span>
        <div class="d-hex" [class.hex-spin]="busy">▶</div>
        <div class="btn-scanline" *ngIf="busy"></div>
      </button>
    </div>
  `,
  styles: [`
    .cmdbar { display: flex; align-items: stretch; border-top: 1px solid rgba(255,255,255,.04); background: rgba(2,6,9,.94); position: relative; overflow: hidden; height: 78px; transition: background 0.3s; }
    .cmdbar::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg,transparent,var(--vb),var(--ab),var(--eb),transparent); }
    .cb-busy { background: rgba(109,40,217,.05); border-top-color: rgba(109,40,217,.2); }
    .cmd-label { display: flex; align-items: center; padding: 0 16px; border-right: 1px solid rgba(255,255,255,.04); font-family: var(--fn); font-size: 15px; letter-spacing: 3px; color: var(--ink-dim); flex-shrink: 0; gap: 8px; white-space: nowrap; }
    .cmd-bracket { width: 3px; height: 20px; position: relative; flex-shrink: 0; }
    .cmd-bracket::before, .cmd-bracket::after { content: ''; position: absolute; width: 3px; height: 3px; border: 1px solid rgba(255,255,255,.15); }
    .cmd-bracket::before { top: 0; left: 0; border-right: none; border-bottom: none; }
    .cmd-bracket::after { bottom: 0; left: 0; border-right: none; border-top: none; }
    .cmd-bracket.r::before, .cmd-bracket.r::after { border-left: none; border-right: 1px solid rgba(255,255,255,.15); }
    .cmd-field { flex: 1; display: flex; align-items: center; padding: 0 16px; gap: 8px; border-right: 1px solid rgba(255,255,255,.04); position: relative; }
    .cmd-sym { font-family: var(--fn); font-size: 18px; color: var(--al); flex-shrink: 0; transition: color 0.3s; }
    .sym-busy { color: var(--vl); animation: pulse-sym 1s infinite; }
    @keyframes pulse-sym { 0%, 100% { opacity: 1; text-shadow: 0 0 8px var(--vl); } 50% { opacity: 0.5; text-shadow: none; } }
    input { flex: 1; background: transparent; border: none; outline: none; font-family: var(--fm); font-size: 12px; letter-spacing: .4px; color: var(--ink); caret-color: var(--al); width: 100%; }
    input:disabled { color: rgba(255,255,255,0.4); text-shadow: 0 0 4px rgba(255,255,255,0.2); }
    input::placeholder { color: var(--ink-ghost); }
    .cmd-cursor { width: 7px; height: 13px; background: var(--al); animation: blink .8s infinite; flex-shrink: 0; }
    @keyframes blink { 0%,100% { opacity: 1 } 50% { opacity: 0 } }
    .deploy-btn { flex-shrink: 0; padding: 0 26px; background: transparent; border: none; border-left: 1px solid rgba(255,255,255,.04); font-family: var(--fn); font-size: 16px; letter-spacing: 3px; color: var(--ink-dim); cursor: pointer; display: flex; align-items: center; gap: 10px; transition: color .2s, background .2s; position: relative; overflow: hidden; min-width: 180px; justify-content: center; }
    .deploy-btn::before { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg,transparent,rgba(180,83,9,.08)); opacity: 0; transition: opacity .2s; }
    .deploy-btn:hover:not(:disabled)::before { opacity: 1; }
    .deploy-btn:hover:not(:disabled) { color: var(--al); }
    .deploy-btn:disabled { cursor: not-allowed; }
    .deploy-btn:disabled:not(:has(.deploy-txt-busy)) { opacity: .28; }
    .deploy-txt-busy { color: var(--vl); animation: glitch-txt 2s linear infinite; }
    @keyframes glitch-txt {
      0%, 100% { text-shadow: 0 0 0px var(--vl); transform: translate(0); }
      10% { text-shadow: 2px 0 0px var(--al), -2px 0 0px var(--el); transform: translate(-1px, 0); }
      15% { text-shadow: -2px 0 0px var(--al), 2px 0 0px var(--el); transform: translate(1px, 0); }
      20% { text-shadow: 0 0 0px var(--vl); transform: translate(0); }
    }
    .d-hex { width: 22px; height: 22px; clip-path: polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%); background: currentColor; display: flex; align-items: center; justify-content: center; font-size: 8px; color: var(--void); flex-shrink: 0; transition: transform .2s; }
    .deploy-btn:hover:not(:disabled) .d-hex { transform: scale(1.15); }
    .hex-spin { background: var(--vl); animation: hex-spinner 1.5s linear infinite; font-size: 0; }
    @keyframes hex-spinner { 100% { transform: rotate(360deg); } }
    .btn-scanline { position: absolute; top: 0; bottom: 0; left: -20px; width: 10px; background: rgba(167,139,250,0.4); box-shadow: 0 0 10px var(--vl); filter: blur(2px); animation: btn-scan 2s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
    @keyframes btn-scan { 0% { left: -20px; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { left: 120%; opacity: 0; } }
  `]
})
export class CommandBarComponent {
  @Input() busy = false;
  @Output() launch = new EventEmitter<string>();
  topic: string = '';

  onLaunch() {
    if (this.topic.trim() && !this.busy) {
      this.launch.emit(this.topic);
    }
  }
}
