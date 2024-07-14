import React, { useEffect } from 'react';

const WinAnnimation = () => {
  useEffect(() => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    let width = window.innerWidth;
    let height = window.innerHeight;
    let vanishPointY = height / 2;
    let vanishPointX = width / 2;
    let focalLength = 300;
    let angleX = 180;
    let angleY = 180;
    let angleZ = 180;
    let angle = 0;
    let cycle = 0;
    let colors = { r: 255, g: 0, b: 0 };

    canvas.width = width;
    canvas.height = height;

    function Emitter() {
      this.reset();
    }

    Emitter.prototype.reset = function () {
      const PART_NUM = 200;
      const x = (Math.random() * 400) - 200;
      const y = (Math.random() * 400) - 200;
      const z = (Math.random() * 800) - 200;

      this.x = x || 0;
      this.y = y || 0;
      this.z = z || 0;

      this.particles = [];

      for (let i = 0; i < PART_NUM; i++) {
        this.particles.push(new Particle(this.x, this.y, this.z, {
          r: colors.r,
          g: colors.g,
          b: colors.b
        }));
      }
    };

    Emitter.prototype.update = function () {
      const partLen = this.particles.length;

      angleY = (angle - vanishPointX) * 0.0001;
      angleX = (angle - vanishPointX) * 0.0001;

      this.particles.sort((a, b) => b.z - a.z);

      for (let i = 0; i < partLen; i++) {
        this.particles[i].update();
      }

      if (this.particles.length <= 0) {
        this.reset();
      }
    };

    Emitter.prototype.render = function (imgData) {
      const data = imgData.data;

      for (let i = 0; i < this.particles.length; i++) {
        const particle = this.particles[i];
        const dist = Math.sqrt((particle.x - particle.ox) * (particle.x - particle.ox) + (particle.y - particle.oy) * (particle.y - particle.oy) + (particle.z - particle.oz) * (particle.z - particle.oz));

        if (dist > 255) {
          particle.render = false;
          this.particles.splice(i, 1);
        }

        if (particle.render && particle.xPos < width && particle.xPos > 0 && particle.yPos > 0 && particle.yPos < height) {
          for (let w = 0; w < particle.size; w++) {
            for (let h = 0; h < particle.size; h++) {
              if (particle.xPos + w < width && particle.xPos + w > 0 && particle.yPos + h > 0 && particle.yPos + h < height) {
                const pData = (~~(particle.xPos + w) + (~~(particle.yPos + h) * width)) * 4;
                data[pData] = particle.color[0];
                data[pData + 1] = particle.color[1];
                data[pData + 2] = particle.color[2];
                data[pData + 3] = 255 - dist;
              }
            }
          }
        }
      }
    };

    function Particle(x, y, z, color) {
      this.x = x;
      this.y = y;
      this.z = z;

      this.startX = this.x;
      this.startY = this.y;
      this.startZ = this.z;

      this.ox = this.x;
      this.oy = this.y;
      this.oz = this.z;

      this.xPos = 0;
      this.yPos = 0;

      this.vx = (Math.random() * 10) - 5;
      this.vy = (Math.random() * 10) - 5;
      this.vz = (Math.random() * 10) - 5;

      this.color = [color.r, color.g, color.b];
      this.render = true;

      this.size = Math.round(1 + Math.random() * 1);
    }

    Particle.prototype.rotate = function () {
      const x = this.startX * Math.cos(angleZ) - this.startY * Math.sin(angleZ);
      const y = this.startY * Math.cos(angleZ) + this.startX * Math.sin(angleZ);

      this.x = x;
      this.y = y;
    };

    Particle.prototype.update = function () {
      const cosY = Math.cos(angleX);
      const sinY = Math.sin(angleX);

      this.x = (this.startX += this.vx);
      this.y = (this.startY += this.vy);
      this.z = (this.startZ -= this.vz);
      this.rotate();

      this.vy += 0.1;
      this.x += this.vx;
      this.y += this.vy;
      this.z -= this.vz;

      this.render = false;

      if (this.z > -focalLength) {
        const scale = focalLength / (focalLength + this.z);

        this.size = scale * 2;
        this.xPos = vanishPointX + this.x * scale;
        this.yPos = vanishPointY + this.y * scale;
        this.render = true;
      }
    };

    function render() {
      colorCycle();
      angleY = Math.sin(angle += 0.01);
      angleX = Math.sin(angle);
      angleZ = Math.sin(angle);

      const imgData = ctx.createImageData(width, height);

      for (let e = 0; e < 30; e++) {
        emitters[e].update();
        emitters[e].render(imgData);
      }
      ctx.putImageData(imgData, 0, 0);
      requestAnimationFrame(render);
    }

    function colorCycle() {
      cycle += 0.6;
      if (cycle > 100) {
        cycle = 0;
      }
      colors.r = ~~(Math.sin(0.3 * cycle + 0) * 127 + 128);
      colors.g = ~~(Math.sin(0.3 * cycle + 2) * 127 + 128);
      colors.b = ~~(Math.sin(0.3 * cycle + 4) * 127 + 128);
    }

    const emitters = [];
    for (let e = 0; e < 30; e++) {
      colorCycle();
      emitters.push(new Emitter());
    }

    setTimeout(() => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = document.body.offsetHeight;
      vanishPointY = height / 2;
      vanishPointX = width / 2;
      render();
    }, 500);

  }, []);

  return (
    <div className="h-screen w-screen bg-transparent overflow-hidden fixed top-0">
      <canvas id="canvas" className="absolute top-0 left-0 z-10"></canvas>
    </div>
  );
};

export default WinAnnimation;
