'use client';

import React, { useRef, useEffect, useState } from "react";

export default function Game() {
    let canvas, ctx, ball, player, square, rectangle, animationID;

    let score = 0;

    const [gameon, setGameOn] = useState(false)

    useEffect(() => {
        canvas = document.getElementById('canvas');
        ctx = canvas.getContext('2d');

        // Create ball props
        ball = {
            x: Math.random() * (canvas.width - 10),
            y: 0,
            size: 10,
            speed: 4,
            dx: 4,
            dy: -1,
        };

        // Create player props
        player = {
            x: canvas.width / 2 - 40,
            y: canvas.height - 20,
            w: 80,
            h: 10,
            speed: 4,
            dx: 0,
        };

        // Create square props
        square = {
            x: Math.random() * (canvas.width - 20),
            y: 0,
            w: 20,
            h: 20,
            speed: 4,
            dx: 0,
            dy: -4,
        };

        // Create rectangle props
        rectangle = {
            x: Math.random() * (canvas.width - 40),
            y: 0,
            w: 40,
            h: 20,
            speed: 4,
            dx: 0,
            dy: -10,
        };

        // Keyboard event handlers
        document.addEventListener('keydown', keyDown);
        document.addEventListener('keyup', keyUp);

    }, [])

    // Draw ball
    const drawBall = () => {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
        ctx.fillStyle = '#0095dd';
        ctx.fill();
        ctx.closePath();
    }

    // Draw player
    const drawPlayer = () => {
        ctx.beginPath();
        ctx.rect(player.x, player.y, player.w, player.h);
        ctx.fillStyle = '#22c55e';
        ctx.fill();
        ctx.closePath();
    }

    // Draw square
    const drawSquare = () => {
        ctx.beginPath();
        ctx.rect(square.x, square.y, square.w, square.h);
        ctx.fillStyle = '#eab308';
        ctx.fill();
        ctx.closePath();
    }

    // Draw rectangle
    const drawRectangle = () => {
        ctx.beginPath();
        ctx.rect(rectangle.x, rectangle.y, rectangle.w, rectangle.h);
        ctx.fillStyle = '#ef4444';
        ctx.fill();
        ctx.closePath();
    }

    // Draw Score
    function drawScore() {
        ctx.font = "20px Arial";
        ctx.fillStyle = '#8b5cf6';
        ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
    }

    // Move player
    const moveplayer = () => {

        player.x += player.dx;

        // Wall detection
        if (player.x + player.w > canvas.width) {
            player.x = canvas.width - player.w;
        }

        if (player.x < 0) {
            player.x = 0;
        }
    }

    // Move ball
    const moveBall = () => {
        ball.y += -ball.dy;

        if (ball.y > player.y) {
            ball.x = Math.random() * (canvas.width - 20);
            ball.y = 0;
        }

        // player collision
        if (
            ball.x - ball.size > player.x &&
            ball.x + ball.size < player.x + player.w &&
            ball.y + ball.size > player.y
        ) {
            score -= 5;
        }

    }

    // Move square
    const moveSquare = () => {
        square.y += -square.dy;

        if (square.y > player.y) {
            square.x = Math.random() * (canvas.width - 20);
            square.y = 0;
        }

        // player collision
        if (
            square.x - square.h > player.x &&
            square.x + square.h < player.x + player.w &&
            square.y + square.h > player.y
        ) {
            score += 15;
        }
    }

    // Move rectangle
    const moveRectangle = () => {
        rectangle.y += -rectangle.dy;

        if (rectangle.y > player.y) {
            rectangle.x = Math.random() * (canvas.width - 20);
            rectangle.y = 0;
        }

        // player collision
        if (
            rectangle.x - rectangle.h > player.x &&
            rectangle.x + rectangle.h < player.x + player.w &&
            rectangle.y + rectangle.h > player.y
        ) {
            score -= 10;
        }

    }

    const draw = () => {
        // clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawBall();
        drawPlayer();
        drawSquare();
        drawRectangle();
        drawScore();
    }

    const startGame = () => {
        setGameOn(true);
        moveplayer();
        moveBall();
        moveSquare();
        moveRectangle();

        // Draw everything
        draw();

        animationID = requestAnimationFrame(startGame);
    }

    const keyDown = (e) => {
        if (e.key === 'Right' || e.key === 'ArrowRight') {
            player.dx = player.speed;
        } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
            player.dx = -player.speed;
        }
    }

    const keyUp = (e) => {
        if (
            e.key === 'Right' ||
            e.key === 'ArrowRight' ||
            e.key === 'Left' ||
            e.key === 'ArrowLeft'
        ) {
            player.dx = 0;
        }
    }

    return (
        <div>
            <div className="container">
                {gameon ? <h2>Reload page to restart</h2>
                    :
                    <button onClick={startGame}>Start Game</button>
                }
                <canvas id="canvas" width="800" height="600"></canvas><br /><br />
            </div>
        </div>
    )
}