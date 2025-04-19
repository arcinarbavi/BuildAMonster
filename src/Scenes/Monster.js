class Monster extends Phaser.Scene {
    constructor() {
        super("monsterScene");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings

        //Create constants for the monster location
        this.bodyX = 300;
        this.bodyY = 350;
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        // Assets from Kenny Assets pack "Monster Builder Pack"
        // https://kenney.nl/assets/monster-builder-pack
        this.load.setPath("./assets/");

        // Load sprite atlas
        this.load.atlasXML("monsterParts", "spritesheet_default.png", "spritesheet_default.xml");
        
        // update instruction text
        document.getElementById('description').innerHTML = '<h2>Monster.js<br>S - smile // F - show fangs<br>A - move left // D - move right</h2>'
    }

    create() {
        let my = this.my;   // create an alias to this.my for readability

        // Create the main body sprite
        //
        // this.add.sprite(x,y, "{atlas key name}", "{name of sprite within atlas}")
        //
        // look in spritesheet_default.xml for the individual sprite names
        // You can also download the asset pack and look in the PNG/default folder.
        my.sprite.body = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "body_yellowA.png");

        my.sprite.leg1 = this.add.sprite(this.bodyX - 40, this.bodyY + 100, "monsterParts", "leg_yellowC.png");
        my.sprite.leg2 = this.add.sprite(this.bodyX + 40, this.bodyY + 100, "monsterParts", "leg_yellowC.png");

        my.sprite.arm1 = this.add.sprite(this.bodyX + 110, this.bodyY + 30, "monsterParts", "arm_yellowA.png");
        my.sprite.arm2 = this.add.sprite(this.bodyX -110, this.bodyY + 30, "monsterParts", "arm_yellowA.png");
        my.sprite.arm2.flipX = true;

        my.sprite.eye = this.add.sprite(this.bodyX, this.bodyY - 60, "monsterParts", "eye_cute_light.png");

        my.sprite.mouthSmile = this.add.sprite(this.bodyX, this.bodyY + 30, "monsterParts", "mouth_closed_happy.png");
        my.sprite.mouthFangs = this.add.sprite(this.bodyX, this.bodyY + 30, "monsterParts", "mouth_closed_fangs.png");
        my.sprite.mouthFangs.visible = false;

        my.sprite.accessory1 = this.add.sprite(this.bodyX - 40, this.bodyY - 90, "monsterParts", "detail_dark_horn_large.png");
        my.sprite.accessory2 = this.add.sprite(this.bodyX + 40, this.bodyY - 90, "monsterParts", "detail_dark_horn_large.png");

        this.keyS = this.input.keyboard.addKey('S');
        this.keyF = this.input.keyboard.addKey('F');
        this.keyA = this.input.keyboard.addKey('A');
        this.keyD = this.input.keyboard.addKey('D');
    }

    update() {
        let my = this.my;    // create an alias to this.my for readability

        if (Phaser.Input.Keyboard.JustDown(this.keyS)) {
            my.sprite.mouthSmile.visible = true;
            my.sprite.mouthFangs.visible = false;
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyF)) {
            my.sprite.mouthSmile.visible = false;
            my.sprite.mouthFangs.visible = true;
        }

        let dx = 0;
        if (this.keyA.isDown) {
            dx = -1;
        } else if (this.keyD.isDown) {
            dx = 1;
        }

        for (let part in my.sprite) {
            my.sprite[part].x += dx;
        }
    }
}
