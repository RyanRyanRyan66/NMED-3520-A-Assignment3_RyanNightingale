document.body.style.cursor = 'url("images/shield.png") 16 16, auto';

$(document).ready(function() {
    const $scoreElement = $('.score');
    const $timeLeftElement = $('.time-left');
    const $gameMessageElement = $('.game-message');
    const $projectilesContainer = $('.projectiles-container');
    const $startButton = $('#start-button');
    const $restartButton = $('#restart-button');
    const $gameText = $('#game-text');
    const totalGameTime = 60; 
    const $healthCounter = $('#health-counter'); 
    
    let score = 0;
    let gameTime = totalGameTime;
    let health = 60; 
    let gameInterval;
    let projectileInterval;

    
    function updateHealth() {
        $healthCounter.text(health); 
    }

   
    function onMissedProjectile() {
        health--; 
        updateHealth(); 

        if (health <= 0) {
            gameOver();
        }
    }

    
    function gameOver() {
        clearInterval(gameInterval);  
        clearInterval(projectileInterval);  
        $('.projectile').stop(true, true).remove(); 

        $gameMessageElement.text('Your Tower Was Destroyed!').show();  
        $restartButton.show();  
        $('#tower-left').hide();  
        $('#tower-destroyed').show();  
        $('#tower-left-changed').hide();  
      
    }

    
    function createProjectile() {
        const $projectile = $('<div class="projectile"></div>');
        const size = Math.random() * (100 - 90) + 90; 
        $projectile.css({
            width: size + 'px',
            height: size + 'px',
            backgroundImage: 'url("images/orbProjectile.png")', 
            backgroundSize: 'cover', 
            top: Math.random() * 70 + 10 + '%', 
        });

        $projectilesContainer.append($projectile);

        let wasClicked = false;

        
        $projectile.on('click', function() {
            score += 1;
            $scoreElement.text(`Orbs Stopped: ${score}`);
            wasClicked = true;  
            $projectile.remove(); 
        });

       
        $projectile.animate({
            left: '-100px', 
        }, 3000, 'linear', function() {
            $(this).remove(); 

            if (!wasClicked) {
                onMissedProjectile();
                const leftTowerChanged = $('#tower-left-changed');
                leftTowerChanged.fadeIn(200);  

                
                setTimeout(function() {
                    leftTowerChanged.fadeOut(200);  
                }, 400); 
            }
        });
    }

   
    function getRandomColor() {
        const colors = ['#ff6347', '#ff4500', '#ffd700', '#adff2f'];
        return colors[Math.floor(Math.random() * colors.length)];
    }


    function updateTime() {
        gameTime--;
        $timeLeftElement.text(`Time: ${gameTime}s`);
        if (gameTime <= 0) {
            clearInterval(gameInterval);
            clearInterval(projectileInterval);
            if (health > 0) {
                $gameMessageElement.text('You Saved Your Tower!').show();
            } else {
                $gameMessageElement.text('Your Tower Was Destroyed!').show();
            }
            $restartButton.show(); 
        }
    }

   
    function startGame() {
        score = 0;
        gameTime = totalGameTime;
        health = 60; 
        $scoreElement.text(`Orbs Stopped: ${score}`);
        $timeLeftElement.text(`Time: ${gameTime}s`);
        $healthCounter.text(health); 
        $gameMessageElement.hide(); 
        $gameText.hide(); 
        $startButton.hide(); 
        $restartButton.hide(); 
        gameInterval = setInterval(updateTime, 1000); 
        projectileInterval = setInterval(createProjectile, 630); 
        $('#tower-left').show();  
    $('#tower-destroyed').hide();  
    }

 
    function restartGame() {
        $gameMessageElement.hide();
        $gameText.show();
        $startButton.show(); 
        $restartButton.hide(); 
        startGame(); 
    }


    $startButton.on('click', function() {
        startGame();
    });

    $restartButton.on('click', function() {
        restartGame();
    });

    
    $(document).on('click', function() {
        var leftWizard = $('#wizard-left');
        leftWizard.attr('src', 'images/wizardLeftClicked.png');  

        
        setTimeout(function() {
            leftWizard.attr('src', 'images/wizardLeft.png');  
        }, 150);  
    });

    
    setInterval(function() {
        var rightWizard = $('#wizard-right');

        
        if (rightWizard.attr('src') === 'images/wizardRight.png') {
            
            rightWizard.attr('src', 'images/wizardRightChanged.png');  
        } else {
            
            rightWizard.attr('src', 'images/wizardRight.png');  
        }
    }, 1000);  
});