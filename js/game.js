let config = {
    type: Phaser.CANVAS,
    width: 360,
    height: 640,
    physics: {
        default: 'arcade'
    },
    scene: {
        init: init,
        preload: preload,
        create: create,
        update: update
    },
    backgroundColor: '#88e288',
    audio: {
        disableWebAudio: false
    },
    autoCenter: true
};

// Déclaration de nos variables globales
let game = new Phaser.Game(config);
var nextArrow;
let successfulDropoff;

var startSound;
var holdSound;
var wrongSound;
var correctSound;
var finishSound;

var star;
var starScale;

var gameBg;

var gameCover;
var startClicked;

//
function init() {
}

function preload() {
    this.load.image('background', './assets/mowgli-01.png');
    
    this.load.image('cover', './assets/mowgliCOVER-01.png');
    
    this.load.image('head', './assets/mowgliHead-01.png');
    this.load.image('body', './assets/mowgliBody-01.png');
    this.load.image('handL', './assets/mowgliHandL-01.png');
    this.load.image('legL', './assets/mowgliLegL-01.png');
    this.load.image('legR', './assets/mowgliLegR-01.png');
    
    this.load.image('nextArrow', './assets/green-arrow (1).png');
 
    this.load.audio('start', './assets/start1.wav');
    this.load.audio('hold', './assets/hold.wav');
    this.load.audio('wrong', './assets/wrong.wav');
    this.load.audio('correct', './assets/correct.wav');
    this.load.audio('finish', './assets/finish.wav');
    
    //---star at the end---
    this.load.image('star', './assets/green-star.png');
    
     //---background pattern---
    this.load.image('gameBg', './assets/newleaf-01.png');

}

function create() { 
    startClicked = false;
    
    gameCover = this.add.image(180, 320, 'cover');
    gameCover.setDepth(5);
    
    gameBg = this.add.image(180, 320, 'gameBg');
    gameBg.setVisible(false);
    
     //---star---
    starScale = 0.1;
    star = this.add.image(90,530, 'star');
    star.setScale(starScale);
    star.setVisible(false);
    star.setDepth(0);
    
    
    var image = this.add.image(200, 250, 'background');
    image.alpha = 0.3;
  
    startSound = this.sound.add('start');
    holdSound = this.sound.add('hold');
    wrongSound = this.sound.add('wrong');
    correctSound = this.sound.add('correct');
    finishSound = this.sound.add('finish');
    
    //----les membres-----
    var head = this.add.image(82, 530, 'head', Phaser.Math.RND.pick(frames)).setInteractive();
    this.input.setDraggable(head);
    head.setName('head');
    
    successfulDropoff = 0;
    
    nextArrow = this.add.image(300, 550, 'nextArrow');
    nextArrow.setScale(0.7);
    nextArrow.setVisible(false);
    
    var body = this.add.image(215, 540, 'body', Phaser.Math.RND.pick(frames)).setInteractive();
    this.input.setDraggable(body);
    body.setName('body');
    
    var handL = this.add.image(50, 360, 'handL', Phaser.Math.RND.pick(frames)).setInteractive();
    this.input.setDraggable(handL);
    handL.setName('handL');
    
    
    var legL = this.add.image(50, 212, 'legL', Phaser.Math.RND.pick(frames)).setInteractive();
    this.input.setDraggable(legL);
    legL.setName('legL');
    
    var legR = this.add.image(320, 552, 'legR', Phaser.Math.RND.pick(frames)).setInteractive();
    this.input.setDraggable(legR);
    legR.setName('legR');
    
    //-----les drop zones----
    //  A drop zone
    var zone = this.add.zone(218, 123, 115, 120).setRectangleDropZone(115, 120);
    zone.setName('head');
    
    //  A drop zone
    var zone2 = this.add.zone(232, 266, 90, 137).setRectangleDropZone(90, 137);
    zone2.setName('body');
    
    //  A drop zone
    var zone3 = this.add.zone(150, 175, 65, 130).setRectangleDropZone(65, 130);
    zone3.setName('handL');
    
    
    //  A drop zone
    var zone4 = this.add.zone(260, 384, 90, 100).setRectangleDropZone(90, 100);
    zone4.setName('legR');
    
    //  A drop zone
    var zone5 = this.add.zone(170, 386, 90, 100).setRectangleDropZone(90, 100);
    zone5.setName('legL');
    
 
    this.input.on('dragstart', function (pointer, gameObject) {

 if (startClicked === true){
        this.children.bringToTop(gameObject);
              holdSound.play();
         }

    }, this);

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

        gameObject.x = dragX;
        gameObject.y = dragY;

    });

    this.input.on('dragenter', function (pointer, gameObject, dropZone) {

    });

    this.input.on('dragleave', function (pointer, gameObject, dropZone) {

    });

    this.input.on('drop', function (pointer, gameObject, dropZone) {
        if(gameObject.name == dropZone.name){
            gameObject.x = dropZone.x;
            gameObject.y = dropZone.y;

            gameObject.input.enabled = false;
            
            successfulDropoff++;
            correctSound.play();
        }
else{
            gameObject.x = gameObject.input.dragStartX;
            gameObject.y = gameObject.input.dragStartY;
    
            wrongSound.play();
        }
        

    });

    this.input.on('dragend', function (pointer, gameObject, dropped) {

        if (!dropped)
        {
            gameObject.x = gameObject.input.dragStartX;
            gameObject.y = gameObject.input.dragStartY;
        }
        
      if(successfulDropoff === 5){
            nextArrow.setVisible(true);
            nextArrow.setInteractive();
          finishSound.play();
          star.setVisible(true);
          gameBg.setVisible(true);
    }    
        
        nextArrow.on('pointerdown', onClick);
        
    });
    
this.input.on('pointerdown', function(pointer){
        if(pointer.x >= 53 && pointer.x <= 154  && pointer.y >= 376 && pointer.y <=480){
             startSound.play();
            setTimeout(function(){ 
                startClicked = true; 
                gameCover.setVisible(false);
            }, 500);
}});

}


function update() {
    if(successfulDropoff === 5){
         starScale += 0.001;
        star.setScale(starScale);
        if (starScale > 0.2){
            starScale = 0.2;
        } }
}
function onClick(){
    window.location.replace("https://games.caramel.be/kaa/index.html");

}