import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-topology-strip',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="topology">
      <div class="ts-node ts-0" [class.ts-active]="activeNode === 0" [class.ts-done]="doneNodes.includes(0)">
        <div class="ts-dot"></div>
        RESEARCHER
      </div>
      <div class="ts-pipe tp-01" [class.flowing]="flowingPipes.includes(0)">
        <div class="ts-pkt"></div><div class="ts-pkt"></div><div class="ts-pkt"></div>
      </div>
      <div class="ts-node ts-1" [class.ts-active]="activeNode === 1" [class.ts-done]="doneNodes.includes(1)">
        <div class="ts-dot"></div>
        ANALYST
      </div>
      <div class="ts-pipe tp-12" [class.flowing]="flowingPipes.includes(1)">
        <div class="ts-pkt"></div><div class="ts-pkt"></div><div class="ts-pkt"></div>
      </div>
      <div class="ts-node ts-2" [class.ts-active]="activeNode === 2" [class.ts-done]="doneNodes.includes(2)">
        <div class="ts-dot"></div>
        WRITER
      </div>
    </div>
  `,
  styles: [`
    .topology {
      display: flex; align-items: center; justify-content: center; height: 40px;
      gap: 0; background: rgba(3,8,15,.55); border-bottom: 1px solid rgba(255,255,255,.03);
      position: relative; overflow: hidden; padding: 0 20px;
    }
    .topology::before {
      content: 'MISSION TOPOLOGY'; position: absolute; left: 20px;
      font-family: var(--fb); font-size: 7px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: var(--ink-ghost);
    }
    .ts-node {
      display: flex; align-items: center; gap: 5px; font-family: var(--fb); font-size: 8px; font-weight: 700;
      letter-spacing: 2.5px; text-transform: uppercase; color: var(--ink-dim); padding: 0 8px; transition: color .3s;
    }
    .ts-node.ts-active { color: var(--ink); }
    .ts-node.ts-done { color: var(--el); }
    .ts-dot { width: 9px; height: 9px; border-radius: 50%; border: 1px solid currentColor; background: transparent; transition: background .3s, box-shadow .3s; }
    .ts-node.ts-active .ts-dot { background: currentColor; animation: ts-pulse 1s ease-in-out infinite; }
    .ts-node.ts-done .ts-dot { background: currentColor; }
    @keyframes ts-pulse { 0%,100% { transform: scale(1); opacity: 1 } 50% { transform: scale(1.5); opacity: .7 } }
    .ts-0.ts-active .ts-dot { box-shadow: 0 0 8px var(--vl); }
    .ts-1.ts-active .ts-dot { box-shadow: 0 0 8px var(--al); }
    .ts-2.ts-active .ts-dot { box-shadow: 0 0 8px var(--el); }
    .ts-pipe { flex: 1; max-width: 110px; height: 1px; background: rgba(255,255,255,.06); position: relative; overflow: hidden; }
    .ts-pipe.flowing { background: rgba(255,255,255,.08); }
    .ts-pkt { position: absolute; top: -2px; width: 5px; height: 5px; border-radius: 50%; opacity: 0; }
    .ts-pipe.flowing .ts-pkt { animation: ts-pkt-flow 1.3s linear infinite; opacity: 1; }
    .ts-pkt:nth-child(2) { animation-delay: .43s; }
    .ts-pkt:nth-child(3) { animation-delay: .86s; }
    .tp-01 .ts-pkt { background: var(--vl); }
    .tp-12 .ts-pkt { background: var(--al); }
    @keyframes ts-pkt-flow { 0% { left: -5px; opacity: 0 } 10% { opacity: 1 } 90% { opacity: 1 } 100% { left: 100%; opacity: 0 } }
  `]
})
export class TopologyStripComponent {
  @Input() activeNode: number | null = null;
  @Input() doneNodes: number[] = [];
  @Input() flowingPipes: number[] = [];
}
