import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-background-fx',
  standalone: true,
  template: `
    <canvas #bgCanvas id="bg"></canvas>
    <div class="hex-grid"></div>
    <div class="scanlines"></div>
    <div class="grain"></div>
  `,
  styles: [`
    #bg { position: fixed; inset: 0; z-index: 0; opacity: .45; }
    .hex-grid {
      position: fixed; inset: 0; z-index: 1; pointer-events: none; opacity: .045;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='104' viewBox='0 0 60 104'%3E%3Cpath d='M30 2l28 16v32L30 66 2 50V18L30 2zM30 66v36M30 2v36M2 18l56 32M2 50l56-32' stroke='%2300aaff' stroke-width='0.7' fill='none'/%3E%3C/svg%3E");
      background-size: 60px 104px;
    }
    .scanlines {
      position: fixed; inset: 0; z-index: 2; pointer-events: none;
      background: repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.055) 2px,rgba(0,0,0,.055) 4px);
    }
    .grain {
      position: fixed; inset: 0; z-index: 2; pointer-events: none; opacity: .5;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.04'/%3E%3C/svg%3E");
    }
  `]
})
export class BackgroundFxComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('bgCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private pts: any[] = [];
  private animationId!: number;

  ngAfterViewInit() {
    const c = this.canvasRef.nativeElement;
    this.ctx = c.getContext('2d')!;
    this.resize();
    window.addEventListener('resize', () => this.resize());
    
    for (let i = 0; i < 70; i++) {
      this.pts.push({
        x: Math.random() * innerWidth,
        y: Math.random() * innerHeight,
        vx: (Math.random() - .5) * .25,
        vy: (Math.random() - .5) * .25,
        r: Math.random() * 1.1 + .3,
        hue: Math.random() < .4 ? 260 : Math.random() < .5 ? 35 : 165
      });
    }
    this.draw();
  }

  private resize() {
    const c = this.canvasRef.nativeElement;
    c.width = window.innerWidth;
    c.height = window.innerHeight;
  }

  private draw() {
    const c = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, c.width, c.height);
    this.pts.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = c.width; if (p.x > c.width) p.x = 0;
      if (p.y < 0) p.y = c.height; if (p.y > c.height) p.y = 0;
      this.ctx.beginPath(); this.ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      this.ctx.fillStyle = `hsla(${p.hue},70%,70%,.35)`; this.ctx.fill();
    });
    for (let i = 0; i < this.pts.length; i++) {
      for (let j = i + 1; j < this.pts.length; j++) {
        const dx = this.pts[i].x - this.pts[j].x, dy = this.pts[i].y - this.pts[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 110) {
          this.ctx.beginPath(); this.ctx.moveTo(this.pts[i].x, this.pts[i].y); this.ctx.lineTo(this.pts[j].x, this.pts[j].y);
          this.ctx.strokeStyle = `rgba(100,140,210,${(1 - d / 110) * .07})`;
          this.ctx.lineWidth = .5; this.ctx.stroke();
        }
      }
    }
    this.animationId = requestAnimationFrame(() => this.draw());
  }

  ngOnInit() {}
  ngOnDestroy() {
    if (this.animationId) cancelAnimationFrame(this.animationId);
  }
}
