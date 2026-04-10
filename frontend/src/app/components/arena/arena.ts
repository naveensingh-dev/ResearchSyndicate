import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentCardComponent } from '../agent-card/agent-card';

@Component({
  selector: 'app-arena',
  standalone: true,
  imports: [CommonModule, AgentCardComponent],
  template: `
    <div class="arena-scroll-wrapper">
      <div class="arena">
        <app-agent-card 
          [id]="0" name="RESEARCHER" spec="Raw Intelligence Gathering" clearance="VIOLET"
          [status]="agentStatuses[0]" [progress]="agentProgress[0]" [logs]="agentLogs[0]"
          tools="SerpAPI · Web Scrape" method="CLASSIFIED DATA VECTOR" output="RAW INTELLIGENCE PKG">
        </app-agent-card>

        <div class="pipe-col pipe-col-01" [class.flowing]="flowingPipes.includes(0)">
          <div class="pipe-lbl lbl-horiz">DATA FLOW</div>
          <div class="pipe-vert">
            <div class="pv-pkt"></div><div class="pv-pkt"></div><div class="pv-pkt"></div>
          </div>
          <div class="pipe-arrow">▼</div>
          <div class="pipe-vert">
            <div class="pv-pkt"></div><div class="pv-pkt"></div><div class="pv-pkt"></div>
          </div>
        </div>

        <app-agent-card 
          [id]="1" name="ANALYST" spec="Strategic Intelligence Processing" clearance="AMBER"
          [status]="agentStatuses[1]" [progress]="agentProgress[1]" [logs]="agentLogs[1]"
          tools="SWOT · Gap Analysis" method="COMPETITIVE MATRIX OPS" output="STRATEGIC INSIGHT FILE">
        </app-agent-card>

        <div class="pipe-col pipe-col-12" [class.flowing]="flowingPipes.includes(1)">
          <div class="pipe-lbl lbl-horiz">DATA FLOW</div>
          <div class="pipe-vert">
            <div class="pv-pkt"></div><div class="pv-pkt"></div><div class="pv-pkt"></div>
          </div>
          <div class="pipe-arrow">▼</div>
          <div class="pipe-vert">
            <div class="pv-pkt"></div><div class="pv-pkt"></div><div class="pv-pkt"></div>
          </div>
        </div>

        <app-agent-card 
          [id]="2" name="WRITER" spec="Executive Intelligence Synthesis" clearance="GREEN"
          [status]="agentStatuses[2]" [progress]="agentProgress[2]" [logs]="agentLogs[2]"
          tools="Narrative Engine · MD" method="EXEC BRIEF SYNTHESIS" output="5-SECTION INTEL REPORT">
        </app-agent-card>
      </div>
    </div>
  `,
  styles: [`
    .arena-scroll-wrapper {
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 16px 14px 12px;
    }
    .arena {
      display: grid; grid-template-columns: 1fr 54px 1fr 54px 1fr;
      gap: 0; min-height: 100%;
    }
    .pipe-col { display: flex; flex-direction: column; align-items: center; padding: 14px 0; gap: 5px; position: relative; }
    .pipe-lbl { font-family: var(--fb); font-size: 7px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: var(--ink-ghost); flex-shrink: 0; }
    .lbl-horiz { display: none; }
    .pipe-vert { flex: 1; width: 1px; position: relative; background: rgba(255,255,255,.06); }
    .pipe-vert::before, .pipe-vert::after { content: ''; position: absolute; left: -3px; width: 7px; height: 7px; border-radius: 50%; border: 1px solid rgba(255,255,255,.1); background: var(--surface); }
    .pipe-vert::before { top: -3px; }
    .pipe-vert::after { bottom: -3px; }
    .pv-pkt { position: absolute; left: -3px; width: 7px; height: 7px; border-radius: 50%; opacity: 0; top: 0; }
    .pipe-col.flowing .pv-pkt { animation: pv-flow 1.35s linear infinite; }
    .pv-pkt:nth-child(2) { animation-delay: .45s; }
    .pv-pkt:nth-child(3) { animation-delay: .90s; }
    @keyframes pv-flow { 0% { top: 0%; opacity: 0 } 5% { opacity: 1 } 95% { opacity: 1 } 100% { top: 100%; opacity: 0 } }
    .pipe-col-01 .pv-pkt { background: radial-gradient(circle,var(--vl),var(--al)); box-shadow: 0 0 8px var(--v); }
    .pipe-col-12 .pv-pkt { background: radial-gradient(circle,var(--al),var(--el)); box-shadow: 0 0 8px var(--a); }
    .pipe-arrow { font-size: 9px; color: var(--ink-dim); flex-shrink: 0; opacity: .5; animation: arrow-blink 2s ease-in-out infinite; }
    @keyframes arrow-blink { 0%,100% { opacity: .25 } 50% { opacity: .7 } }

    @media (min-width: 901px) {
      .pipe-lbl:not(.lbl-horiz) { writing-mode: vertical-rl; display: block; }
    }

    @media (max-width: 900px) {
      .arena {
        grid-template-columns: 1fr;
        grid-template-rows: auto auto auto auto auto;
        gap: 10px;
      }
      .pipe-col {
        flex-direction: row; justify-content: center; align-items: center;
        padding: 10px 0; gap: 10px; min-height: 40px;
      }
      .pipe-vert { width: auto; height: 1px; flex: 1; max-width: 100px; }
      .pipe-vert::before, .pipe-vert::after { top: -3px; }
      .pipe-vert::before { left: -3px; }
      .pipe-vert::after { left: auto; right: -3px; }
      .pv-pkt { top: -3px; left: 0; }
      @keyframes pv-flow-horiz { 0% { left: 0%; opacity: 0 } 5% { opacity: 1 } 95% { opacity: 1 } 100% { left: 100%; opacity: 0 } }
      .pipe-col.flowing .pv-pkt { animation: pv-flow-horiz 1.35s linear infinite; }
      .pipe-arrow { transform: rotate(-90deg); margin-left: 5px; margin-right: 5px; }
      .pipe-lbl:not(.lbl-horiz) { display: none; }
      .lbl-horiz { display: block; position: absolute; top: -5px; width: 100%; text-align: center; }
    }
  `]
})
export class ArenaComponent {
  @Input() agentStatuses: string[] = ['standby', 'standby', 'standby'];
  @Input() agentProgress: number[] = [0, 0, 0];
  @Input() agentLogs: string[][] = [['Awaiting mission parameters…'], ['Waiting on Researcher handoff…'], ['Waiting on Analyst handoff…']];
  @Input() flowingPipes: number[] = [];
}
