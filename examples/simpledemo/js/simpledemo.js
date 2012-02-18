enchant();
window.onload = function() {
    var game = new Game(320,320);
    game.fps = 24;
    game.scale = 1;
    game.preload(['images/particle.png']);
    game.onload = function() {
        game.rootScene.backgroundColor = 'black';
        var particleCount = 100;

        var particleSystem = ParticleSystem.createParticleSystem(this.rootScene, this.assets['images/particle.png'], 128, 128, particleCount, 50);

        function initParticle() {
            var particleX = (320-128)/2;
            var particleY = (320-128)/2;
            for (var i=0;i<particleCount;i++) {
                var moveX = Math.floor(Math.random()*11) - 5;
                var moveY = Math.floor(Math.random()*11) - 5;
                var lifeSpan = Math.floor(Math.random()*10) + 10;
                //console.log(moveX, moveY);
                particleSystem.addParticle(particleX, particleY, 0.3, 0.5, moveX, moveY, lifeSpan);
            }
        }
        initParticle();

        game.addEventListener('enterframe', function() {
            particleSystem.update();
            if (!particleSystem.activeCount) {
                initParticle();
            }
        });
    }
    game.start();
}