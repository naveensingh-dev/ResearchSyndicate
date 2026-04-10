import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackgroundFxComponent } from './components/background-fx/background-fx';
import { HeaderComponent } from './components/header/header';
import { TopologyStripComponent } from './components/topology-strip/topology-strip';
import { ArenaComponent } from './components/arena/arena';
import { CommandBarComponent } from './components/command-bar/command-bar';
import { ReportOverlayComponent } from './components/report-overlay/report-overlay';
import { MissionService } from './services/mission';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    BackgroundFxComponent,
    HeaderComponent,
    TopologyStripComponent,
    ArenaComponent,
    CommandBarComponent,
    ReportOverlayComponent
  ],
  template: `
    <app-background-fx></app-background-fx>
    <div class="global-scan" [class.scanning]="busy && !reportOpen"></div>
    <div class="shell" [class.shell-busy]="busy">
      <app-header></app-header>
      <app-topology-strip
        [activeNode]="activeNode"
        [doneNodes]="doneNodes"
        [flowingPipes]="flowingPipes">
      </app-topology-strip>
      <app-arena 
        [agentStatuses]="agentStatuses" 
        [agentProgress]="agentProgress"
        [agentLogs]="agentLogs"
        [flowingPipes]="flowingPipes">
      </app-arena>
      <app-command-bar [busy]="busy" (launch)="onLaunch($event)"></app-command-bar>
    </div>

    <app-report-overlay 
      [open]="reportOpen" 
      [topic]="currentTopic" 
      [reportMd]="reportMd"
      (close)="reportOpen = false">
    </app-report-overlay>
  `,
  styles: [`
    .shell {
      position: relative; z-index: 3;
      height: 100vh; width: 100%;
      display: flex; flex-direction: column;
      transition: filter 0.5s ease;
    }
    .shell-busy {
      filter: drop-shadow(0 0 10px rgba(109,40,217,0.1));
    }
    app-header, app-topology-strip, app-command-bar {
      flex-shrink: 0;
    }
    app-arena {
      flex: 1;
      overflow: hidden;
    }
    .global-scan {
      position: fixed; inset: 0; pointer-events: none; z-index: 100;
      background: linear-gradient(to bottom, transparent, rgba(167,139,250,0.05) 50%, transparent);
      height: 200%; top: -100%; opacity: 0; transition: opacity 0.3s;
    }
    .global-scan.scanning {
      opacity: 1;
      animation: g-scan 3s linear infinite;
    }
    @keyframes g-scan { 0% { transform: translateY(0); } 100% { transform: translateY(50%); } }
  `]
})
export class AppComponent implements OnDestroy {
  busy = false;
  reportOpen = false;
  currentTopic = '';
  reportMd = '';

  agentStatuses = ['standby', 'standby', 'standby'];
  agentProgress = [0, 0, 0];
  agentLogs: string[][] = [['Awaiting mission parameters…'], ['Waiting on Researcher handoff…'], ['Waiting on Analyst handoff…']];
  flowingPipes: number[] = [];

  private wsSub?: Subscription;

  constructor(private missionService: MissionService) {}

  get activeNode(): number {
    return this.agentStatuses.indexOf('active');
  }

  get doneNodes(): number[] {
    return this.agentStatuses.map((s, i) => s === 'done' ? i : -1).filter(i => i !== -1);
  }

  onLaunch(topic: string) {
    console.log('INITIATING: Neural Uplink for', topic);
    this.busy = true;
    this.currentTopic = topic;
    this.reportMd = '';
    
    // Reset UI
    this.agentStatuses = ['standby', 'standby', 'standby'];
    this.agentProgress = [0, 0, 0];
    this.agentLogs = [['Stabilizing socket connection…'], ['Waiting on handoff…'], ['Waiting on handoff…']];
    this.flowingPipes = [];

    // 1. Open the connection
    this.startWs();

    // 2. Send the command as soon as the connection is ready
    // RxJS webSocket is lazy, it connects on subscription.
    // We'll wait 800ms for the handshake to finish then fire the command.
    setTimeout(() => {
      console.log('SENDING COMMAND: DEPLOY_MISSION');
      this.missionService.sendCommand({
        command: 'DEPLOY_MISSION',
        topic: topic
      });
      this.agentLogs[0].push('Uplink confirmed. Agent activation in progress...');
    }, 800);
  }

  private startWs() {
    this.wsSub?.unsubscribe();
    this.wsSub = this.missionService.getMissionUpdates().subscribe({
      next: (msg) => {
        console.log('WS SIGNAL:', msg);
        this.handleWsMessage(msg);
      },
      error: (err) => {
        console.error('Neural Grid Failure:', err);
        this.agentLogs[0].push('CRITICAL: Neural link severed.');
        this.busy = false;
      }
    });
  }

  private handleWsMessage(msg: any) {
    const agentMap: Record<string, number> = { 'Researcher': 0, 'Analyst': 1, 'Writer': 2 };
    const id = agentMap[msg.agent];
    
    if (id !== undefined) {
      this.agentStatuses[id] = msg.status;
      this.agentProgress[id] = msg.progress;
      if (msg.log) {
        this.agentLogs[id].push(msg.log);
        if (this.agentLogs[id].length > 10) this.agentLogs[id].shift();
      }
      
      if (msg.status === 'done' && id < 2) {
        this.flowingPipes.push(id);
        setTimeout(() => {
          this.flowingPipes = this.flowingPipes.filter(p => p !== id);
        }, 3000);
      }

      if (msg.status === 'done' && id === 2 && msg.report) {
        this.reportMd = msg.report;
        this.reportOpen = true;
        this.busy = false;
      }
    }
  }

  ngOnDestroy() {
    this.wsSub?.unsubscribe();
    this.missionService.disconnect();
  }
}
