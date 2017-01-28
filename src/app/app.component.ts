/// <reference path="../../node_modules/phaser-ce/typescript/phaser.d.ts"/>
/// <reference path="../../node_modules/phaser-ce/typescript/pixi.d.ts"/>

import { Component, OnInit } from '@angular/core';

import 'pixi';
import 'p2';
import * as Phaser from 'phaser';

@Component({
  selector: 'app',
  template: `<ui-view></ui-view>`
})
export class AppComponent implements OnInit {
  game: Phaser.Game;
  logo: Phaser.Sprite;
  cursors: Phaser.CursorKeys;

  public ngOnInit() {
    this.game = new Phaser.Game(800, 600, Phaser.AUTO, "content", this);
  }

  public preload() {
    this.game.load.image("logo", "../assets/images/mushroom2.png");
  }

  public create() {
    this.logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, "logo");
    this.logo.anchor.setTo(0.5, 0.5);
    this.cursors = this.game.input.keyboard.createCursorKeys();
  }

  public update() {
    this.game.input.update();

    if (this.cursors.down.isDown)
      this.logo.position.y += 10;
    if (this.cursors.up.isDown)
      this.logo.position.y -= 10;
    if (this.cursors.left.isDown)
      this.logo.position.x -= 10;
    if (this.cursors.right.isDown)
      this.logo.position.x += 10;
  }
}
