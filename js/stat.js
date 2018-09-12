'use strict';

var cloudWidth = 420;
var cloudHeight = 270;
var cloudX = 100;
var cloudY = 10;
var shadowShift = 10;
var shadowX = cloudX + shadowShift;
var shadowY = cloudY + shadowShift;
var cloudColor = '#fff';
var shadowColor = 'rgba(0, 0, 0, 0.7)';
var gap = 50;
var fontGap = 15;
var barWidth = 40;
var barHeight = 150;
var barColor = 'rgba(255, 0, 0, 1)';


/* Рисование облака */
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, cloudWidth, cloudHeight);
};

/* Максимальный элемент */

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

/* Рандомное число от минимального до максимального */

var getRandomNum = function (min, max) {
  return Math.random() * (max - min) + min;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, shadowX, shadowY, shadowColor);
  renderCloud(ctx, cloudX, cloudY, cloudColor);

  /* Текст */

  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillStyle = '#000';
  ctx.fillText('Ура! Вы победили!', 130, 30);
  ctx.fillText('Список результатов: ', 130, 50);

  /* Гистограмма */

  var maxTimes = getMaxElement(times);
  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], cloudX + (gap + barWidth) * i + gap, cloudY + cloudHeight - fontGap * 2);
    if (names[i] === 'Вы') {
      ctx.fillStyle = barColor;
    } else {
      ctx.fillStyle = 'hsl(240, ' + getRandomNum(10, 100) + '%' + ', 50%)';
    }
    ctx.fillRect(cloudX + (barWidth + gap) * i + gap, cloudY + cloudHeight - gap, barWidth, Math.round(-barHeight * times[i] / maxTimes));
  }
};


