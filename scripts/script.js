'use strict';
$(document).ready(function () {
  function declOfNum(n, text_forms) {
    n = Math.abs(n) % 100;
    var n1 = n % 10;
    if (n > 10 && n < 20) { return text_forms[2]; }
    if (n1 > 1 && n1 < 5) { return text_forms[1]; }
    if (n1 == 1) { return text_forms[0]; }
    return text_forms[2];
  }
  var elem = document.documentElement;

  function openFullscreen() {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
  }

  (async () => {
    const { value: layout } = await Swal.fire({
      title: 'Выбери фон',
      input: 'select',
      inputOptions: {
        1: '1',
        2: '2',
        3: '3',
        4: '4-Карлсон ДР',
      },
      inputPlaceholder: 'Выбери фон',
    })

    if (layout) {
      (async () => {
        const { value: formValues } = await Swal.fire({
          title: 'Введите имя и возраст',
          html:
            '<input id="swal-input1" placeholder="Введите имя" class="swal2-input">' +
            '<input id="swal-input2" placeholder="Введите возраст" class="swal2-input">',
          focusConfirm: false,
          preConfirm: () => {
            return [
              document.getElementById('swal-input1').value,
              document.getElementById('swal-input2').value,
            ]
          }
        })

        if (formValues) {
          $('#name').text(formValues[0]);
          $('#age').text(formValues[1] + ' ' + declOfNum(formValues[1], ['год', 'года', 'лет']));
          switch (layout) {
            case '1':
              $('#text').css('top', '25%');
              $('#text').css('right', '35%');
              break;
            case '2':
              $('#text').css('top', '5%');
              $('#text').css('right', '70%');
              $('h1').css('color', '#623d8e');
              break;
            case '3':
              $('#text').css('top', '65%');
              $('#text').css('right', '70%');
              $('#name').css('text-align', 'left');
              $('#name').css('margin-top', '0px');
              $('#age').css('text-align', 'left');
              $('#first').text('');
              $('h1').css('color', '#23408f');
              break;
            case '4':
              $('#text').css('top', '5%');
              $('#text').css('right', '70%');
              $('h1').css('color', '#623d8e');
              break;

          }


          openFullscreen();


          const bdayBallons = (function () {
            const density = 7; // concurrent balloon count
            const balloons = [];
            const colors = ['yellow', 'green', 'blue', 'red'];

            const stringElement = document.createElement("div");
            stringElement.classList.add("string");

            for (let i = 0; i < density; i++) {
              const element = document.createElement("div");
              element.classList.add("balloon");
              element.classList.add(randomColor());

              element.append(stringElement.cloneNode());
              document.body.append(element);

              setTimeout(() => {
                releaseBalloon(element);
              }, (i * 2000) + random(500, 1000));
            }


            function randomColor() {
              return colors[random(0, colors.length)];
            }

            function random(min, max) {
              return Math.floor(Math.random() * (max - min)) + min;
            }

            function releaseBalloon(balloon) {
              const delay = random(100, 1000);
              const x = random(-99, -30); // random x value to fly
              const y = random(-99, -30); // random y value to fly

              const sequence = [{
                offset: 0,
                transform: `rotateZ(45deg) translate(0, 0)`
              }];
              // random fly direction
              if (random(0, 2) === 0) {
                // first fly up to top left

                // left distance to keep balloon in view
                balloon.style.left = `${-1 * x}vw`;

                sequence.push({
                  offset: x / -200,
                  transform: `rotateZ(45deg) translate(${x}vw, 0)`
                });
                sequence.push({
                  offset: (x + y) / -200,
                  transform: `rotateZ(45deg) translate(${x}vw, ${y}vh)`
                });
                sequence.push({
                  offset: (-100 + y) / -200,
                  transform: `rotateZ(45deg) translate(-100vw, ${y}vh)`
                });
              } else {
                // fist fly up to right top

                sequence.push({
                  offset: y / -200,
                  transform: `rotateZ(45deg) translate(0, ${y}vh)`
                });
                sequence.push({
                  offset: (x + y) / -200,
                  transform: `rotateZ(45deg) translate(${x}vw, ${y}vh)`
                });
                sequence.push({
                  offset: (-100 + x) / -200,
                  transform: `rotateZ(45deg) translate(${x}vw, -100vh)`
                });
              }

              // last move is common
              sequence.push({
                offset: 1,
                transform: `rotateZ(45deg) translate(-100vw, -100vh)`
              });

              const balloonAnimation = balloon.animate(sequence, {
                duration: 15000,
                delay: delay
              });


              balloonAnimation.onfinish = () => { releaseBalloon(balloon) }
            }
          })();

          var onlyOnKonami = false;

          $(function () {
            // Globals
            var $window = $(window)
              , random = Math.random
              , cos = Math.cos
              , sin = Math.sin
              , PI = Math.PI
              , PI2 = PI * 2
              , timer = undefined
              , frame = undefined
              , confetti = [];

            var runFor = 2000
            var isRunning = true

            setTimeout(() => {
              isRunning = true
            }, runFor);

            // Settings
            var konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]
              , pointer = 0;

            var particles = 150
              , spread = 20
              , sizeMin = 5
              , sizeMax = 12 - sizeMin
              , eccentricity = 10
              , deviation = 100
              , dxThetaMin = -.1
              , dxThetaMax = -dxThetaMin - dxThetaMin
              , dyMin = .13
              , dyMax = .18
              , dThetaMin = .4
              , dThetaMax = .7 - dThetaMin;

            var colorThemes = [
              function () {
                return color(200 * random() | 0, 200 * random() | 0, 200 * random() | 0);
              }, function () {
                var black = 200 * random() | 0; return color(200, black, black);
              }, function () {
                var black = 200 * random() | 0; return color(black, 200, black);
              }, function () {
                var black = 200 * random() | 0; return color(black, black, 200);
              }, function () {
                return color(200, 100, 200 * random() | 0);
              }, function () {
                return color(200 * random() | 0, 200, 200);
              }, function () {
                var black = 256 * random() | 0; return color(black, black, black);
              }, function () {
                return colorThemes[random() < .5 ? 1 : 2]();
              }, function () {
                return colorThemes[random() < .5 ? 3 : 5]();
              }, function () {
                return colorThemes[random() < .5 ? 2 : 4]();
              }
            ];
            function color(r, g, b) {
              return 'rgb(' + r + ',' + g + ',' + b + ')';
            }

            // Cosine interpolation
            function interpolation(a, b, t) {
              return (1 - cos(PI * t)) / 2 * (b - a) + a;
            }

            // Create a 1D Maximal Poisson Disc over [0, 1]
            var radius = 1 / eccentricity, radius2 = radius + radius;
            function createPoisson() {
              // domain is the set of points which are still available to pick from
              // D = union{ [d_i, d_i+1] | i is even }
              var domain = [radius, 1 - radius], measure = 1 - radius2, spline = [0, 1];
              while (measure) {
                var dart = measure * random(), i, l, interval, a, b, c, d;

                // Find where dart lies
                for (i = 0, l = domain.length, measure = 0; i < l; i += 2) {
                  a = domain[i], b = domain[i + 1], interval = b - a;
                  if (dart < measure + interval) {
                    spline.push(dart += a - measure);
                    break;
                  }
                  measure += interval;
                }
                c = dart - radius, d = dart + radius;

                // Update the domain
                for (i = domain.length - 1; i > 0; i -= 2) {
                  l = i - 1, a = domain[l], b = domain[i];
                  // c---d          c---d  Do nothing
                  //   c-----d  c-----d    Move interior
                  //   c--------------d    Delete interval
                  //         c--d          Split interval
                  //       a------b
                  if (a >= c && a < d)
                    if (b > d) domain[l] = d; // Move interior (Left case)
                    else domain.splice(l, 2); // Delete interval
                  else if (a < c && b > c)
                    if (b <= d) domain[i] = c; // Move interior (Right case)
                    else domain.splice(i, 0, c, d); // Split interval
                }

                // Re-measure the domain
                for (i = 0, l = domain.length, measure = 0; i < l; i += 2)
                  measure += domain[i + 1] - domain[i];
              }

              return spline.sort();
            }

            // Create the overarching container
            var container = document.createElement('div');
            container.style.position = 'fixed';
            container.style.top = '0';
            container.style.left = '0';
            container.style.width = '100%';
            container.style.height = '0';
            container.style.overflow = 'visible';
            container.style.zIndex = '9999';

            // Confetto constructor
            function Confetto(theme) {
              this.frame = 0;
              this.outer = document.createElement('div');
              this.inner = document.createElement('div');
              this.outer.appendChild(this.inner);

              var outerStyle = this.outer.style, innerStyle = this.inner.style;
              outerStyle.position = 'absolute';
              outerStyle.width = (sizeMin + sizeMax * random()) + 'px';
              outerStyle.height = (sizeMin + sizeMax * random()) + 'px';
              innerStyle.width = '100%';
              innerStyle.height = '100%';
              innerStyle.backgroundColor = theme();

              outerStyle.perspective = '50px';
              outerStyle.transform = 'rotate(' + (360 * random()) + 'deg)';
              this.axis = 'rotate3D(' +
                cos(360 * random()) + ',' +
                cos(360 * random()) + ',0,';
              this.theta = 360 * random();
              this.dTheta = dThetaMin + dThetaMax * random();
              innerStyle.transform = this.axis + this.theta + 'deg)';

              this.x = $window.width() * random();
              this.y = -deviation;
              this.dx = sin(dxThetaMin + dxThetaMax * random());
              this.dy = dyMin + dyMax * random();
              outerStyle.left = this.x + 'px';
              outerStyle.top = this.y + 'px';

              // Create the periodic spline
              this.splineX = createPoisson();
              this.splineY = [];
              for (var i = 1, l = this.splineX.length - 1; i < l; ++i)
                this.splineY[i] = deviation * random();
              this.splineY[0] = this.splineY[l] = deviation * random();

              this.update = function (height, delta) {
                this.frame += delta;
                this.x += this.dx * delta;
                this.y += this.dy * delta;
                this.theta += this.dTheta * delta;

                // Compute spline and convert to polar
                var phi = this.frame % 7777 / 7777, i = 0, j = 1;
                while (phi >= this.splineX[j]) i = j++;
                var rho = interpolation(
                  this.splineY[i],
                  this.splineY[j],
                  (phi - this.splineX[i]) / (this.splineX[j] - this.splineX[i])
                );
                phi *= PI2;

                outerStyle.left = this.x + rho * cos(phi) + 'px';
                outerStyle.top = this.y + rho * sin(phi) + 'px';
                innerStyle.transform = this.axis + this.theta + 'deg)';
                return this.y > height + deviation;
              };
            }


            function poof() {
              if (!frame) {
                // Append the container
                document.body.appendChild(container);

                // Add confetti

                var theme = colorThemes[onlyOnKonami ? colorThemes.length * random() | 0 : 0]
                  , count = 0;

                (function addConfetto() {

                  if (onlyOnKonami && ++count > particles)
                    return timer = undefined;

                  if (isRunning) {
                    var confetto = new Confetto(theme);
                    confetti.push(confetto);

                    container.appendChild(confetto.outer);
                    timer = setTimeout(addConfetto, spread * random());
                  }
                })(0);


                // Start the loop
                var prev = undefined;
                requestAnimationFrame(function loop(timestamp) {
                  var delta = prev ? timestamp - prev : 0;
                  prev = timestamp;
                  var height = $window.height();

                  for (var i = confetti.length - 1; i >= 0; --i) {
                    if (confetti[i].update(height, delta)) {
                      container.removeChild(confetti[i].outer);
                      confetti.splice(i, 1);
                    }
                  }

                  if (timer || confetti.length)
                    return frame = requestAnimationFrame(loop);

                  // Cleanup
                  document.body.removeChild(container);
                  frame = undefined;
                });
              }
            }

            $window.keydown(function (event) {
              pointer = konami[pointer] === event.which
                ? pointer + 1
                : +(event.which === konami[0]);
              if (pointer === konami.length) {
                pointer = 0;
                poof();
              }
            });

            if (!onlyOnKonami) poof();
          });

        }
      })()
    }
  })()
  $("select").change(function () {
    var selectedCountry = $(this).children("option:selected").val();
    if (selectedCountry == 1) {
      $('#bod').css('background-image', 'url(./assets/5.jpg)');
    }
    if (selectedCountry == 2) {
      $('#bod').css('background-image', 'url(./assets/1.jpg)');
    }
    if (selectedCountry == 3) {
      $('#bod').css('background-image', 'url(./assets/2.jpg)');
    }
    if (selectedCountry == 4) {
      $('#bod').css('background-image', 'url(./assets/3.jpeg)');
    }
  })
})


