var ParticleSystem = {
    createParticleSystem: function(scene, image, width, height, maxParticle) {
        this.particleCount = maxParticle;
        this.particles = [];
        this.image = image;
        this.width = width;
        this.height = height;
        this.scene = scene;
        this.activeCount = 0;
        for (var i=0; i<maxParticle; i++) {
            this.particles.push(this._createParticleObject());
        }
        return this;
    },
    _createParticleObject: function() {
        var p = new Sprite(this.width, this.height);
        p.particleActive = false;
        p.particleMoveX = 0;
        p.particleMoveY = 0;
        p.particleLive = 0;
        p.image = this.image;
        p.lifeSpan = 0;
        return p;
    },
    addParticle: function(x, y, scale, opacity,  moveX, moveY, lifeSpan) {
        for (var i=0; i<this.particleCount; i++) {
            if (!this.particles[i].particleActive) {
                var p = this.particles[i];
                p.particleActive = true;
                p.x = x;
                p.y = y;
                p.scaleX = scale;
                p.scaleY = scale;
                p.particleMoveX = moveX;
                p.particleMoveY = moveY;
                p.particleLive = 0;
                p.opacity = opacity;
                p.lifeSpan = lifeSpan;
                this.scene.addChild(p);
                this.activeCount = this.activeCount + 1;
                break;
            }
        }
    },
    update: function() {
        for (var i=0; i<this.particleCount; i++) {
            var p = this.particles[i];
            if (p.particleActive) {
                p.particleLive = p.particleLive + 1;
                if (p.particleLive>p.lifeSpan) {
                    this.scene.removeChild(p);
                    p.particleActive = false;
                    this.activeCount = this.activeCount - 1;
                } else {
                    p.x = p.x + p.particleMoveX;
                    p.y = p.y + p.particleMoveY;
                }
            }
        }
    }
}
