import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { marked } from 'marked';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-report-overlay',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="r-overlay" [class.open]="open">
      <div class="r-bar">
        <div class="r-title">MARKET INTELLIGENCE BRIEF</div>
        <div class="r-chip rc-e">5-Section Executive Report</div>
        <div class="r-chip rc-v">{{ topic.toUpperCase() }}</div>
        <div class="r-acts">
          <button class="rbtn" (click)="copyMd()">{{ copyText }}</button>
          <button class="rbtn" (click)="dlMd()">DOWNLOAD</button>
          <button class="rbtn rb-close" (click)="close.emit()">✕ CLOSE</button>
        </div>
      </div>
      <div class="r-body">
        <div class="rmd" [innerHTML]="renderedMd"></div>
      </div>
    </div>
  `,
  styles: [`
    .r-overlay { position: fixed; inset: 0; z-index: 20; background: rgba(2,6,9,.97); display: flex; flex-direction: column; transform: translateY(100%); transition: transform .65s cubic-bezier(.2,.8,.3,1); overflow: hidden; }
    .r-overlay.open { transform: translateY(0); }
    .r-overlay::before { content: ''; position: absolute; inset: 0; z-index: 0; pointer-events: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='104' viewBox='0 0 60 104'%3E%3Cpath d='M30 2l28 16v32L30 66 2 50V18L30 2zM30 66v36M30 2v36M2 18l56 32M2 50l56-32' stroke='%2300aaff' stroke-width='0.7' fill='none'/%3E%3C/svg%3E"); background-size: 60px 104px; opacity: .02; }
    .r-bar { height: 54px; flex-shrink: 0; z-index: 1; display: flex; align-items: center; padding: 0 26px; gap: 12px; background: var(--surface); border-bottom: 1px solid rgba(255,255,255,.04); position: relative; }
    .r-bar::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg,transparent,var(--eb),transparent); }
    .r-title { font-family: var(--fn); font-size: 19px; letter-spacing: 4px; color: #fff; }
    .r-chip { font-family: var(--fb); font-size: 8px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; padding: 2px 9px; border: 1px solid; }
    .rc-e { color: var(--el); border-color: var(--eb); background: var(--eg); }
    .rc-v { color: var(--vl); border-color: var(--vb); background: var(--vg); }
    .r-acts { margin-left: auto; display: flex; gap: 6px; }
    .rbtn { padding: 5px 13px; background: transparent; border: 1px solid rgba(255,255,255,.08); font-family: var(--fb); font-size: 8px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--ink-dim); cursor: pointer; transition: all .2s; }
    .rbtn:hover { color: #fff; border-color: rgba(255,255,255,.2); }
    .rbtn.rb-close { color: var(--red); border-color: rgba(239,68,68,.25); }
    .rbtn.rb-close:hover { background: rgba(239,68,68,.1); }
    .r-body { flex: 1; overflow-y: auto; z-index: 1; position: relative; padding: 40px 60px; max-width: 840px; margin: 0 auto; width: 100%; }
    ::ng-deep .rmd h1 { font-family: var(--fn); font-size: 38px; letter-spacing: 3px; color: #fff; margin-bottom: 20px; line-height: 1.1; }
    ::ng-deep .rmd h2 { font-family: var(--fn); font-size: 20px; letter-spacing: 2px; color: var(--al); margin: 32px 0 12px; display: flex; align-items: center; gap: 8px; }
    ::ng-deep .rmd h2::before { content: '▸'; font-size: 11px; opacity: .7; }
    ::ng-deep .rmd h3 { font-family: var(--fb); font-size: 12px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--el); margin: 18px 0 7px; }
    ::ng-deep .rmd p { font-family: var(--fb); font-size: 13px; font-weight: 400; line-height: 1.8; color: rgba(158,189,216,.7); margin-bottom: 12px; }
    ::ng-deep .rmd ul { margin: 0 0 12px; padding-left: 0; list-style: none; }
    ::ng-deep .rmd li { font-family: var(--fb); font-size: 12px; line-height: 1.7; margin-bottom: 4px; padding-left: 14px; position: relative; color: rgba(158,189,216,.65); }
    ::ng-deep .rmd li::before { content: '—'; position: absolute; left: 0; color: var(--ink-dim); }
  `]
})
export class ReportOverlayComponent {
  @Input() open = false;
  @Input() topic = '';
  @Input() set reportMd(val: string) {
    this._reportMd = val;
    this.renderedMd = this.sanitizer.bypassSecurityTrustHtml(marked.parse(val) as string);
  }
  @Output() close = new EventEmitter<void>();

  private _reportMd = '';
  renderedMd: SafeHtml = '';
  copyText = 'COPY MD';

  constructor(private sanitizer: DomSanitizer) {}

  copyMd() {
    navigator.clipboard.writeText(this._reportMd);
    this.copyText = 'COPIED ✓';
    setTimeout(() => this.copyText = 'COPY MD', 2000);
  }

  dlMd() {
    const slug = this.topic.trim().replace(/\s+/g, '-').toLowerCase();
    const blob = new Blob([this._reportMd], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `syndicate-${slug}-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }
}
